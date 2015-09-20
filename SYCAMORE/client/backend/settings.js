checkPW = function(pw){
    if(pw.length < 6) {
        Session.set('pwerror',"Error: Password must contain at least six characters!");
        return false;
    }
    re = /[0-9]/;
    if(!re.test(pw)) {
        Session.set('pwerror',"Error: password must contain at least one number (0-9)!");
        return false;
    }
    re = /[a-z]/;
    if(!re.test(pw)) {
        Session.set('pwerror',"Error: password must contain at least one lowercase letter (a-z)!");
        return false;
    }
    return true;
}
Template.settings.events({
    'click .notify_on': function(event,template){
        var setting = 'profile.notifications.'+event.currentTarget.id;
		var jsonObj = {};
		jsonObj[setting] = true;
        Meteor.users.update(Meteor.userId(),{$set: jsonObj});
    },
    'click .notify_off': function(event,template){
        var setting = 'profile.notifications.'+event.currentTarget.id;
		var jsonObj = {};
		jsonObj[setting] = false;
        Meteor.users.update(Meteor.userId(),{$set: jsonObj});
    },
    'click #changepw': function(event,template){
        var pw = $('#password').val();

        var pwconfirm = $('#password_confirm').val();
        if(pw===pwconfirm){
            if(checkPW(pw)){
                Accounts.changePassword($('#curpassword').val(), pw,function(error,success){
                    if(error){
                        bootbox.alert(error.message)
                    }else{
                        sAlert.info('Password Updated');
                    }
                })
            }else{

                    bootbox.alert(Session.get('pwerror'))
            }
        }else{
            bootbox.alert("Those passwords don't match");
        }

        //Meteor.users.update(id,{$set: data});
    },
})
