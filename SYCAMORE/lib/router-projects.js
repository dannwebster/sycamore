Router.map(function() {
    this.route('projects', {
        path: '/projects',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            if(Roles.userIsInRole(Meteor.userId(),'parent')){
                return [
                    //subscribe to the Families db
                    Meteor.subscribe('userFamilyMembers',Meteor.userId()),
                    //subscribe to the user profiles in that fam
                    Meteor.subscribe('usersMyFam',Meteor.userId()),
                    //subscibe to active projects & project users
                    Meteor.subscribe('parentProjectUsers',1,Meteor.userId()),
                    Meteor.subscribe('parentProjects',1,Meteor.userId())
                ]
            }else{
                return [
                    Meteor.subscribe('projects',0,Meteor.userId()),
                    Meteor.subscribe('projects',1,Meteor.userId()),
                    Meteor.subscribe('projects',2,Meteor.userId())
                ];
            }
        },
        onBeforeAction: function () {
            if(!Meteor.user()) {
                this.render('accessDenied')
            }else{
                this.next();
            }
        }
    });
    this.route('projectEdit', {
        path: '/projects/edit/:id',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('singleProject',this.params.id),
                Meteor.subscribe('singleProjectUsers',this.params.id),
                Meteor.subscribe('ProjectGroups',this.params.id)
            ];
        },
        data: function (){
            templateData = {
                project: Projects.findOne(this.params.id),
                users: ProjectUsers.find({project: this.params.id}).count(),
                groups: ProjectGroups.find({project: this.params.id}).count()
            };
            return templateData;
        },
        onBeforeAction: function () {
            if(!Roles.userIsInRole(Meteor.userId(),'educator')) {
                this.render('accessDenied')
            }else{
                this.next();
            }
        }
    });
    this.route('projectView', {
        path: '/projects/view/:id',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('singleProject',this.params.id),
                Meteor.subscribe('singleProjectUsers',this.params.id),
                Meteor.subscribe('ProjectGroups',this.params.id),
                Meteor.subscribe('schoolRoster')
            ];
        },
        data: function (){
            templateData = {
                project: Projects.findOne(this.params.id),
                users: ProjectUsers.find({project: this.params.id}).count(),
                groups: ProjectGroups.find({project: this.params.id}).count()
            };
            return templateData;
        },
        onBeforeAction: function () {
            if(!Meteor.userId()) {
                this.render('accessDenied')
            }else{
                this.next();
            }
        }
    });
    this.route('projectViewStudent', {
        path: '/projects/view/:id/:user',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('schoolRoster'),
                Meteor.subscribe('singleProject',this.params.id),
                Meteor.subscribe('singleProjectUsers',this.params.id),
                Meteor.subscribe('ProjectGroups',this.params.id)
            ];
        },
        data: function (){
            templateData = {
                project: Projects.findOne(this.params.id),
                users: ProjectUsers.find({project: this.params.id}).count(),
                groups: ProjectGroups.find({project: this.params.id}).count(),
                student: Meteor.users.findOne(this.params.user)
            };
            return templateData;
        },
        onBeforeAction: function () {
            if(!Meteor.userId()) {
                this.render('accessDenied')
            }else{
                this.next();
            }
        }
    });
    this.route('projectUsers', {
        path: '/projects/users/:id',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('singleProject',this.params.id),
                Meteor.subscribe('singleProjectUsers',this.params.id),
                Meteor.subscribe('ProjectGroups',this.params.id),
                Meteor.subscribe('studentList'),
                Meteor.subscribe('parentList')
            ];
        },
        data: function (){
            templateData = {
                project: Projects.findOne(this.params.id),
                users: ProjectUsers.find({project: this.params.id})
            };
            return templateData;
        },
        onBeforeAction: function () {
            if(!Roles.userIsInRole(Meteor.userId(),'educator')) {
                this.render('accessDenied')
            }else{
                this.next();
            }
        }
    });
});
