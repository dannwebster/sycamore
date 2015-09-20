Router.map(function() {
    //HOMEPAGE
    this.route('login', {
        path: '/login',
        layoutTemplate: 'homeLayout',

        waitOn : function () {
            return [
                Meteor.subscribe('userCounter')
            ];
        },
        onAfterAction: function (pause) {
            if (Meteor.user()) {
                //this.redirect('/');
                this.next()
            }else{
                this.next()
            }
        }
    });
    this.route('loginLoader', {
        path: '/loading',
        layoutTemplate: 'wide-layout'
    });
    this.route('signup', {
        path: '/sign-up',
        waitOn : function () {
            return [
                Meteor.subscribe('userCounter')
            ];
        },
        onAfterAction: function(){
            var count = Counts.findOne('userCounts')
            if(count.count >= 1){
                this.redirect('/login')
            }
        }
    });
    this.route('dashboard', {
        path: '/dashboard',
        layoutTemplate: 'backend-layout',
        waitOn: function(){
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
                return []
            }
        },
        onAfterAction: function (pause) {
            if(!Meteor.userId()) {
                this.render('login');
            }else{
                this.next()
            }
        }
    });
    this.route('profile', {
        path: '/profile',
        layoutTemplate: 'backend-layout',
        data: function (){
            templateData = {
                //user: Meteor.user()
            };
            return templateData;
        },
        onBeforeAction: function (pause) {
            if (!Meteor.user()) {
                this.render('home');
            }else{
                this.next()
            }
        }
    });
    this.route('manageProfile', {
        path: '/profile/:id',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('userAccount',this.params.id),
                Meteor.subscribe('familyByUser',this.params.id),
                Meteor.subscribe('userFamily',this.params.id),
                Meteor.subscribe('projects',1,this.params.id),
                Meteor.subscribe('userFamilyMembers',Meteor.userId()),
                Meteor.subscribe('singleUserProjects',this.params.id),
            ];
        },
        data: function (){
            templateData = {
                user: Meteor.users.findOne(this.params.id),
                family: Families.findOne(),
                memberRecord: FamilyMembers.findOne({user: this.params.id})
            };
            return templateData;
        },
        onBeforeAction: function (pause) {
            if (!Meteor.user()) {
                this.render('home');
            }else{
                this.next()
            }
        }
    });
    this.route('manageFamily', {
        path: '/profile/family/:id',
        layoutTemplate: 'backend-layout',
        loadingTemplate: 'loading',
        waitOn: function () {
            return [
                Meteor.subscribe('families'),
                Meteor.subscribe('familyList'),
                Meteor.subscribe('familyByUser',this.params.id)
            ];
        },
        data: function (){
            //delete Session.keys['familySearch']
            templateData = {
                user: Meteor.users.findOne(this.params.id),
                memberRecord: FamilyMembers.findOne({user: this.params.id})
            };
            return templateData;
        },
        onBeforeAction: function (pause) {
            if (Roles.userIsInRole(Meteor.userId(),'educator') || Roles.userIsInRole(Meteor.userId(),'superadmin')) {
                this.next()
            }else{
                this.render('accessDenied');
            }
        }
    });
});
