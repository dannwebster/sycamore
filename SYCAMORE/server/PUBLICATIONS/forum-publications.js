Meteor.publish('myForumTopics', function(userid) {
    return ForumTopics.find({composer: userid, status:1},{sort: {last_post: -1}});
});

Meteor.publish('myForumSubscriptions', function(userid) {
    return ForumSubscribers.find({user: userid});
});

Meteor.publish('popularForumTopics', function() {
    return ForumTopics.find({status: 1},{sort: {subscribers: -1, last_post: -1}});
});

Meteor.publish('oneForumTopic', function(id) {
    return ForumTopics.find(id);
});

Meteor.publish('forumSubscribers', function(fid) {
    return ForumSubscribers.find({topic: fid});
});

Meteor.publish('MErelationship',function(relationship,parent){
 // return ME_Relations.find({project: parent, name: relationship});
  return ME_Relations.find({});
});

Meteor.publish('MErelationship2',function(){
  return ME_Relations.find({});
});

Meteor.publish('ForumThreadComments',function(topic){
    return ForumComments.find({thread: topic});
})
