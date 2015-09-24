Meteor.methods({
    updateRSVP: function(eventId, val){
        var options = {};
        options['rsvp_list.' + this.userId] = val;
        return CalendarEvents.update({_id: eventId}, {$set: options});
    },

    // holy shit this is such a mess
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
    },
});
