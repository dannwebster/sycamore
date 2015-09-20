
//USER ACCOUNT METHODS
Meteor.methods({
    'createFirstAccount': function(email,password){
        var data = {
            email: email,
            password: password
        }
        var id = Accounts.createUser(data);
        Roles.addUsersToRoles(id, ['superadmin','educator'])
    },
    'profile_photo': function(response){
        Meteor.users.update(response.context.user._id,{$set: {'profile.photo': response.upload_data.public_id}})

    },
    'createFamily': function(name,user){
        var fid = Families.insert({name: name});
        FamilyMembers.insert({family: fid, user: user})
    },
    'removeFamily': function(fid){
        Families.remove(fid);
        FamilyMembers.remove({family: fid},{multi:true})
    },
    'joinFamily': function(fid,user){
        console.log(fid+'<>'+user)
        FamilyMembers.upsert({user: user},{$set: {family: fid }})
    },
    'leaveFamily': function(fid,user){
        FamilyMembers.remove({family: fid, user: user})
    }
})
