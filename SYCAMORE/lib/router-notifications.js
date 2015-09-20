Router.map(function() {
    this.route('notifications', {
        path: '/notifications',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('notifications',Meteor.userId())
            ];
        },
        data: function (){
            templateData = {
                //notifications: Notifications.find({},{sort: {created: -1, sendDate: -1}})
            };
            return templateData;
        },
        onBeforeAction: function () {
            if(!Meteor.user()) {
                this.redirect('login')
            }else{
                this.next();
            }
        }
    });
    this.route('notificationTypes', {
        path: '/notifications/view/:type',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('notificationTypes',this.params.type,Meteor.userId())
            ];
        },
        data: function (){
            templateData = {
                notifications: Notifications.find({},{sort: {created: -1, sendDate: -1}}),
                type: this.params.type
            };
            return templateData;
        },
        onBeforeAction: function () {
            if(!Meteor.user()) {
                this.redirect('login')
            }else{
                this.next();
            }
        }
    });

    this.route('notificationTypeView', {
        path: '/notifications/view/:type/:id',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('notificationTypes',this.params.type,Meteor.userId())
            ];
        },
        data: function (){
            templateData = {
                notifications: Notifications.find({},{sort: {created: -1, sendDate: -1}}),
                note: Notifications.findOne(this.params.id),
                type: this.params.type
            };
            return templateData;
        },
        onBeforeAction: function () {
            if(!Meteor.user()) {
                this.redirect('login')
            }else{
                this.next();
            }
        }
    });

    this.route('notificationCompose', {
        path: '/notifications/compose',
        layoutTemplate: 'backend-layout',
        onBeforeAction: function () {
            if(!Roles.userIsInRole(Meteor.userId(),'educator')) {
                this.render('accessDenied')
            }else{
                this.next();
            }
        }
    });
    this.route('notificationEdit', {
        path: '/notifications/edit/:id',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('oneNotification',this.params.id)
            ];
        },
        data: function (){
            templateData = {
                notification: Notifications.findOne(this.params.id)
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

    this.route('notificationView', {
        path: '/notifications/:id',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('notifications',Meteor.userId())
            ];
        },
        data: function (){
            templateData = {
                notifications: Notifications.find({},{sort: {created: -1, sendDate: -1}}),
                note: Notifications.findOne(this.params.id)
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

    this.route('printNotification', {
        path: '/print/notification/:id',
        layoutTemplate: 'blank',
        waitOn : function () {
            return [
                Meteor.subscribe('notifications',Meteor.userId())
            ];
        },
        data: function (){
            templateData = {
                note: Notifications.findOne(this.params.id)
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

});
