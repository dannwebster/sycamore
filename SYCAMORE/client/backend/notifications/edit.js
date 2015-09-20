Template.notificationEdit.helpers({
    'timestamp': function(){
        return moment.unix(this.notification.created).format('MMM D, YYYY')
    },
    'stat': function(){
        console.log(this.notification.status)
        switch(this.notification.status){
            case 0: return {  draft: true,    live: false, archived: false }
            break;
            case 1:
                if(this.notification.archived){
                    return {  draft: false,    live: false, archived: true }
                }else{
                    return {  draft: false,    live: true, archived: false }
                }
            break;
        }
    }
});
Template.notificationEdit.events({
    'click .delete': function(event, template){
        bootbox.confirm("Are you sure you want to delete this notification?", function(result) {
            if(result){
                Meteor.call('notificationRemove',template.data.notification._id,function(){
                    Router.go('notifications')
                })
            }
        });
    },
    'change #customimage': function(event,template){
        var files = $("#customimage")[0].files;
        S3.upload({
            files:files,
            path:"forum"
        },function(error,result){
            if(error){
                console.log(error);
            }else{
                //ForumTopics.update(template.data.topic._id,{$set: {mainphoto: result}});\
                console.log(result)
                $('#notifyContent').editable('writeImage', result.secure_url, true);
            }
        });
    },
    'change #iconselect': function(event,template){
        var icon = $('#iconselect > i').attr('class');
        $('#iconview').html('<span class="'+icon+'"></span>')
    },
    'click .save': function(event, template){
        if($('#title').val()=='' || $('#title').val()==' '){
            var error = true;
            bootbox.alert('You must provide a title.')
        }else{
            var nid = Notifications.update(template.data.notification._id,{$set:{
                title: $('#title').val(),
                description: $('#description').val(),
                type: $('#type').val(),
                alert: $('#alert').val(),
                visibility: $('#visibility').val(),
                icon: $('#iconselect > i').attr('class'),
                content: $('#notifyContent').editable('getHTML', true, true),
            }},function(){
                Router.go('notificationTypes',{type: 'drafts'})
            })
        }
    },
    'click .publish': function(event, template){
        if($('#title').val()=='' || $('#title').val()==' '){
            var error = true;
            bootbox.alert('You must provide a title.')
        }else{
            bootbox.confirm("Are you sure you want to publish this notification?", function(result) {
                if(result){
                    var nid = Notifications.update(template.data.notification._id,{$set:{
                        title: $('#title').val(),
                        description: $('#description').val(),
                        type: $('#type').val(),
                        alert: $('#alert').val(),
                        visibility: $('#visibility').val(),
                        icon: $('#iconselect > i').attr('class'),
                        content: $('#notifyContent').editable('getHTML', true, true),
                    }},function(){
                        Meteor.call('notificationPublish',template.data.notification._id,function(error,result){
                            if(error){  console.log(error)  }else{
                                Router.go('notificationView',{id: template.data.notification._id})
                            }
                        })
                    })
                }
            });
        }
    },
    'click .unpublish': function(event, template){
        bootbox.confirm("Are you sure you want to unpublish this notification?", function(result) {
            if(result){
                Meteor.call('notificationUnPublish',template.data.notification._id)
            }
        });
    },
    'click .archive': function(event, template){
        bootbox.confirm("Are you sure you want to archive this notification?", function(result) {
            if(result){
                Meteor.call('notificationArchive',template.data.notification._id)
            }
        });
    }
});

Template.notificationEdit.rendered = function(event,template) {
    var data = this.data;
    $('#alert').val(data.notification.alert)
    $('#visibility').val(data.notification.visibility)
    $('#type').val(data.notification.type)

    $('#iconselect').iconpicker({
        align: 'center', // Only in div tag
        arrowClass: 'btn-info',
        arrowPrevIconClass: 'fa fa-chevron-left',
        arrowNextIconClass: 'fa fa-chevron-right',
        cols: 10,
        icon: 'fa fa-bell-o',
        iconset: {
            iconClass: 'fa',
            iconClassFix: 'fa fa-',
            icons: [
                'map-o','map-signs','asterisk','automobile','bank','bed','bell-o','bolt','book','bookmark-o',
                'bug','bullhorn','bullseye','bus','calendar','camera','check-square-o','child','cog','comments','compass',
                'cutlery','envelope','exclamation-triangle','futbol-o','globe','graduation-cap','group','heart-o','hourglass-o',
                'key','leaf','newspaper-o','paper-plane-o','smile-o','sun-o','support','thumbs-o-down','thumbs-o-up','trash-o',
                'rocket','line-chart','pie-chart','paperclip','save','stethoscope','wheelchair'
            ],

        },
        labelHeader: '{0} of {1} pages',
        labelFooter: '{0} - {1} of {2} icons',
        placement: 'bottom', // Only in button tag
        rows: 5,
        selectedClass: 'btn-success',
        unselectedClass: ''
    });


    $('#notifyContent').editable({
        inlineMode: false,
        toolbarFixed: false,
        height: 550,
        autosave: true,
        autosaveInterval: 2500,
        buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'sep' , 'fontSize', 'color', 'sep', 'align', 'outdent', 'indent', 'insertOrderedList', 'insertUnorderedList','sep', 'selectAll', 'createLink', 'customImage', 'insertVideo', 'table', 'undo', 'redo', 'html', 'insertHorizontalRule', 'uploadFile', 'fullscreen'],
        customButtons: {
            // Insert HTML button with image button.
            customImage: {
                title: 'Insert HTML',
                icon: {
                    // Recommended size: 40 x 35.
                    type: 'font',

                    // src for the image.
                    value: 'fa fa-picture-o'
                },
                callback: function () {
                    //open the file dialog
                    $('#customimage').trigger('click');

                    // Save HTML in undo stack.
                    this.saveUndoStep();
                },
                refresh: function () { }
            }
        }
    });

    icon = this.data.notification.icon
    icon = icon.replace('glyphicon','')
    $('#iconselect').iconpicker('setIcon', icon)
}
