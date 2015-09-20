
Meteor.publish('Chats',function(conversation){
    //console.log(conversation);
    var chats = Chats.find({conversation: conversation});
    //console.log(chats.fetch())
    return chats
})

Meteor.publish('Topics',function(type,uid){
    //console.log(conversation);
    var convo = Conversations.findOne({type: type, uid: uid});
    if(!convo){
        var convo = Conversations.insert({type: type, uid: uid});
        var chats = Chats.find({conversation: convo});
    }else{
        var chats = Chats.find({conversation: convo._id});
    }

    //console.log(chats.fetch())
    return chats
})

Meteor.publish('Conversations',function(user){
    /*Meteor.publishWithRelations({
        handle: this,
        collection: MEchathub_conversations,
        filter: { type: 'direct' },
        options: {
            sort: { last_post: -1 }
        },
        mappings: [
            {
                key: 'conversation',
                collection: MEchathub_chats,
                options: {
                    limit: 1
                },
            }
        ]
    });*/
    var convo = Conversations.find({type: 'direct'},{sort: { last_post: -1 }});
    return convo;
})

Meteor.publish('MyConversations',function(user){
    var convo = MyConversations.find({user: user, unreadCount: {$gt: 0}});
    return convo;
})

Meteor.publish('OneOfMyConversations',function(conversation){
    var convo = MyConversations.find({conversation: conversation});
    return convo;
})

Meteor.publish('LastChat',function(lastChat){
    //console.log(conversation);
    var chats = Chats.find(lastChat);
    //console.log(chats.fetch())
    return chats
})

Meteor.publish('Usernames', function() {
    var users = Meteor.users.find({},{fields: {username: 1, emails: 1, _id: 1, 'profile.photo': 1, 'profile.firstname': 1, 'profile.lastname':1}});
    return users
});
