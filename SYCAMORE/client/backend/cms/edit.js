Template.editContent.helpers({
    'post_date': function(){
        return moment.unix(this.post.post_date).format('MM/DD/YYYY h:mm A');
    },
    "files": function(){
        return S3.collection.find({percent_uploaded: {$lt: 100}});
    },
    'statusOptions': function(){
        var status = this.post.status;
        var options = "<option value='draft'";
        if(status=='draft'){  options += " selected ";  }
        options += ">Draft</option>";
        options += "<option value='scheduled'";
        if(status=='scheduled'){  options += " selected ";  }
        options += ">Scheduled</option>";
        options += "<option value='live'";
        if(status=='live'){  options += " selected ";  }
        options += ">Live</option>";
        return options;
    },
    'visibilityOptions': function(){
        var visibility = this.post.visibility;
        var options = "<option value='public'";
        if(visibility=='public'){  options += " selected ";  }
        options += ">Public</option>";
        options += "<option value='users'";
        if(visibility=='users'){  options += " selected ";  }
        options += ">Logged in Users</option>";
        options += "<option value='parents_educators'";
        if(visibility=='parents_educators'){  options += " selected ";  }
        options += ">Parents & Educators</option>";
        options += "<option value='educators'";
        if(visibility=='educators'){  options += " selected ";  }
        options += ">Educators Only</option>";

        return options;
    },
    'scheduled': function(){
        if(this.post.status=='scheduled'){
            return true
        }
    }
});

Template.editContent.events({
    'change .auto_save': function(event,template){
        var field = event.currentTarget.id;
        var id = template.data.post._id;
        var update = {};
        update[field] = $('#'+field).val();
        update['autosaved'] = moment().format('X');

        if(field==='title'){
            var url = $('#'+field).val();
            update.url = url.toLowerCase().replace(/\s/g, "-");
        }

        Blog.update(id,{$set: update},function(err, success){
            if(success){
                sAlert.info(template.data.notify_title+' Auto-Saved');
            }
        });
    },
    'click .emobile': function(event,template){
        $('.contentMain').hide();
        $('.contentMobile').show();
    },
    'click .emain': function(event,template){
        $('.contentMobile').hide();
        $('.contentMain').show();
    },
    'click .addmobile': function(event,template){
        Blog.update(template.data.post._id,{$set: {mobile: ' '}})
    },
    'click .removemobile': function(event,template){
        Blog.update(template.data.post._id,{$unset: {mobile: null}});
        $('.contentMobile').hide();
        $('.contentMain').show();
    },
    'change .headerImage': function(event,template){
        var files = $(".headerImage")[0].files;
        S3.upload({
            files:files,
            path:"pages"
        },function(e,r){
            if(r){
                //Projects.update(template.data.project._id,{$unset: mainphoto},
            }
            Blog.update(template.data.post._id,{$set: {headerImage: r}});
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
                $('#content').editable('writeImage', result.secure_url, true);
            }
        });
    },
    'change #mcustomimage': function(event,template){
        var files = $("#mcustomimage")[0].files;
        S3.upload({
            files:files,
            path:"forum"
        },function(error,result){
            if(error){
                console.log(error);
            }else{
                //ForumTopics.update(template.data.topic._id,{$set: {mainphoto: result}});\
                console.log(result)
                $('#mobilecontent').editable('writeImage', result.secure_url, true);
            }
        });
    },
    'blur #post_date': function(event,template){
        var id = template.data.post._id;
        var update = {
            post_date: moment($('#post_date').val(), 'MM/DD/YYYY h:mm A').format('X'),
            autosaved: moment().format('X')
        };
        Blog.update(id,{$set: update},function(err, success){
            if(success){    sAlert.info(template.data.notify_title+' Auto-Saved');    }
        })
    },
    'click .save': function(){

    },
    'click .discard': function(event,template){
        bootbox.confirm("Are you sure you want to delete this post?", function(result) {
            if(result){
                Blog.update(template.data.post._id,{$set: {status: 'trash'}},function(){
                    Router.go(template.data.type+'Manage',{view: template.data.post.status});
                })
            }
        });
    }
})

Template.editContent.rendered = function(event,template) {
    var data = this.data;

    if(data.compose){
        var now = moment().format('MM/DD/YYYY h:mm A');
        var created = moment.unix(data.post.created).format('MM/DD/YYYY h:mm A');
        if(now == created){
            sAlert.info('New '+data.notify_title+' Created');
        }
    }

    $('#content').editable({
        inlineMode: false,
        height:500,
        buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'sep' , 'fontSize', 'color', 'sep', 'align', 'outdent', 'indent', 'insertOrderedList', 'insertUnorderedList','sep', 'selectAll', 'createLink', 'customImage', 'insertVideo', 'table', 'undo', 'redo', 'html', 'insertHorizontalRule', 'uploadFile', 'fullscreen'],
        customButtons: {
            // Insert HTML button with image button.
            customImage: {
                title: 'Insert Image',
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
        var id = data.post._id;
        var update = {
            content: $('#content').editable('getHTML', true, true),
            autosaved: moment().format('X')
        };
        console.log(update);
        console.log(data);
        Blog.update(id,{$set: update},function(err, success){
            if(err){  console.log(err)}
            if(success){
                 //sAlert.info(data.notify_title+' Auto-Saved');
             }
        })

    });


    $('#mobilecontent').editable({
        inlineMode: false,
        height:500,
        buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'sep' , 'fontSize', 'color', 'sep', 'align', 'outdent', 'indent', 'insertOrderedList', 'insertUnorderedList','sep', 'selectAll', 'createLink', 'customImage', 'insertVideo', 'table', 'undo', 'redo', 'html', 'insertHorizontalRule', 'uploadFile', 'fullscreen'],
        customButtons: {
            // Insert HTML button with image button.
            customImage: {
                title: 'Insert Image',
                icon: {
                    // Recommended size: 40 x 35.
                    type: 'font',

                    // src for the image.
                    value: 'fa fa-picture-o'
                },
                callback: function () {
                    //open the file dialog
                    $('#mcustomimage').trigger('click');

                    // Save HTML in undo stack.
                    this.saveUndoStep();
                },
                refresh: function () { }
            }
        }
    }).on('editable.contentChanged', function (e, editor) {
        var id = data.post._id;
        var update = {
            mobile: $('#mobilecontent').editable('getHTML', true, true),
            autosaved: moment().format('X')
        };
        console.log(update);
        console.log(data);
        Blog.update(id,{$set: update},function(err, success){
            if(err){  console.log(err)}
            if(success){
                 //sAlert.info(data.notify_title+' Auto-Saved');
             }
        })

    });
}
