//USERS
Meteor.publish('userCounter', function() {
    Counts.publish(this, 'userCounts', Meteor.users.find());
});

Meteor.publish('schoolRoster', function() {
    return Meteor.users.find();
});

Meteor.publish('tempUsers',function(user){
    return TempUsers.find({mainAccount: user});
})

Meteor.publish('userAccount', function(id) {
    return Meteor.users.find(id);
});

Meteor.publish('userList', function(id) {
    return Meteor.users.find({_id: id},{fields: {
        _id: 1, profile:1, username: 1, emails: 1, roles: 1
    }});
});

Meteor.publish('studentList', function() {
    return Meteor.users.find({roles: 'student'},{sort: {'profile.firstname': 1, 'profile.lastname': 1},fields: {
        _id: 1, profile:1, roles: 1
    }});
});

Meteor.publish('parentList', function() {
    return Meteor.users.find({roles: 'parent'},{sort: {'profile.firstname': 1, 'profile.lastname': 1},fields: {
        _id: 1, profile:1, roles: 1
    }});
});

Meteor.publish('familyList', function() {
    return Meteor.users.find({});
});

Meteor.publish('userFamily', function(user) {
    var record = FamilyMembers.findOne({user: user});
    //console.log(record)
    if(record){
        var fam = Families.find(record.family)
        //console.log(fam.fetch())
        return fam
    }else{
        return Families.find('000');
    }

});


Meteor.publish('usersArray', function(users) {
    //console.log(users)
    return Meteor.users.find({_id: {$in: users}})
});

Meteor.publish('usersMyFam', function(userid) {
    var user = FamilyMembers.findOne({user: userid});
    //console.log(user)
    if(user){
        var mem = FamilyMembers.find({family: user.family}).fetch();
        //console.log(mem)
        if(mem){
            var members = new Array();

            _.each(mem,function(record){
                members.push(record.user)
            });
            console.log(members)
            return Meteor.users.find({_id: {$in: members}})
        }else{
            return null
        }
    }else{
        return null
    }
});

Meteor.publish('familyByUser', function(user) {
    return FamilyMembers.find({user: user})
});

Meteor.publish('familyMembers', function(fid) {
    return FamilyMembers.find({family: fid})
});

Meteor.publish('userFamilyMembers', function(user) {
    var record = FamilyMembers.findOne({user: user});
    if(record){
        var fam = FamilyMembers.find({family: record.family})
        return fam
    }else{
        return FamilyMembers.find({family: '000'})
    }

});

Meteor.publish('userFamilyStudents', function(user) {
    var record = FamilyMembers.findOne({user: user});
    if(record){
        var fam = FamilyMembers.find({family: record.family});
        var members = new Array();
        _.each(fam.fetch(),function(record){
            members.push(record.user)
        });
        return Meteor.users.find({_id: {$in: members}},{fields: {
            _id: 1, profile:1, roles: 1
        }});
    }else{
        return FamilyMembers.find({family: '000'})
    }

});

Meteor.publish('projectUsersArray', function(pid) {
    var users = ProjectUsers.find({project: pid});
    var userList = new Array();
    _.each(users.fetch(),function(project){
        userList.push(project.user)
    });
    var prod = Projects.findOne(pid);
    userList.push(prod.educator)
    return Meteor.users.find({_id: {$in: userList}})
});




Meteor.publish('families', function(user) {
    return Families.find({});
});
