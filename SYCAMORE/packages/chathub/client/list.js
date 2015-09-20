Template.MEchathub_list.rendered = function(){
    Meteor.subscribe('ME_ChatHub_Conversations',Meteor.userId());
    Meteor.subscribe('ME_usernames');
}
Template.MEchathub_list.helpers({
    'conversation': function(){
        return MEchathub_conversations.find({users: Meteor.userId()},{sort: { timestamp: -1}});
    }
})
Template.recipientView.helpers({
    'itsMe': function(event,template){
        if(Meteor.userId() === this._id){
            return true
        }else{
            return false
        }
    },
})

Template.MEchathub_conversations.helpers({
    'recipients': function(){
        var data = {}
        data.users = Meteor.users.find({_id: {$in: this.users}})
        if(data.users.count()>2){data.group = true;}
        if(data.users.count()>3){data.large = true;}
        if(data.group){
            data.groupUsers = Meteor.users.find({_id: {$ne: Meteor.userId(), $in: this.users}},{limit: 2})
        }
        //console.log(data)
        return data;
    },
    'counts': function(){
        var users = Meteor.users.find({_id: {$in: this.users}})
        return users;
    },
    'recipient_emails': function(){
        var users = Meteor.users.find({'_id': {$in: this.users}})
        return users
    },
    'text': function(){
        Meteor.subscribe('ME_ChatHub_LastChat',this._id);
        return MEchathub_chats.findOne({conversation: this._id},{sort: {createdAt: -1}})
    },
    'time': function(){
        var now = moment();
        //if the time was less than 45 minutes ago
        if(moment.unix(this.last_post).add(45,'minutes') > now){
            return moment.unix(this.last_post).format('h:mm A')
        }else if(moment.unix(this.last_post).add(45,'minutes') <= now && moment.unix(this.last_post) > moment().startOf('day')){
            return moment.unix(this.last_post).format('h:mm A')
        }else if(moment.unix(this.last_post) < moment().startOf('day')){
            return moment.unix(this.last_post).format('MM/D/YY, h:mm A')
        }

    }
})
