Meteor.methods({
    'addChat': function(data,notifications){
        var id = Chats.insert({
            conversation: data.conversation,
            timestamp: data.timestamp,
            file: data.file,
            text: data.text,
            user: data.user
        });
        Conversations.update(data.conversation,{$set: {last_post: data.timestamp, last_post_id: id}})

        var conversation = Conversations.findOne(data.conversation);

        _.each(conversation.users,function(user){
            if(user != data.user){
                MyConversations.upsert({
                    conversation: conversation._id, user: user
                },
                    {
                        $inc: { unreadCount: 1 }
                    }
                )
            }
        })
    },
    'resetMyConvo': function(conversation,user){
        MyConversations.update({conversation: conversation, user: user},{$set: {unreadCount: 0}})
    },
    'addTopicChat': function(data,notifications){
        var conversation = Conversations.findOne({type: data.type, uid: data.uid});
        var id = Chats.insert({
            conversation: conversation._id,
            timestamp: data.timestamp,
            file: data.file,
            text: data.text,
            user: data.user,
            system: data.system
        });
        Conversations.update(conversation._id,{$set: {last_post: data.timestamp, last_post_id: id}})

        _.each(conversation.users,function(user){
            if(user != data.user){
                MyConversations.upsert({
                    conversation: conversation._id, user: user
                },
                    {
                        $inc: { unreadCount: 1 }
                    }
                )
            }
        })
    },
    'startConversation': function(convo,data,notifications){
        var convo_id = Conversations.findAndModify({
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
        var chatid = Chats.insert({
            conversation: convo_id._id,
            timestamp: data.timestamp,
            text: data.text,
            user: data.user
        })

        Conversations.update(convo_id,{$set: {last_post: data.timestamp, last_post_id: chatid}})

        var conversation = Conversations.findOne(convo_id);

        _.each(conversation.users,function(user){
            if(user != data.user){
                MyConversations.upsert({
                    conversation: convo_id, user: user
                },
                    {
                        $inc: { unreadCount: 1 }
                    }
                )
            }
        })

    },
    'startTopic': function(convo,data,notifications){
        var convo_id = Conversations.findAndModify({
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
        var chatid = Chats.insert({
            conversation: convo_id,
            timestamp: data.timestamp,
            text: data.text,
            user: data.user
        })

        _.each(conversation.users,function(user){
            if(user != data.user){
                MyConversations.upsert({
                    conversation: convo_id, user: user
                },{$set:
                    {
                        $inc: { unreadCount: 1 }
                    }
                })
            }
        })
    }
});
