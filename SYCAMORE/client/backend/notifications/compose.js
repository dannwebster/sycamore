Template.notificationCompose.helpers({
    'timestamp': function(){
        return moment.unix(this.notification.created).format('MMM D, YYYY')
    }
});
Template.notificationCompose.events({
    'click .cancel': function(event, template){
        bootbox.confirm("Are you sure you want to discard this post?", function(result) {
            if(result){
                Router.go('notifications');
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
        $('#iconview').html('<span class="fa '+icon+'"></span>')
    },
    'click .saveDraft': function(event, template){
        if($('#title').val()=='' || $('#title').val()==' '){
            var error = true;
            bootbox.alert('You must provide a title.')
        }else if($('#notifyContent').editable('getHTML', true, true)=='' || $('#notifyContent').editable('getHTML', true, true)==' '){
            var error = true;
            bootbox.alert('You must provide content.')
        }else{
            var nid = Notifications.insert({
                title: $('#title').val(),
                author: Meteor.userId(),
                composer: Meteor.userId(),
                created: moment().format('X'),
                type: $('#type').val(),
                alert: $('#alert').val(),
                visibility: $('#visibility').val(),
                icon:  $('#iconselect > i').attr('class'),
                content: $('#notifyContent').editable('getHTML', true, true),
                status: 0
            })
            console.log(nid)
            if(nid){
                Meteor.call('subscribeUsers','draft',Meteor.userId(),nid, function(error,result){
                    if(error){alert(error)}
                    else{
                        Router.go('notificationTypes',{type: 'drafts'})
                    }
                })
            }
        }
    },
    'click .publish': function(event, template){
        var nid = Notifications.insert({
            title: $('#title').val(),
            description: $('#description').val(),
            author: Meteor.userId(),
            composer: Meteor.userId(),
            created: moment().format('X'),
            type: $('#type').val(),
            alert: $('#alert').val(),
            visibility: $('#visibility').val(),
            icon:  $('#iconselect > i').attr('class'),
            content: $('#notifyContent').editable('getHTML', true, true),
            status: 0
        })
        Meteor.call('subscribeUsers','draft',Meteor.userId(),nid)
        bootbox.confirm("Are you sure you want to publish this notification?", function(result) {
            if(result){
                Meteor.call('notificationPublish',nid,function(error,result){
                    if(error){  console.log(error)  }else{
                        Router.go('notifications')
                    }
                })
            }
        });
    }
});

Template.notificationCompose.rendered = function(event,template) {
    var data = this.data;
    $('#target').iconpicker();

    // Custom options
    $('#iconselect').iconpicker({
        align: 'center', // Only in div tag
        arrowClass: 'btn-info',
        arrowPrevIconClass: 'fa fa-chevron-left',
        arrowNextIconClass: 'fa fa-chevron-right',
        cols: 10,
        icon: 'fa fa-bell',
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
}
