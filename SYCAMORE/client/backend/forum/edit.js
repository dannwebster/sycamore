
Template.forumEdit.helpers({
    'mine': function(){
        if(this.topic.composer == Meteor.userId()){
            return true;
        }
    },
    "files": function(){
        return S3.collection.find({percent_uploaded: {$lt: 100}});
    },
})
Template.forumEdit.events({
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
    'click .publishTopic': function(event, template){
        bootbox.confirm("Are you sure you want to update this topic?", function(result) {
            if(result){
                ForumTopics.update(template.data.topic._id,
                    {$set: { title: $('#title').val(), description: $('#description').val() }},function(error,result){
                    if(error){  console.log(error)  }else{
                        Router.go('forumView',{id: template.data.topic._id})
                    }
                })
            }
        });
    }
})
