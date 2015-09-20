Template.signup.helpers({
  create_new_admin: function(){
    if(Counts.get('userCounts')>0){
      return false
    }else{
      return true
    }
  }
})

Template.signup.events({
  'click #createUser': function(event,template){
    var email = $('#email').val();
    var password = $('#password').val();
    Meteor.call('createFirstAccount',email,password)
  }
})

Template.signup.rendered = function(){
  $('#emailform').bootstrapValidator({
    framework: 'bootstrap',
    icon: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      email: {
        validators: {
          emailAddress: {
            message: 'The value is not a valid email address'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: 'A password is required'
          },
          stringLength: {
            message: 'Password must be at least 6 characters long',
            min: 6
          }
        }
      }
    }
  });
}