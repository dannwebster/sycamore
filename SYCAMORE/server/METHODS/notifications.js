subscribeUsersBulk = function(users,nid,status,archived){
    _.each(users.fetch(),function(user){
        NotificationSubscribers.upsert({
            notification: nid,
            user: user._id
        },{$set: {
            status: status,
            archived: archived
        }})
        //console.log(users.fetch())
    });
}

Meteor.methods({
    'notificationStar': function(user,nid){
        //console.log(user,nid)
        NotificationSubscribers.update({user: user, notification: nid},{$set: { starred: true}});
    },
    'notificationUnStar': function(user,nid){
        //console.log(user,nid)
        NotificationSubscribers.update({user: user, notification: nid},{$unset: { starred: null}});
    },
    'notificationPublish': function(id){
        var noti = Notifications.findOne(id);
        //console.log(noti)
        if(noti.visibility==='all'){
            var users = Meteor.users.find();
        }else if(noti.visibility==='students'){
            var students = Meteor.users.find({roles: 'student'});
            var teachers = Meteor.users.find({roles: 'educator'});
            var admins = Meteor.users.find({roles: 'superadmin'});
        }else if(noti.visibility === 'parents'){
            var teachers = Meteor.users.find({roles: 'educator'});
            var admins = Meteor.users.find({roles: 'superadmin'});
            var parents = Meteor.users.find({roles: 'parent'});
        }else if(noti.visibility === 'educators'){
            var teachers = Meteor.users.find({roles: 'educator'});
            var admins = Meteor.users.find({roles: 'superadmin'});
        }else if(noti.visibility === 'invited'){
            var invitees = Meteor.users.find({_id: {$in: _.pluck(invitees, 'id')}});
        }

        if(users){  subscribeUsersBulk(users,id,'1',false)}
        if(students){  subscribeUsersBulk(students,id,'1',false)}
        if(teachers){  subscribeUsersBulk(teachers,id,'1',false)}
        if(admins){  subscribeUsersBulk(admins,id,'1',false)}
        if(parents){  subscribeUsersBulk(parents,id,'1',false)}
        if(invitees){  subscribeUsersBulk(invitees,id,'1',false)}


        Notifications.update(id,{$set: {status: 1, sendDate: moment().format('X')}});
        NotificationSubscribers.update({notification: id},{$set: {status: 1, archived: false, sendDate: moment().format('X')}},{multi: true});

    }
})
