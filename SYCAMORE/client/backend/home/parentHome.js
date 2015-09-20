Template.parentHome.helpers({
    'multiChild': function(){
        var user = FamilyMembers.findOne({user: Meteor.userId()});
        var mem = FamilyMembers.find({family: user.family}).fetch();
        var members = new Array();

        _.each(mem,function(record){
            members.push(record.user)
        });
        var students = Meteor.users.find({roles: 'student', _id: {$in: members}},{sort: {'profile.firstname': 1}})
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
            var old = Projects.find({_id: {$in: plist} , status: 2},{sort: {due: 1}});

            return {
                multi: false,
                child: child,
                projects: projects,
                old: old
            }
        }


    }
})

Template.studentProjectList.helpers({
    'projects': function(){
        //Meteor.subscribe('parentProjectUsers',1,Meteor.userId())
        //Meteor.subscribe('parentProjects',1,Meteor.userId())
        var studentProjects = ProjectUsers.find({user: this.student._id})

        //console.log(studentProjects.fetch())

        var plist = new Array();
        _.each(studentProjects.fetch(),function(project){
            plist.push(project.project)
        })
        //console.log(plist)

        var projects = Projects.find({_id: {$in: plist} , status: 1},{sort: {due: 1}});
        return projects
    },
})


Template.studentProjectListOld.helpers({
    'projects': function(){
        //Meteor.subscribe('parentProjectUsers',2,Meteor.userId())
        //Meteor.subscribe('parentProjects',2,Meteor.userId())
        var studentProjects = ProjectUsers.find({user: this._id})

        console.log(studentProjects.fetch())

        var plist = new Array();
        _.each(studentProjects.fetch(),function(project){
            plist.push(project.project)
        })
        console.log(plist)

        var projects = Projects.find({_id: {$in: plist}, status: 2},{sort: {due: 1}});
        return projects
    },
})
