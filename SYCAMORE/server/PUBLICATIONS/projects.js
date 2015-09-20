Meteor.publish('projects', function(status,user) {
    if(Roles.userIsInRole(user,'educator')){
        var data = {
            status: status,
            educator: user
        }
    }else if(Roles.userIsInRole(user,'student')){

        var projects = ProjectUsers.find({user: user});
        var projectList = new Array();
        _.each(projects.fetch(),function(project){
            projectList.push(project.project)
        })
        var data = {
            status: status,
            _id: {$in: projectList}
        }
    }else if(Roles.userIsInRole(user,'parent')){
        var record = FamilyMembers.findOne({user: user});
        var fam = FamilyMembers.find({family: record.family}).fetch()
        var student;
        _.each(fam,function(record){
            if(Roles.userIsInRole(record.user,'student')){
                student = record.user
            }
        })

        var projects = ProjectUsers.find({user: student});
        var projectList = new Array();
        _.each(projects.fetch(),function(project){
            projectList.push(project.project)
        })
        var data = {
            status: status,
            _id: {$in: projectList}
        }

    }else if(Roles.userIsInRole(user,'superadmin')){
        var data = {
            status: status
        }
    }
    return Projects.find(data)
});

Meteor.publish('projectLimitCount', function(status,user,count) {
    if(Roles.userIsInRole(user,'educator')){
        var data = {
            status: status,
            educator: user
        }
        var sort = {
            created: -1,
            limit: count
        }
    }else if(Roles.userIsInRole(user,'student')){

        var projects = ProjectUsers.find({user: user});
        var projectList = new Array();
        _.each(projects.fetch(),function(project){
            projectList.push(project.project)
        })
        var data = {
            status: status,
            _id: {$in: projectList}
        }
        var sort = {
            due: 1,
            limit: count
        }
    }else if(Roles.userIsInRole(user,'parent')){
        var record = FamilyMembers.findOne({user: user});
        var fam = FamilyMembers.find({family: record.family}).fetch()
        var student;
        _.each(fam,function(record){
            if(Roles.userIsInRole(record.user,'student')){
                student = record.user
            }
        })

        var projects = ProjectUsers.find({user: student});
        var projectList = new Array();
        _.each(projects.fetch(),function(project){
            projectList.push(project.project)
        })
        var data = {
            status: status,
            _id: {$in: projectList}
        }
        var sort = {
            created: -1,
            limit: count
        }

    }else if(Roles.userIsInRole(user,'superadmin')){
        var data = {
            status: status
        }
        var sort = {
            created: -1,
            limit: count
        }
    }
    return Projects.find(data,sort)
});

Meteor.publish('singleProject', function(id) {
    return Projects.find(id)
});

Meteor.publish('singleProjectUsers', function(id) {
    return ProjectUsers.find({project: id})
});

Meteor.publish('singleProjectUserRecord', function(pid,user) {
    return ProjectUsers.find({project: pid, user: user})
});


Meteor.publish('ProjectGroups', function(id) {
    return ProjectGroups.find({project: id})
});

Meteor.publish('parentProjects', function(status,user) {
    var record = FamilyMembers.findOne({user: user});

    var fam = FamilyMembers.find({family: record.family}).fetch()

    var students = new Array();

    _.each(fam,function(record){

        if(Roles.userIsInRole(record.user,'student')){
            students.push(record.user);
        }

    })
    Meteor.publishWithRelations({
        handle: this,
        collection: Projects,
        filter: {status: status},
        mappings: [{
            key: 'project',
            collection: ProjectUsers,
            filter: { user: {$in: students} }
        }]
    });
});


Meteor.publish('parentProjectUsers', function(status,user) {
    var record = FamilyMembers.findOne({user: user});
    var fam = FamilyMembers.find({family: record.family}).fetch()
    var students = new Array();

    _.each(fam,function(record){
        if(Roles.userIsInRole(record.user,'student')){
            students.push(record.user);
        }
    })
    var users = ProjectUsers.find({ user: {$in: students} });
    console.log(users.fetch())
    return users
});

Meteor.publish('singleUserProjects', function(user) {
    var users = ProjectUsers.find({ user: user });
    return users
});
