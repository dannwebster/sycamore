Template.notifications.helpers({
    notifications: function(){
        Meteor.subscribe('notifications',Meteor.userId())
        return Notifications.find({},{sort: {created: -1, sendDate: -1}})
    },
    'note': function(){
        if(Session.get('note')){
            return Notifications.findOne(Session.get('note'))
        }else{
            return Notifications.findOne({},{sort: {created: -1, sendDate: -1}})
        }
    },

})

Template.notifications.events({
    'click .ns-link': function(event,template){
        Session.set('note',$(event.target).parent('.notificationItem').attr('id'));
        //Session.set('note',$(event.target).attr('id'))
    },
})

Template.noteDisplay.helpers({
    'eventData': function(){
        if(this.calendarEvent){
            Meteor.subscribe('calendarEvent',this.eventId)
            return CalendarEvents.findOne(this.eventId);
        }
    },
    'time': function(){
        return moment.unix(this.sendDate).format('MM/D/YY, h:mm A')
    },
    'starred': function(){
        var sub = NotificationSubscribers.findOne({user: Meteor.userId(), notification: this._id});
        if(sub.starred){
            return true;
        }else{
            return false
        }
    },
    'user_archived': function(){
        var sub = NotificationSubscribers.findOne({user: Meteor.userId(), notification: this._id});
        if(!sub.archived){
            return false;
        }else{
            return true
        }
    },
    'urgent': function(){
        if(this.alert=='danger'){
            return true;
        }
    },
})

Template.noteDisplay.events({
    'click .starItem': function(event,template){
        Meteor.call('notificationStar',Meteor.userId(),template.data._id)
    },
    'click .unStarItem': function(event,template){
        Meteor.call('notificationUnStar',Meteor.userId(),template.data._id)
    },
    'click .archiveItem': function(event,template){
        Meteor.call('notificationUserArchive',Meteor.userId(),template.data._id,function(){
            //Meteor.subscribe('notifications',Meteor.userId())
        })
    },
    'click .unarchiveItem': function(event,template){
        Meteor.call('notificationUserUnarchive',Meteor.userId(),template.data._id)
    },
    'click .noti-print': function(event,template){
        window.open('/print/notification/'+template.data._id,'_blank');
    },
    'click .addChat': function(event,template){
        //$('.chatHolder').scrollTop($('.chatHolder > div').innerHeight());
        $('.chatHolder').animate({ scrollTop: $('.chatHolder > div').innerHeight()   });
    },
    'click .newMessageIndicator': function(event,template){
        //$('.chatHolder').scrollTop($('.chatHolder > div').innerHeight());
        $('.chatHolder').animate({ scrollTop: $('.chatHolder > div').innerHeight()   });
        $('.newMessageIndicator').fadeOut();
    },
});

Template.noteDisplay.rendered = function(template){
    $('.chatHolder').height($(window).height()-600)
    $('.noteHolder').height($('.ME_conversation_holder').height())
    //Meteor.call('markNotificationRead',Meteor.userId(),this.data._id)
    Meteor.setTimeout(function(){
        Meteor.call('markNotificationRead',Meteor.userId(),event.currentTarget.id)
    }, 3000);
    setTimeout(function () {
        scrollMe('.chatHolder')
    }, 500);

    $('.chatHolder').scrollTop($('.chatHolder > div').innerHeight());
    Session.set('SC_position', $('.chatHolder').scrollTop());
    Session.set('SC_last_height', $('.chatHolder > div').innerHeight())

    //THEN once every 3 seconds
    scrollMe3('.chatHolder');
    // Meteor.setInterval(function(){scrollMe3('.chatHolder');}, 3000);

}

Template.notificationView.helpers({
    notifications: function(){
        return Notifications.find({},{sort: {created: -1, sendDate: -1}})
    }
})
