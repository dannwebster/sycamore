userLogin = function(user,password,stay){
    if($('#loginform').data('bootstrapValidator').isValid()){
        Meteor.loginWithPassword(user, password, function(error){
            if(error){
                $('#loginError').html(error.reason+'. Please try again.').fadeIn();
            }else{
                if(stay){

                }else{
                    //window.open('/','_blank');
                    Router.go('/dashboard')
                }
            }
        });
    }
}
Template.formLogin.events({
    'click #loginUser': function(event,template){
        $('#loginError').hide()
        $('#loginform').data('bootstrapValidator').validate();
        if(template.data){
            if(template.data.stay){
                userLogin($('#username').val().toLowerCase(),$('#password').val(),true);
            }else{
                userLogin($('#username').val().toLowerCase(),$('#password').val(),false);
            }
        }else{
            userLogin($('#username').val().toLowerCase(),$('#password').val(),false);
        }
    },
    'keypress input': function(event,template) {
        if (event.charCode == 13) {
            $('#loginError').hide()
            $('#loginform').data('bootstrapValidator').validate()
            if(template.data){
                if(template.data.stay){
                    userLogin($('#username').val().toLowerCase(),$('#password').val(),true);
                }else{
                    userLogin($('#username').val().toLowerCase(),$('#password').val(),false);
                }
            }else{
                userLogin($('#username').val().toLowerCase(),$('#password').val(),false);
            }
            return false;
        }
    },
})

Template.formLogin.rendered = function(){
    $('#loginform').bootstrapValidator({
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
            }
        }
    });
}
