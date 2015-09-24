// this app makes me sad, here we're using someone's horrible code to meet a deadline
// the app is going to break and everyone is going to get upset
// don't expect people to rebuild huge portions of an application in less than 3 days
// i cannot vouch that anything will function properly / not break within a week
// but i cannot stomach fixing what is honestly the worst code i have ever seen dating back to high school when people were learning the first steps
// so here are my patches:
// sorry to whoever deals with this after me
// we can share a beer and commiserate 

// throw the junk here
function dealWithNotifications(userId, doc){
    var nid = Notifications.insert({
        composer: userId,
        author: userId,
        created: moment().format('X'),
        createdAt: moment().format('X'),
        status: 1,
        calendarEvent: true,
        eventId: doc._id,
        visibility: doc.guests,
        invitees: doc.invitees? doc.invitees: null,
        title: doc.name,
        icon: 'fa fa-calendar'
    });
    if(nid){
        NotificationSubscribers.insert({notification: nid, user: userId, status:1});
        Meteor.call('notificationPublish',nid,function(e,r){
            console.log(e);
            console.log(r);
        });
    }
}

CalendarEvents.after.insert(function (userId, doc) {
    // update the notification or resend a new one
    dealWithNotifications(userId, doc);
});

CalendarEvents.after.update(function (userId, doc, fieldNames, modifier, options) {
    // lol this notification setup is a freaking joke ~ i couldn't even make it this bad if i tried
    // update the notification or resend a new one if we're not adjusting the rsvp
    // if(fieldNames.length > 1 || fieldNames[0] !== 'rsvp_list'){
    //     dealWithNotifications(userId, doc);
    // }
});

CalendarEvents.after.remove(function (userId, doc) {
    // update the notification or resend a new one
    // dealWithNotifications(userId, doc);
});