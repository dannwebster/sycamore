Template.accountSubMenu.helpers({
  'user': function(){
    var user = Meteor.user();
    return user.emails[0].address;
  }
});