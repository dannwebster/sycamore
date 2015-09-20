Template.parentProjects.helpers({
    'multiChild': function(){
        var user = FamilyMembers.findOne({user: Meteor.userId()});
        var mem = FamilyMembers.find({family: user.family}).fetch();
        var members = new Array();
        console.log(mem)
        _.each(mem,function(record){
            members.push(record.user)
        });
        var students = Meteor.users.find({roles: 'student', _id: {$in: members}})
        var count = students.count()
        if(count > 1){
            return {
                multi: true,
                students: students
            }
        }else{
            var child = Meteor.users.findOne({roles: 'student', _id: {$in: members}})
            var studentProjects = ProjectUsers.find({user: child._id})
            var plist = new Array();
            _.each(studentProjects.fetch(),function(project){
                plist.push(project.project)
            })
            var projects = Projects.find({_id: {$in: plist} , status: 1},{sort: {due: 1}});

            return {
                multi: false,
                child: child,
                projects: projects
            }
        }


    }
})
