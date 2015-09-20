Meteor.methods({
  'sendVerificationEmail': function(user){
    Accounts.sendVerificationEmail(user);
  }
})

Meteor.publish('userData', function() {
  if(!this.userId) return null;
  return Meteor.users.find(this.userId, {fields: {'services.email.verificationTokens.address': 1}});
});