Template.formAddUser.events({
  'click #createUser': function(event,template){
    $('#createUserError').hide()
    $('#newuserform').data('bootstrapValidator').validate()
    
    var user = $('#username').val();
    var password = $('#password').val();
    var usertype = $('#usertype').val();
    
    if($('#newuserform').data('bootstrapValidator').isValid()){
      Meteor.call('createNewUser', user, password, usertype, function(error){
        if(error){
          $('#createUserError').html(error.reason+'. Please try again.').fadeIn();
        }
      });
    }
  }
})


Template.formAddUser.rendered = function(){
  $('#newuserform').bootstrapValidator({
    framework: 'bootstrap',
    icon: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: 'Email or Username is required'
          },
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
      },
      usertype: {
        validators: {
          notEmpty: {
            message: 'You must select a user type'
          }
        }
      }
    }
  });
}