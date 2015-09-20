Meteor.publish('oneNotification',function(id) {
    return Notifications.find(id)
});
/*
Meteor.publish('notificationTypes',function(type,user) {
    switch(type){
        case 'drafts':
        return Notifications.find({status: 0, author: user},{sort: {created: -1}})
        break;
        case 'sent':
        Meteor.publishWithRelations({
            handle: this,
            collection: NotificationSubscribers,
            filter: {status: 1, user: user},
            options: {
                sort: { sendDate: -1 }
            },
            mappings: [{
                //reverse: true,
                key: 'notification',
                collection: Notifications,
                options: {
                    status: 1,
                    author: user,
                    sort: { sendDate: -1 }
                },
            }]
        });
        break;
        case 'archived':
        Meteor.publishWithRelations({
            handle: this,
            collection: NotificationSubscribers,
            filter: {status: 1, user: user, archived: true},
            options: {
                limit: 10,
                sort: { sendDate: -1 }
            },
            mappings: [{
                //reverse: true,
                key: 'notification',
                collection: Notifications,
                options: {
                    limit: 10,
                    sort: { createdAt: -1 }
                },
            }]
        });
        break;
        case 'starred':
        Meteor.publishWithRelations({
            handle: this,
            collection: NotificationSubscribers,
            filter: {status: 1, user: user, starred: true},
            options: {
                limit: 10,
                sort: { sendDate: -1 }
            },
            mappings: [{
                //reverse: true,
                key: 'notification',
                collection: Notifications,
                options: {
                    limit: 10,
                    sort: { createdAt: -1 }
                },
            }]
        });
        break;
    }

});
*/
Meteor.publishComposite('notifications', function(user){
    return {
        find: function() {
            // Find top ten highest scoring posts
            return NotificationSubscribers.find({status: 1, user: user, archived: false});
        },
        children: [
            {
                find: function(notification) {
                    // Find post author. Even though we only want to return
                    // one record here, we use "find" instead of "findOne"
                    // since this function should return a cursor.
                    return Notifications.find({ _id: notification.notification },{ sort: { createdAt: 1 } });
                }
            }
        ]
    }
});


Meteor.publishComposite('notificationsArchived', function(user){
    return {
        find: function() {
            // Find top ten highest scoring posts
            return NotificationSubscribers.find({status: 1, user: user, archived: true});
        },
        children: [
            {
                find: function(notification) {
                    // Find post author. Even though we only want to return
                    // one record here, we use "find" instead of "findOne"
                    // since this function should return a cursor.
                    return Notifications.find({ _id: notification.notification },{ sort: { createdAt: 1 } });
                }
            }
        ]
    }
});

Meteor.publishComposite('notificationTypes',function(type,user) {
    switch(type){
        case 'drafts':
            return {
                find: function() {
                    // Find top ten highest scoring posts
                    return Notifications.find({status: 0, author: user},{sort: {created: -1}});
                }
            }
        break;
        case 'sent':
            Meteor.publishWithRelations({
                handle: this,
                collection: NotificationSubscribers,
                filter: {status: 1, user: user},
                options: {
                    sort: { sendDate: -1 }
                },
                mappings: [{
                    //reverse: true,
                    key: 'notification',
                    collection: Notifications,
                    options: {
                        status: 1,
                        author: user,
                        sort: { sendDate: -1 }
                    },
                }]
            });
        break;
        case 'archived':
            return {
                find: function() {
                    // Find top ten highest scoring posts
                    return NotificationSubscribers.find({status: 1, user: user, archived: true});
                },
                children: [
                    {
                        find: function(notification) {
                            // Find post author. Even though we only want to return
                            // one record here, we use "find" instead of "findOne"
                            // since this function should return a cursor.
                            return Notifications.find({ _id: notification.notification },{ sort: { createdAt: 1 } });
                        }
                    }
                ]
            }
        break;
        case 'starred':
            return {
                find: function() {
                    // Find top ten highest scoring posts
                    return NotificationSubscribers.find({status: 1, user: user, starred: true});
                },
                children: [
                    {
                        find: function(notification) {
                            // Find post author. Even though we only want to return
                            // one record here, we use "find" instead of "findOne"
                            // since this function should return a cursor.
                            return Notifications.find({ _id: notification.notification },{ sort: { createdAt: 1 } });
                        }
                    }
                ]
            }
        break;
    }

});

Meteor.publish('topNotifications', function(user) {
    Meteor.publishWithRelations({
        handle: this,
        collection: NotificationSubscribers,
        filter: {status: 1, user: user, archived: false},
        mappings: [{
            //reverse: true,
            key: 'notification',
            collection: Notifications,
            options: {
                limit: 1,
                sort: { createdAt: -1 }
            },
        }]
    });
});

Meteor.publish('singleNotiSub',function(user,noti){
    return NotificationSubscribers.find({user: user, notification: noti})
})

Meteor.publish('educatorNotifications', function(user) {
    Meteor.publishWithRelations({
        handle: this,
        collection: NotificationSubscribers,
        filter: {status: 1, user: user, archived: false},
        mappings: [{
            //reverse: true,
            key: 'notification',
            collection: Notifications,
            options: {
                limit: 10,
                sort: { createdAt: -1 }
            },
        }]
    });
});
