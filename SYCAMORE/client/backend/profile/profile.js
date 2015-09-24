Template.manageProfile.helpers({
    'edit_status': function(){
        if(Roles.userIsInRole(Meteor.userId(),'educator')){
            return 'editable'
        }
        if(Roles.userIsInRole(Meteor.userId(),'superadmin')){
            return 'editable'
        }
        if(Roles.userIsInRole(Meteor.userId(),'parent')){
            var fam = myFam();
            console.log(fam)
            if(fam.indexOf(this.user._id)){
                return 'editable'
            }
        }
    },
    'current': function(){
        if(Roles.userIsInRole(Meteor.userId(), ['educator', 'superadmin'])){
            var current = Projects.find({educator: Meteor.userId(),status: 1},{sort: {created: -1}});
        }else{
            var current = Projects.find({status: 1},{sort: {created: -1}});
        }

        return current;
    },
    'isStudent': function(){
        if(Roles.userIsInRole(this.user._id,'student')){
            return true
        }
    },
    'studentPW': function(){
        if(Roles.userIsInRole(this.user._id,'student')){
            var decrypted = CryptoJS.AES.decrypt(this.user.profile.pass, 'random');
            return decrypted.toString(CryptoJS.enc.Utf8)
        }
    }
    /*'myFamAccess': function(){
        var fam = myFam();
        //console.log('<><><><><><><><><><><><><><><><>')
        //console.log(fam)
        if(fam.indexOf(user) > -1 || Roles.userIsInRole(Meteor.userId(),'educator') || Roles.userIsInRole(Meteor.userId(),'superadmin')){
            return true;
        }else{
            return false;
        }
    }*/
})

Template.parentProfileView.helpers({
    'myFamAccess': function(){
        var user = FamilyMembers.findOne({user: Meteor.userId()});
        var mem = FamilyMembers.find({family: user.family}).fetch();
        var members = new Array();

        _.each(mem,function(record){
            members.push(record.user)
        });
        //console.log(members)

        if(members.indexOf(this.user._id) > -1 || Roles.userIsInRole(Meteor.userId(),'educator') || Roles.userIsInRole(Meteor.userId(),'superadmin')){
            return true;
        }else{
            return false;
        }
    },
    'self': function(){
        if(Meteor.userId() === this.user._id){
            return true
        }
    },
    'current': function(){
        var current = Projects.find({status: 1},{sort: {created: -1}});
        return current;
    },
})

Template.studentProfileView.helpers({
    'myFamAccess': function(){
        var user = FamilyMembers.findOne({user: Meteor.userId()});
        var mem = FamilyMembers.find({family: user.family}).fetch();
        var members = new Array();

        _.each(mem,function(record){
            members.push(record.user)
        });
        //console.log(members)

        if(members.indexOf(this.user._id) > -1 || Roles.userIsInRole(Meteor.userId(),'educator') || Roles.userIsInRole(Meteor.userId(),'superadmin')){
            return true;
        }else{
            return false;
        }
    },
})


Template.nameBlock.helpers({
    "files": function(){
        return S3.collection.find({percent_uploaded: {$lt: 100}});
    },
    'dob': function(){
        if(this.user.profile.dob){
            return {
                age: moment.unix(this.user.profile.dob).fromNow(true),// 4 years
                day: moment.unix(this.user.profile.dob).format('MMMM DD'),
                d: moment.unix(this.user.profile.dob).format('DD'),
                m: moment.unix(this.user.profile.dob).format('MM'),
                y: moment.unix(this.user.profile.dob).format('YYYY'),
            }
        }
    },
    'familyMembers': function(){
        if(this.memberRecord){

            Meteor.subscribe('familyMembers',this.memberRecord.family)
            var users = FamilyMembers.find({family: this.memberRecord.family})
            var members = new Array();
            var mainuser = this.user._id
            _.each(users.fetch(),function(member){
                if(member.user != mainuser){
                    members.push(member.user)
                }
            });
            Meteor.subscribe('usersArray',members)
            return {
                parents: Meteor.users.find({_id: {$in: members}, roles: 'parent'}),
                students:  Meteor.users.find({_id: {$in: members}, roles: 'student'})
            }
        }
    }
})
Template.nameBlock.events({
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
                //console.log(r)
                Meteor.users.update(template.data.user._id,{$set: {'profile.photo': r}},function(e,r){
                    if(e){
                        console.log(e);
                        return false
                    }else{
                        return true
                    }
                })
            }
        });
    },
    'change .editDate': function(event,template){
        var m = $('#month').val();
        var d = $('#day').val();
        var y = $('#year').val();
        if(m > 0 && d > 0 && y > 0){
            var bday = moment(m+'-'+d+'-'+y, "MM-DD-YYYY").format('X')
            //console.log(bday)
            Meteor.users.update(template.data.user._id,{$set: {'profile.dob': bday}},
                function(err, success){
                    if(err){  console.log(err)}
                    if(success){    sAlert.info('Birthday Updated');
                }
            })
        }


    }
})

Template.manageProfile.events({
    'click .editProfile': function(event,template){
        $('.viewContent').hide();
        $('.editContent').show();
    },
    'click .viewProfile': function(event,template){
        $('.viewContent').show();
        $('.editContent').hide();
    },
    'click .removeUser': function(event,template){
        bootbox.confirm('Are you sure you want to remove this user? This is PERMANENT.', function(result){
            if(result){
                Meteor.call('deleteUser',template.data.user._id, function(err, success){
                    if(err){
                        console.error(err);
                    } else {
                        Router.go('home');
                    }    
                });
            }
        })
    },
    'click .keyHole': function(event,template){
        $('#resetpw').show();
    },
    'click .cancelnewpw': function(event,template){
        $('#resetpw').hide();
    },
    'click .savenewpw': function(event,template){
        var pw = $('#newpw').val();
        var confirm = $('#newconfirm').val();
        if(pw === confirm){
            if(pw != ' '){
                if(pw.length > 5){
                    var encrypted = CryptoJS.AES.encrypt(pw, 'random');
                    Meteor.call('updateStudentPW',template.data.user._id,pw,encrypted.toString(),function(e,r){
                        if(e){
                            console.log(e);
                            return false
                        }else{
                            $('#resetpw').hide();
                            $('#newpw').val('');
                            $('#newconfirm').val('');
                            return true
                        }
                    });
                }else{
                    bootbox.alert('Password must be at least 6 characters')
                }
            }else{
                bootbox.alert('Password cannot be blank')
            }

        }else{
            bootbox.alert('Passwords do not match')
        }
    },
    'change .editMe': function(event,template){

        var item = event.currentTarget.id;
        var name = $('#'+item).attr('name');
        var value = $('#'+item).val();
        var update = {}
        update['profile.'+item] = value;
        console.log(update)
        console.log(template.data.user)
        Meteor.users.update(template.data.user._id,{$set: update},
            function(err, success){
                if(err){  console.log(err)}
                if(success){    sAlert.info(name+' Updated');
            }
        })
    },

});

Template.manageProfile.rendered = function(){
    //$.fn.editable.defaults.mode = 'inline';

    if(!this.rendered){
        matchHeight();
    };

    var USER = this.data.user;
    if(Roles.userIsInRole(Meteor.userId(),'educator')){
        var disableState = false;
    }else if(Roles.userIsInRole(Meteor.userId(),'educator')){
        var disableState = false;
    }else {
        var disableState = true;
    }
    $('#firstname.editable').editable({
        title: 'First Name',
        emptytext: 'First Name',
        disabled: disableState,
        value: USER.profile.firstname,
        success: function(response, newValue) {
            Meteor.users.update(USER._id,{$set: {'profile.firstname': newValue}},function(){
                sAlert.info('Profile Updated');
            })
        }
    });
    $('#lastname.editable').editable({
        title: 'Last Name',
        emptytext: 'Last Name',
        disabled: disableState,
        value: USER.profile.lastname,
        success: function(response, newValue) {
            Meteor.users.update(USER._id,{$set: {'profile.lastname': newValue}},function(){
                sAlert.info('Profile Updated');
            })
        }
    });

    $('#dob.editable').editable({
        format: 'DD/MM/YYYY',
        viewformat: 'MMMM DD',
        title: 'Birthday',
        disabled: disableState,
        value: moment.unix(USER.profile.dob).format('DD/MM/YYYY'),
        emptytext: moment().format('MMMM DD'),
        template: 'MMM / DD / YYYY',
        combodate: {
            minYear: 1950,
            maxYear: 2015,
            minuteStep: 1
        },
        success: function(response, newValue) {
            var dob = moment(newValue).format('X')
            Meteor.users.update(USER._id,{$set: {'profile.dob': dob}},function(){
                sAlert.info('Profile Updated');
            })
        }
    });
}
