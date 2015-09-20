Meteor.methods({
    'addNotification':function(userid){
        var nid = Notifications.insert({
            composer: userid,
            created: moment().format('X'),
            status: 0
        });
        if(nid){
            NotificationSubscribers.insert({notification: nid, user: userid, status:0});
        }
        return nid
    },
    'subscribeUsers': function(type,user,nid){
        if(type==='draft'){
            return NotificationSubscribers.insert({
                user: user,
                status: 0,
                notification: nid
            })
        }
    },
    'notificationRemove': function(id){
        Notifications.remove(id);
        NotificationSubscribers.remove({notification: id});
    },
    'notificationUnPublish': function(id){
        Notifications.update(id,{$set: {status: 0}});
        NotificationSubscribers.update({notification: id},{$set: {status: 0}},{ multi: true});
    },
    'notificationArchive': function(id){
        Notifications.update(id,{$set: {status: 1, archived: true}});
        NotificationSubscribers.update({notification: id},{$set: {status: 1, archived: true}},{multi: true});
    },
    'notificationUserArchive': function(user,id){
        NotificationSubscribers.update({user: user, notification: id},{$set: {status: 1, archived: true}});
    },
    'notificationUserUnarchive': function(user,id){
        NotificationSubscribers.update({user: user, notification: id},{$set: {status: 1, archived: false}});
    },
    'markNotificationRead': function(user,id){
        NotificationSubscribers.update({user: user, notification: id},{$set: {read: true}});
    }
})
