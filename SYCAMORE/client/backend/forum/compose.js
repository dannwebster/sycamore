Template.forumCompose.helpers({
    "files": function(){
        return S3.collection.find();
    },
    'timestamp': function(){
        return moment.unix(this.topic.created).format('MMM D, YYYY')
    }
});
Template.forumCompose.events({
    'click .cancelTopic': function(event, template){
        bootbox.confirm("Are you sure you want to delete this topic?", function(result) {
            if(result){
                Meteor.call('forumRemove',template.data.topic._id,function(error,result){
                    if(error){  console.log(error)  }else{
                        Router.go('forum')
                    }
                })
            }
        });
    },
    'change .editMe': function(event,template){
        var update = {}
        var field = $(event.target).attr('name');
        var id = $(event.target).attr('id');
        update[field] = $(event.target).val()
        ForumTopics.update(id,{$set: update },
            function(err, success, field){
                if(err){
                    console.log(err)
                }
                if(success){
                    //$(this).editable('setHTML', '<p>My custom paragraph.</p>', false);
                    //sAlert.info('Forum Updated');
                }
            }
        )
    },
    'change .mainphoto': function(event,template){
        var files = $(".mainphoto")[0].files;
        S3.upload({
            files:files,
            path:"projects"
        },function(error,result){
            if(error){
                console.log(error);
            }else{
                ForumTopics.update(template.data.topic._id,{$set: {mainphoto: result}});
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
                $('#forumContent').editable('writeImage', result.secure_url, true);
            }
        });
    },
    'change #forumContent': function(event,template){
        ForumTopics.update(template.data.topic._id,{$set: {content: $('#forumContent').editable('getText') }})
    },
    'change .visibility': function(event, template){
        ForumTopics.update(template.data.topic._id,{$set: {visibility: $('#visibility').val() }})
    },
    'click .publishTopic': function(event, template){
        bootbox.confirm("Are you sure you want to publish this topic?", function(result) {
            if(result){
                Meteor.call('forumPublish',template.data.topic._id,function(error,result){
                    if(error){  console.log(error)  }else{
                        Router.go('forumView',{id: template.data.topic._id})
                    }
                })
            }
        });
    }
});

Template.forumCompose.rendered = function(event,template) {
    var data = this.data;

    $('#forumContent').editable({
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
    }).on('editable.contentChanged', function (e, editor) {
        var id = $('#forumContent').attr('name')
        ForumTopics.update(id,{$set: {content: $('#forumContent').editable('getHTML', true, true)}},
        function(err, success){
            if(err){
                console.log(err)
            }
            if(success){
                //sAlert.info('Forum Content Updated');
            }
        }
    )
});
}
