Template.userList.helpers({
    'users': function(){
        return Meteor.users.find({roles: 'student'});
    }
});
Template.userList.events({

});
