Template.MEchathub_chats.helpers({
    'chats': function(){
        Meteor.subscribe('ME_ChatHub_Chats',Session.get('convo'))
        return MEchathub_chats.find()
    }
});

Template.MEchathub_chat.helpers({
    'time': function(){
        return moment.unix(this.timestamp).fromNow()
    },
    'profile': function(){
        var user = Meteor.users.findOne(this.user)
        return user.profile;
    }
})
