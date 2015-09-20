Template.projectEdit.helpers({
    "files": function(){
        return S3.collection.find({percent_uploaded: {$lt: 100}});
    },
    'status':function(){
        if(this.project.status==0){
            return {
                live: false,
                draft: true,
                archived: false
            }
        }else if(this.project.status==1){
            return {
                live: true,
                draft: false,
                archived: false
            }
        }else if(this.project.status==2){
            return {
                live: false,
                draft: false,
                archived: true
            }
        }
    }
});
Template.projectEdit.events({
    'click .distribute': function(event,template){
        bootbox.confirm("Are you sure you want to make this project active?", function(result) {
            if(result){
                Meteor.call('distributeProject',template.data.project._id,function(){
                    Router.go('projectView',{id: template.data.project._id})
                })
            }
        });
    },
    'click .rescind': function(event,template){
        bootbox.confirm("Are you sure you want to remove this project from Student View?", function(result) {
            if(result){
                Meteor.call('rescindProject',template.data.project._id)
            }
        });
    },
    'click .delete': function(event,template){
        bootbox.confirm("Are you sure?", function(result) {
            if(result){
                Meteor.call('removeProject',template.data.project._id,function(){
                    Router.go('projects')
                })
            }
        });
    },
    'click .archive': function(event,template){
        bootbox.confirm("Are you sure you want to Archive this project?", function(result) {
            if(result){
                Meteor.call('archiveProject',template.data.project._id,function(){
                    Router.go('projects')
                })
            }
        });
    },
    'click .unarchive': function(event,template){
        bootbox.confirm("Are you sure you want to Archive this project?", function(result) {
            if(result){
                Meteor.call('unarchiveProject',template.data.project._id,function(){
                    Router.go('projects')
                })
            }
        });
    },
    'change .mainphoto': function(event,template){
        var files = $(".mainphoto")[0].files;
        S3.upload({
            files:files,
            path:"projects"
        },function(e,r){
            if(r){
                //Projects.update(template.data.project._id,{$unset: mainphoto},
            }
            Projects.update(template.data.project._id,{$set: {mainphoto: r}});
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
                $('#projectContent').editable('writeImage', result.secure_url, true);
            }
        });
    },
    'change .attachment': function(event,template){
        var files = $(".attachment")[0].files;
        S3.upload({
            files:files,
            path:"projects"
        },function(e,r){
            Projects.update(template.data.project._id,{$addToSet: {files: r}});
        });
    },
    'change .editMe': function(event,template){

        var item = event.currentTarget.id;
        var name = $('#'+item).attr('name');
        var value = $('#'+item).val();
        var update = {}
        if(value==''){
            update[item] = null;
            console.log(update)
            Projects.update(template.data.project._id,{$unset: update},
                function(err, success){
                    if(err){  console.log(err)}
                    if(success){    sAlert.info(name+' Updated');    }
                }
            )
        }else{
            update[item] = value;
            console.log(update)
            Projects.update(template.data.project._id,{$set: update},
                function(err, success){
                    if(err){
                        console.log(err)
                    }
                    if(success){
                        //sAlert.info(name+' Updated');
                    }
                }
            )
        }
    }
});

Template.project_fileDisplay.helpers({
    'doc': function(){
        getIcon = function(filetype){
            switch(filetype){
                case 'xlsx': return 'file-excel-o'; break;
                case 'xls': return 'file-excel-o'; break;
                case 'pdf': return 'file-pdf-o'; break;
                case 'doc': return 'file-word-o'; break;
                case 'docx': return 'file-word-o'; break;
                case 'txt': return 'file-text-o'; break;
                case 'pptx': return 'file-powerpoint-o'; break;
                case 'ppt': return 'file-powerpoint-o'; break;
                default: return 'file'
            }
        }
        var doc = this.file;
        var data = {
            link: doc.secure_url,
            name: doc.file.original_name
        }

        var parts = doc.file.name.split('.')
        var type = parts[1]
        if(type=='jpeg'||type=='png'||type=='gif'||type=='jpg'){
            data.type = 'image';
            data.image = true;
        }else{
            data.type = parts[1],
            data.icon = getIcon(parts[1])
        }
        return data
    }
})
Template.project_fileDisplay.events({
    'click .remove': function(event,template){
        bootbox.confirm("Are you sure you want to delete this attachment?", function(result) {
            if(result){
                console.log(template.data)
                Projects.update(template.data.parent,{$pull: {'files': {_id: template.data.file._id }}})
            }
        });
    },
})

Template.projectEdit.rendered = function(event,template) {
    var data = this.data;
    //$('.datetimepicker').datetimepicker();
    var picker = new Pikaday({
        field: document.getElementById('due'),
        format: 'dddd, MM/DD/YYYY',
        defaultDate: function(){
            return moment.unix(data.project.due).format("dddd, MM/DD/YYYY")
        },
        onSelect: function() {
            Projects.update(data.project._id,{$set: {due: this.getMoment().format('X')}},
            function(err, success){
                if(err){  console.log(err)}
                if(success){
                    //sAlert.info('Due Date Updated');
                }
            }            );
        }
    });

    picker.setDate(moment.unix(data.project.due).format("dddd, MM/DD/YYYY"))

    $('#projectContent').editable({
        inlineMode: false,
        height:500,
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
        var id = $('#projectContent').attr('name')
        Projects.update(id,{$set: {content: $('#projectContent').editable('getHTML', true, true)}},function(err, success){
            if(err){    console.log(err)    }
            if(success){
                //sAlert.info('Project Content Updated');
            }
        })
    })

    $('#projectContent').editable('setHTML', data.project.content, false);
}
