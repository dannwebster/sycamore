//USER ACCOUNT METHODS
Meteor.methods({
    'updatePhoneType':function(user,phone,type){
        Meteor.users.update(
            {_id: user, 'profile.phones.number': phone},
            {$set: {'profile.phones.$.type': type}}
        );
    },
    'updateStudentPW': function(user,pw,pwencrypt){
        console.log(user); console.log(pw); console.log(pwencrypt)
        Accounts.setPassword(user, pw)
        Meteor.users.update({_id: user},{$set: {'profile.pass': pwencrypt}})
    },
    'userProfileUpdate': function(user,data){
        Meteor.users.update(user,{$set: data })
    },
    'tempUpdatePhoneType':function(user,phone,type){
        TempUsers.update(
            {_id: user, 'profile.phones.number': phone},
            {$set: {'profile.phones.$.type': type}}
        );
    },
    'addFamily': function(mainUser){
        ///THIS SETS UP A FAMILY, ADDS USERS, FROM USER SETUP///
        var parents = TempUsers.find({mainAccount: Meteor.userId(), role: 'parent'})
        var students = TempUsers.find({mainAccount: Meteor.userId(), role: 'student'})
        var mainUser = Meteor.users.findOne(Meteor.userId())

        //CREATE THE FAMILY
        var family = Families.insert({name: mainUser.profile.lastname+' Family'});
        //ADD THE MAIN USER
        FamilyMembers.upsert({user: mainUser._id},{$set: {family: family }})

        //ADD PARENTS AND INVITE THEM
        _.each(parents.fetch(), function(parent){
            console.log(parent)
            var data = {
                email: parent.emails[0].address,
                profile: parent.profile
            }
            data.profile.emergency_contact = mainUser.profile.emergency_contact;
            console.log(data)
            var newParent = Accounts.createUser(data)
            console.log(newParent)
            Roles.addUsersToRoles(newParent,'parent');

            FamilyMembers.upsert({user: newParent},{$set: {family: family }})
            Accounts.sendEnrollmentEmail(newParent);

            /*var options = {
                from: InviteMe.config.from,
                to: data.email,
                subject: 'Welcome to '+content.organization,
                html: text,
                headers: "Content-Type: text/html; charset=ISO-8859-1\r\n"
            }
            this.unblock()
            Email.send(options)*/

        })

        //CREATE STUDENTS
        _.each(students.fetch(), function(student){
            if(student.profile.emergency_contact){
                var emergency_contact = student.profile.emergency_contact;
            }else{
                var emergency_contact = mainUser.profile.emergency_contact;
            }

            var encrypted = CryptoJS.AES.encrypt(student.profile.password, 'random');

            var data = {
                username: student.profile.username,
                password: student.profile.password,
                profile: {
                    address: student.profile.address,
                    allergy_medical: student.profile.allergy_medical,
                    emergency_contact: emergency_contact,
                    firstname: student.profile.firstname,
                    lastname: student.profile.lastname,
                    photo: student.profile.photo,
                    pass: encrypted.toString()
                }
            }

            var newStudent = Accounts.createUser(data)

            Roles.addUsersToRoles(newStudent,'student');
            FamilyMembers.upsert({user: newStudent},{$set: {family: family }})
        })

    },
    createNewUser: function(user,password,usertype){
        check(user, String);
        check(password, String);
        check(usertype, Match.OneOf('superadmin', 'educator', 'student'));

        // only superadmins can create new users -- this code needs a total revamp though, this is just a sad patch
        var loggedInUser = Meteor.user();

        if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['superadmin'])) {
            throw new Meteor.Error(403, "Access denied");
        }

        //IS IT AN EMAIL?
        var re = /\S+@\S+\.\S+/;
        if(re.test(user)){
            console.log('EMAIL')
            var data = {
                email: user,
                password: password
            }
        }else{
            console.log('USERNAME')

            var data = {
                username: user,
                password: password
            }
            if(usertype==='student'){
                var encrypted = CryptoJS.AES.encrypt(password, 'random');

                data.profile = {
                    pass: encrypted.toString()
                }
            }
        }
        console.log(data)
        var id = Accounts.createUser(data);
        console.log(id)
        console.log(usertype)
        Meteor.users.update(id,{$set: {'profile.enabled': true}})
        Roles.addUsersToRoles(id, [usertype])
    }
})
