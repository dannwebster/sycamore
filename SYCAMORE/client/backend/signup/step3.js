Template.signupStep3.helpers({
    'parents': function(){
        var users = TempUsers.find({mainAccount: Meteor.userId(), role: 'parent'},{sort: {'profile.count': 1}})
        return {
            users: users,
            count: users.count()
        }
    },
    'students': function(){
        var users = TempUsers.find({mainAccount: Meteor.userId(), role: 'student'},{sort: {'profile.count': 1}})
        if(users.count()<1){
            var mainUser = Meteor.users.findOne(Meteor.userId())
            TempUsers.insert({
                role: 'student',
                student: true,
                profile: {
                    count: 1,
                    address: mainUser.profile.address,
                    emergency_contact: mainUser.profile.emergency_contact
                },
                mainAccount: Meteor.userId()
            })
        }
        return {
            users: users,
            count: users.count()
        }
    }
})
Template.signupStep3.events({
    'click .addParent': function(event,template){
        var users = TempUsers.find({mainAccount: Meteor.userId(), role: 'parent'}).count();
        var mainUser = Meteor.users.findOne(Meteor.userId())
        TempUsers.insert({
            role: 'parent',
            parent: true,
            profile: {
                count: users+1,
                address: mainUser.profile.address
            },
            mainAccount: Meteor.userId()
        })
    },
    'click .addStudent': function(event,template){
        var users = TempUsers.find({mainAccount: Meteor.userId(), role: 'student'}).count();
        var mainUser = Meteor.users.findOne(Meteor.userId())
        TempUsers.insert({
            role: 'student',
            student: true,
            profile: {
                count: users+1,
                address: mainUser.profile.address,
                emergency_contact: mainUser.profile.emergency_contact
            },
            mainAccount: Meteor.userId()
        })
    },
    'click .removeMe': function(event,template){
        bootbox.confirm("Are you sure you want to remove this user?", function(result) {
            if(result){
                TempUsers.remove(event.currentTarget.id);
            }
        });
    },
    'click .finalSetupStep': function(event,template){
        $('#signupAlert').empty();
        var parents = TempUsers.find({mainAccount: Meteor.userId(), role: 'parent'})
        var students = TempUsers.find({mainAccount: Meteor.userId(), role: 'student'})
        var mainUser = Meteor.users.findOne(Meteor.userId())
        var error = 0;
        _.each(parents.fetch(), function(parent){
            if(parent.emails.length < 1){
                $('#signupAlert').append('<div class="alert alert-danger text-center"><h4 class="syc-title">You must provide an email for each PARENT / GUARDIAN.</h4></div>');
                error += 1;
            }
        })
        _.each(students.fetch(), function(student){
            if(!student.profile.username){
                $('#signupAlert').append('<div class="alert alert-danger text-center"><h4 class="syc-title">You must provide a username for each STUDENT.</h4></div>');
                error += 1;
            }
            if(!student.profile.password){
                $('#signupAlert').append('<div class="alert alert-danger text-center"><h4 class="syc-title">You must provide a password for each STUDENT.</h4></div>');
                error += 1;
            }
        })
        if(error <= 0){
            Meteor.call('addFamily',Meteor.userId(),function(){
                Router.go('signupComplete')
            })
        }
    },
})

Template.familyBox.helpers({
})

Template.familyBox.events({
    'change .editMe':function(event,template){
        var field = $(event.target).attr('id')
        var data = {}
        data['profile.'+field] = $(event.target).val();
        console.log(data)
        if(field == 'email'){
            var exists = Meteor.users.find({emails: { $elemMatch: { address: $(event.target).val() } } } ).count();
            if(exists){
                bootbox.alert('That email already exists as a user. Please use an alternate email.')
                $(event.target).val('').focus();
            }else{
                var emails = new Array();
                var address = {
                    address: $(event.target).val(),
                    verified: false
                }
                emails.push(address)
                var data = {
                    emails: emails
                }
                TempUsers.update(template.data.user._id,{$set: data },function(e,r){
                    //sAlert.info('Profile Updated');
                })
            }
        }else if(field =='username'){
            var exists = Meteor.users.find({username: $(event.target).val() }).count();
            //var data
            if(exists){
                bootbox.alert('A user with that username already exists. Please select another username.')
                $(event.target).val('').focus();
            }else{
                data['profile.'+field] = $(event.target).val().replace(/ /g,'');
                TempUsers.update(template.data.user._id,{$set: data },function(e,r){
                    //sAlert.info('Profile Updated');
                })
            }
        }else{
            TempUsers.update(template.data.user._id,{$set: data },function(e,r){
                //sAlert.info('Profile Updated');
            })
        }

    },
    'change .mainphoto': function(event,template){
        var files = $("#pic_"+template.data.user._id)[0].files;
        S3.upload({
            files:files,
            path:"profiles"
        },function(e,r){
            if(e){
                console.log(e)
            }
            if(r){
                console.log(r)
                TempUsers.update(template.data.user._id,{$set: {'profile.photo': r}},function(e,r){
                    if(e){
                        console.log(e);
                        return false
                    }else{
                        sAlert.info('Profile Updated');
                    }
                })
            }
        });
    },
    'click .addPhone': function(event,template){
        bootbox.prompt("New Phone Number", function(result) {
            if (result === null) {

            } else {
                TempUsers.update(template.data.user._id,{$addToSet: { 'profile.phones': { number: result  }}})
            }
        });
    },
    'click .addEmail': function(event,template){
        bootbox.prompt("New Email", function(result) {
            if (result === null) {

            } else {
                TempUsers.update(template.data.user._id,{$addToSet: { 'emails': {    address: result, verified: false  }}})
            }
        });
    },
    'click .removeEmail': function(event,template){
        var address = $(event.target).attr('id')
        TempUsers.update(template.data.user._id,{$pull: { 'emails': { address: address  }}})
    },
})
Template.tempPhoneEditHolder.events({
    'change .phoneType': function(event,template){
        var phone = template.data.number;
        Meteor.call('tempUpdatePhoneType',template.data.user._id,phone,$(event.target).val())
    },
    'click .removePhone': function(event,template){
        var phone = template.data.number;
        TempUsers.update(template.data.user._id,{$pull: { 'profile.phones': { number: phone  }}})
    },
})
