ChatHub = {}

ChatHub.config = function(options){
    console.log(options)
}

Meteor.methods({
    'addChat': function(data,notifications){
        console.log(data)
        var id = MEchathub_chats.insert({
            conversation: data.conversation,
            timestamp: data.timestamp,
            file: data.file,
            text: data.text,
            user: data.user
        });
        console.log(id)
        MEchathub_conversations.update(data.conversation,{$set: {last_post: data.timestamp}})
    },
    'addTopicChat': function(data,notifications){
        var conversation = MEchathub_conversations.findOne({type: data.type, uid: data.uid});
        MEchathub_chats.insert({
            conversation: conversation._id,
            timestamp: data.timestamp,
            file: data.file,
            text: data.text,
            user: data.user
        });
        MEchathub_conversations.update(conversation._id,{$set: {last_post: data.timestamp}})
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
    },
    'startTopic': function(convo,data,notifications){
        var convo_id = MEchathub_conversations.findAndModify({
            query: {users: convo.users, type: convo.topic, uid: convo.uid},
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

Meteor.publish('ME_ChatHub_Topics',function(type,uid){
    //console.log(conversation);
    var convo = MEchathub_conversations.findOne({type: type, uid: uid});
    if(!convo){
        var convo = MEchathub_conversations.insert({type: type, uid: uid});
        var chats = MEchathub_chats.find({conversation: convo});
    }else{
        var chats = MEchathub_chats.find({conversation: convo._id});
    }

    //console.log(chats.fetch())
    return chats
})

Meteor.publish('ME_ChatHub_Conversations',function(user){
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
    var convo = MEchathub_conversations.find({type: 'direct'},{sort: { last_post: -1 }});
    return convo;
})

Meteor.publish('ME_ChatHub_LastChat',function(conversation){
    //console.log(conversation);
    var chats = MEchathub_chats.find({conversation: conversation},{sort: {createdAt: 1}, limit: 1});
    //console.log(chats.fetch())
    return chats
})

Meteor.publish('ME_usernames', function() {
    var users = Meteor.users.find({},{fields: {username: 1, emails: 1, _id: 1, 'profile.photo': 1, 'profile.firstname': 1, 'profile.lastname':1}});
    return users
});
