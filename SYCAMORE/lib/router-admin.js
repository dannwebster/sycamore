Router.map(function() {
    this.route('adminSettings', {
        path: '/admin/settings',
        layoutTemplate: 'backend-layout',
        onBeforeAction: function () {
            if(Roles.userIsInRole(Meteor.user(),'superadmin') || Roles.userIsInRole(Meteor.userId(),'educator')) {
                this.next()
            }else{
                this.redirect('/dashboard')
            }
        }
    });
    this.route('adminConsole', {
        path: '/admin',
        layoutTemplate: 'backend-layout',
        onBeforeAction: function () {
            if(Roles.userIsInRole(Meteor.user(),'superadmin') || Roles.userIsInRole(Meteor.userId(),'educator')) {
                this.next()
            }else{
                this.redirect('/dashboard')
            }
        }
    });

    this.route('adminBackups', {
        path: '/admin/backups',
        layoutTemplate: 'backend-layout',
        onBeforeAction: function () {
            if(Roles.userIsInRole(Meteor.user(),'superadmin') || Roles.userIsInRole(Meteor.userId(),'educator')) {
                this.next()
            }else{
                this.redirect('/dashboard')
            }
        }
    });

    this.route('adminSecurity', {
        path: '/admin/security',
        layoutTemplate: 'backend-layout',
        onBeforeAction: function () {
            if(Roles.userIsInRole(Meteor.user(),'superadmin') || Roles.userIsInRole(Meteor.userId(),'educator')) {
                this.next()
            }else{
                this.redirect('/dashboard')
            }
        }
    });

    this.route('adminStats', {
        path: '/admin/statistics',
        layoutTemplate: 'backend-layout',
        onBeforeAction: function () {
            if(Roles.userIsInRole(Meteor.user(),'superadmin') || Roles.userIsInRole(Meteor.userId(),'educator')) {
                this.next()
            }else{
                this.redirect('/dashboard')
            }
        }
    });



    this.route('adminApplications', {
        path: '/admin/applications',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('studentApplications')
            ];
        },
        data: function (){
            templateData = {
                applications: StudentApplications.find({},{created: -1})
            };
            return templateData;
        },
        onBeforeAction: function () {
            if(Roles.userIsInRole(Meteor.user(),'superadmin') || Roles.userIsInRole(Meteor.userId(),'educator')) {
                this.next()
            }else{
                this.redirect('/dashboard')
            }
        }
    });

    this.route('adminViewApplication', {
        path: '/admin/view/application/:id',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('studentApplications')
            ];
        },
        data: function (){
            templateData = {
                application: StudentApplications.findOne(this.params.id)
            };
            return templateData;
        },
        onBeforeAction: function () {
            if(Roles.userIsInRole(Meteor.user(),'superadmin') || Roles.userIsInRole(Meteor.userId(),'educator')) {
                this.next()
            }else{
                this.redirect('/dashboard')
            }
        }
    });

});
