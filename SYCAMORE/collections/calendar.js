Meteor.methods({
    'CreateSpecialEvent': function(data,userid){
        var cid = CalendarEvents.insert(data);

        var nid = Notifications.insert({
            composer: userid,
            author: userid,
            created: moment().format('X'),
            createdAt: moment().format('X'),
            status: 1,
            calendarEvent: true,
            eventId: cid,
            visibility: data.guests,
            title: data.name,
            icon: 'fa fa-calendar'
        });
        console.log(nid)
        if(nid){
            NotificationSubscribers.insert({notification: nid, user: userid, status:1});
            Meteor.call('notificationPublish',nid,function(e,r){
                console.log(e);
                console.log(r)
            });
            CalendarEvents.update(cid,{$set: {notification: nid}})
        }
    },
    'RemoveSpecialEvent': function(eventId){
        var cevent = CalendarEvents.findOne(eventId);
        CalendarEvents.remove(eventId)
        //if(cevent.notification){
    //        var noti = Notifications.findOne({eventId: eventId});
    //        Notifications.remove(noti._id);
    //        if(noti){
    //            NotificationSubscribers.remove({notification: noti._id},{multi: true});
    //        }
    //    }

    },
    'UpdateSpecialEvent': function(data,eventid){
        var cid = CalendarEvents.update(eventid, {$set: data});
        var record = CalendarEvents.findOne(eventid);
        Meteor.call('notificationPublish',record.notification,function(e,r){
            console.log(e);
            console.log(r)
        });
    },
    'rsvpYes': function(user,noti){
        NotificationSubscribers.update({user: user, notification: noti},{$set:
            {   rsvp: true  }
        })
        console.log('yes')

        console.log(user+' '+noti)

        console.log(NotificationSubscribers.findOne({user: user, notification: noti}))
    },
    'rsvpNo': function(user,noti){
        NotificationSubscribers.update({user: user, notification: noti},{$set:
            {   rsvp: false  }
        })

        console.log('no')
        console.log(user+' '+noti)

        console.log(NotificationSubscribers.findOne({user: user, notification: noti}))

    },
    'rsvpUpdate': function(user,noti,field,value){
        var customData = {}
        customData[field] = value;
        console.log(user+' '+noti)
        console.log(customData)
        NotificationSubscribers.update({user: user, notification: noti},{$set:
            {   customData: customData  }
        })
    }
})
