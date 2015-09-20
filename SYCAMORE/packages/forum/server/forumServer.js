meForum = {}

meForum.config = function(options){
    console.log(options)
}
/*
Meteor.methods({
    'addChat': function(data,notifications){
        MEchathub_chats.insert({
            conversation: data.conversation,
            timestamp: data.timestamp,
            text: data.text,
            user: data.user
        });
        MEchathub_conversations.update(data.conversation,{$set: {last_post: data.timestamp}})
    },
    'startConversation': function(convo,data,notifications){
        var convo_id = MEchathub_conversations.findAndModify({
            query: {users: convo.users, type: 'direct'},
            update: {$set: {
                timestamp: convo.timestamp,
                last_post: convo.timestamp
            }},
            upsert: true,
            new: true,
            fields: {_id: 1}
        });
        console.log(convo_id)
        var chatid = MEchathub_chats.insert({
            conversation: convo_id._id,
            timestamp: data.timestamp,
            text: data.text,
            user: data.user
        })
    }
});

Meteor.publish('ME_ChatHub_Chats',function(conversation){
    //console.log(conversation);
    var chats = MEchathub_chats.find({conversation: conversation});
    //console.log(chats.fetch())
    return chats
})

Meteor.publish('ME_ChatHub_Conversations',function(user){
    var convo = MEchathub_conversations.find({type: 'direct'});
    return convo;
})

Meteor.publish('ME_usernames', function() {
    var users = Meteor.users.find({},{fields: {username: 1, emails: 1, _id: 1, 'profile.photo': 1, 'profile.firstname': 1, 'profile.lastname':1}});
    return users
});
*/
