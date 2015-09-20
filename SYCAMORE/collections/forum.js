Meteor.methods({
    'addForum':function(userid){
        var fid = ForumTopics.insert({
            composer: userid,
            created: moment().format('X'),
            last_post: moment().format('X'),
            status: 0
        });
        if(fid){
            ForumSubscribers.insert({topic: fid, user: userid});
            ForumTopics.update(fid,{$inc: {subscribers: 1}})
        }
        return fid
    },
    'forum_photo': function(response){
        ForumTopics.update(response.context.forum._id,{$set: {mainphoto: response.upload_data.public_id}})

    },
    'forumRemove': function(id){
        ForumTopics.remove(id)
    },
    'forumPublish': function(id){
        ForumTopics.update(id,{$set: {status: 1}});
        var topic = ForumTopics.findOne(id);
        var data = {
            user: topic.composer,
            comment: topic.content,
            thread: id,
            added: moment().format('X'),
        }

        ForumComments.insert(data);
        ForumTopics.update(id,{$inc: {comments: 1}});
    },
    'leaveThread': function(user,topic){
        var forum = ForumTopics.findOne(topic);
        if(forum.subscribers <= 0){
            ForumTopics.update(topic,{$set: {subscribers: 0}})
        }else{
            ForumTopics.update(topic,{$inc: {subscribers: -1}})
        }
        return ForumSubscribers.remove({user: user,topic: topic});
    },
    'commentThread': function(data){
        ForumComments.insert(data);
        ForumTopics.update(data.thread,{$inc: {comments: 1}})
    }
})
