Template.phoneEditHolder.helpers({
    'newNumber': function(){
        //return Phoneformat.formatE164('US', this.number);
        return Phoneformat.formatLocal('US',this.number);
    },
    'typeField': function(){
        var opts;
        opts += '<select class="phoneType"><option>select a type</option>';
        opts += '<option';
        if(this.type==='home'){    opts+=    ' selected '}
        opts+= '>home</option>'
        opts += '<option';
        if(this.type==='mobile'){    opts+=    ' selected '}
        opts+= '>mobile</option>'
        opts += '<option';
        if(this.type==='work'){    opts+=    ' selected '}
        opts+= '>work</option>'

        opts += '</select>';
        return opts
    }
})
Template.phoneEditHolder.events({
    'change .phoneType': function(event,template){
        var phone = template.data.number;
        Meteor.call('updatePhoneType',Meteor.userId(),phone,$(event.target).val())
    },
    'click .removePhone': function(event,template){
        var phone = template.data.number;
        Meteor.users.update(Meteor.userId(),{$pull: { 'profile.phones': { number: phone  }}})
    },
})
Template.signupStep2.helpers({
    'parents': function(){
        var users = TempUsers.find({mainAccount: Meteor.userId(), role: 'parent'})
        return {
            users: users,
            count: users.count()
        }
    },
    'students': function(){
        var users = TempUsers.find({mainAccount: Meteor.userId(), role: 'student'})
        return {
            users: users,
            count: users.count()
        }
    }
})
Template.signupStep2.events({
    'click .addParent': function(event,template){
        TempUsers.insert({
            role: 'parent',
            mainAccount: Meteor.userId()
        })
    },
    'click .addStudent': function(event,template){
        TempUsers.insert({
            role: 'student',
            mainAccount: Meteor.userId()
        })
    },
    'click .removeMe': function(event,template){
        TempUsers.remove($(event.target).attr('id'));
    },
    'click .addPhone': function(event,template){
        bootbox.prompt("New Phone Number", function(result) {
            if (result === null) {

            } else {
                Meteor.users.update(Meteor.userId(),{$addToSet: { 'profile.phones': { number: result  }}})
            }
        });
    },
    'click .addEmail': function(event,template){
        bootbox.prompt("New Email", function(result) {
            if (result === null) {

            } else {
                Meteor.users.update(Meteor.userId(),{$addToSet: { 'emails': {    address: result, verified: false  }}})
            }
        });
    },
    'click .removeEmail': function(event,template){
        var address = $(event.target).attr('id')
        Meteor.users.update(Meteor.userId(),{$pull: { 'emails': { address: address  }}})
    },
    'change .editMe':function(event,template){
        var field = $(event.target).attr('id')
        var data = {}
        data['profile.'+field] = $(event.target).val();
        //console.log(data)
        //Meteor.users.update(Meteor.userId(),{$set: data },function(e,r){
            //sAlert.info('Profile Updated');
        //})
        Meteor.call('userProfileUpdate',Meteor.userId(),data)
        //Meteor.users.update(Meteor.userId(),{$set: data })
    },
    'change .mainphoto': function(event,template){
        var files = $("#mainphoto")[0].files;
        S3.upload({
            files:files,
            path:"profiles"
        },function(e,r){
            if(e){
                console.log(e)
            }
            if(r){
                console.log(r)
                Meteor.users.update(Meteor.userId(),{$set: {'profile.photo': r}},function(e,r){
                    if(e){
                        console.log(e);
                        return false
                    }else{
                        //sAlert.info('Profile Updated');
                    }
                })
            }
        });
    },
    'click .addMyFam': function(event,template){
        $('#signupAlert').empty();
        var user = Meteor.user();
        var profile = user.profile;
        if(profile.firstname && profile.lastname && profile.phone){
            Router.go('signupStep3');
        }else{
            $('#signupAlert').append('<div class="alert alert-danger text-center"><h4 class="syc-title">First Name, Last Name, & Phone Number are all required.</h4></div>');

        }
    },
})
