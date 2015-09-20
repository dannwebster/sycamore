Template.ConversationList.rendered = function(){
    Meteor.subscribe('Conversations',Meteor.userId());
    Meteor.subscribe('Usernames');
}
Template.ConversationList.helpers({
    'conversation': function(){
        return Conversations.find({users: Meteor.userId()},{sort: { last_post: -1}});
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
Template.Conversation.helpers({
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
        Meteor.subscribe('LastChat',this.last_post_id);
        return Chats.findOne(this.last_post_id)
    },
    'unreadCount': function(){
        Meteor.subscribe('MyConversations',Meteor.userId());
        var doc = MyConversations.findOne({conversation: this._id})
        if(doc.unreadCount > 0){
            return {
                unreadCount: doc.unreadCount,
                style: 'background-color:#d0e6e0'
            }
        }

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
