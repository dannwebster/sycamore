Template.notificationListItem.helpers({
    'starred': function(){
        var sub = NotificationSubscribers.findOne({user: Meteor.userId(), notification: this._id});
        if(sub.starred){
            return true;
        }else{
            return false
        }
    },
    'archived': function(){
        var sub = NotificationSubscribers.findOne({user: Meteor.userId(), notification: this._id});
        if(sub.archived){
            return true;
        }else{
            return false
        }
    },
    'read': function(){
        var sub = NotificationSubscribers.findOne({user: Meteor.userId(), notification: this._id});
        if(sub.read){
            return true;
        }else{
            return false
        }
    },
    'time': function(){
        return moment.unix(this.sendDate).format('MM/D/YY, h:mm A')
    },
    'urgent': function(){
        if(this.alert=='danger'){
            return true;
        }
    },
    'link': function(){
        var data = Template.parentData(1)
        var data2 = Template.parentData(2)
        if(data.type){
            return '/notifications/view/'+data.type+'/'+this._id;
        }else if(data2.type){
            return '/notifications/view/'+data2.type+'/'+this._id;
        }else{
            return '/notifications/'+this._id;
        }
    }
})
Template.homeNotificationListItem.helpers({
    'time': function(){
        return moment.unix(this.sendDate).format('MM/D/YY, h:mm A')
    },
    'link': function(){
        return '/notifications/'+this._id;
    },
    'urgent': function(){
        if(this.alert=='danger'){
            return true;
        }
    },
    'read': function(){
        var sub = NotificationSubscribers.findOne({user: Meteor.userId(), notification: this._id});
        if(sub.read){
            return true;
        }else{
            return false
        }
    },
})

Template.notificationListItem.events({
    'click .starItem': function(event,template){
        Meteor.call('notificationStar',Meteor.userId(),template.data._id)
    },
    'click .unStarItem': function(event,template){
        Meteor.call('notificationUnStar',Meteor.userId(),template.data._id)
    },
    'click .ns-link': function(event,template){
        var data = Template.parentData(1)
        var data2 = Template.parentData(2)

        Meteor.call('markNotificationRead',Meteor.userId(),event.currentTarget.id);
        if(data.type){
            Router.go('/notifications/view/'+data.type+'/'+event.currentTarget.id)
        }else if(data2.type){
            Router.go('/notifications/view/'+data2.type+'/'+event.currentTarget.id)
        }else{
            Router.go('/notifications/'+event.currentTarget.id)
        }

    }
})
