Template.eventNotification.helpers({
    googleEmbeddedMap: function(query){
        return GOOGLE_EMBEDDED_MAPS_URI + Utilities.encodeURIParameters({
            q: query,
            key: Meteor.settings.public.google.api_key
        });
    },
    'startDate': function(){
        return moment.unix(this.start).format('MMM DD, YYYY h:mm A')
    },
    'endDate': function(){
        return moment.unix(this.end).format('MMM DD, YYYY h:mm A')
    },
    'rsvpData': function(){
        var data = {}
        if(this.rsvp == 'none'){
            data.rsvp = false
        }
        if(this.rsvp == 'required'){
            data.rsvp = true;
            data.required = true;
        }
        if(this.rsvp == 'optional'){
            data.rsvp = true;
        }
        if(this.guests == 'all'){
            data.fam = true;
            if(Roles.userIsInRole(Meteor.userId(),'parent')){
                data.family = myFam();
            }else{
                data.family = [Meteor.userId()]
            }
        }
        if(this.guests == 'students'){
            data.students = true;
        }
        if(this.guests == 'parents'){
            data.parents = true;
        }
        return data
    }
})

Template.eventNotification.events({

})

Template.eventNotification.rendered = function(){
    Meteor.subscribe('usersMyFam',Meteor.userId())
}

Template.rsvpAction.helpers({
    'member': function(){
        Meteor.subscribe('userFamily',Meteor.userId())
        return Meteor.users.findOne(this.user)
    },
    'attending': function(){
        var noti = NotificationSubscribers.findOne({user: this.user, notification: this.notification})
        //console.log(noti)
        return noti.rsvp
    }
})
Template.rsvpAction.events({
    'click .rsvpYes': function(event,template){
        Meteor.call('rsvpYes',template.data.user, template.data.notification)
    },
    'click .rsvpNo': function(event,template){
        Meteor.call('rsvpNo',template.data.user, template.data.notification)
    },
})
Template.rsvpAction.rendered = function(event,template){
    Meteor.subscribe('singleNotiSub',this.data.user,this.data.notification);
}


Template.fieldItem.events({
    'change .eventFormField': function(event,template){
        Meteor.call('rsvpUpdate',Template.parentData(1).user, Template.parentData(1).notification, $(event.target).attr('name'), $(event.target).val() )
    },
})

Template.fieldItem.helpers({
    'method': function(){
        var data = {}
        if(this.mode == 'text'){
            data.text = true
        }
        if(this.mode == 'textarea'){
            data.textarea = true
        }
        if(this.mode == 'select'){
            data.select = true
        }
        if(this.mode == 'radio'){
            data.radio = true
        }
        if(this.mode == 'checkbox'){
            data.checkbox = true
        }
        return data;
    },
    'values': function(){
        var sub = Notification.subscribers.findOne({user: Template.parentData(1).user, notification: Template.parentData(1).notification});
        return sub
    }
})
