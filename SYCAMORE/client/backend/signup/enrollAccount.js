Template.enrollAccount.events({
    'click .pwset': function(event,template){
        var pw = $('#password').val();
        var pw_confirm = $('#password_confirm').val();

        if(pw === pw_confirm){
            Accounts.resetPassword(template.data.token, pw, function(){
                Router.go('/dashboard')
            })
        }else{
            bootbox.alert('Passwords do not match.')
        }
    },
})
