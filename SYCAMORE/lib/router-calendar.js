Router.map(function() {
    this.route('calendar', {
        path: '/calendar/:id?',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('calendarEvents',Meteor.userId())
            ];
        },
        data: function (){
            templateData = {
                events: CalendarEvents.find({},{sort: {start: 1}}),
                event: this.params.id ? CalendarEvents.findOne(this.params.id) : null
            };
            return templateData;
        },
        onBeforeAction: function () {
            if(!Meteor.user()) {
                this.render('accessDenied');
            }else{
                this.next();
            }
        }
    });
    this.route('editEvent', {
        path: '/calendar/edit/:id',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('calendarEvent',this.params.id)
            ];
        },
        data: function (){
            templateData = {
                event: CalendarEvents.findOne(this.params.id)
            };
            return templateData;
        },
        onBeforeAction: function () {
            if(!Meteor.user()) {
                this.render('accessDenied')
            }else{
                this.next();
            }
        }
    });
    this.route('eventRSVPS', {
        path: '/calendar/rsvps/:id',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('calendarEvent',this.params.id)
            ];
        },
        data: function (){
            templateData = {
                event: CalendarEvents.findOne(this.params.id)
            };
            return templateData;
        },
        onBeforeAction: function () {
            if(!Meteor.user()) {
                this.render('accessDenied')
            }else{
                this.next();
            }
        }
    });

    this.route('newEvent', {
        path: '/calendar/event/new',
        layoutTemplate: 'backend-layout',
        data: function(){
            templateData = {
                'userlist': function(){
                    var users = new Array();
                    _.each(Meteor.users.find().fetch(), function(user) {
                        if(user.profile.firstname){
                            users.push({id: user._id, name: user.profile.firstname+' '+user.profile.lastname})
                        }
                        if(user.emails){
                            if(user.emails[0].address){
                                users.push({id: user._id, name: user.emails[0].address})
                            }
                        }
                    });
                    return users
                }
            }
            return templateData
        },
        onBeforeAction: function () {
            if(!Roles.userIsInRole(Meteor.userId(), ['educator', 'superadmin'])) {
                this.render('accessDenied')
            }else{
                this.next();
            }
        }
    });
    this.route('createEvent', {
        path: '/calendar/event/create',
        layoutTemplate: 'backend-layout',
        data: function(){
            templateData = {
                'userlist': function(){
                    var users = new Array();
                    _.each(Meteor.users.find().fetch(), function(user) {
                        if(user.profile.firstname){
                            users.push({id: user._id, name: user.profile.firstname+' '+user.profile.lastname})
                        }
                        if(user.emails){
                            if(user.emails[0].address){
                                users.push({id: user._id, name: user.emails[0].address})
                            }
                        }
                    });
                    return users
                }
            }
            return templateData
        },
        onBeforeAction: function () {
            if(!Roles.userIsInRole(Meteor.userId(), ['educator', 'superadmin'])) {
                this.render('accessDenied');
            }else{
                this.next();
            }
        }
    });

    this.route('manageEvents', {
        path: '/calendar/manage/events',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('currentEvents',Meteor.userId())
            ];
        },
        data: function (){
            templateData = {
                calevents: CalendarEvents.find({},{sort: {start: 1}})
            };
            return templateData;
        },
        onBeforeAction: function () {
            if(!Roles.userIsInRole(Meteor.userId(), ['educator', 'superadmin'])) {
                this.render('accessDenied')
            }else{
                this.next();
            }
        }
    });

    this.route('manageEventsOld', {
        path: '/calendar/manage/events/past',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('pastEvents',Meteor.userId())
            ];
        },
        data: function (){
            templateData = {
                calevents: CalendarEvents.find({},{sort: {start: -1}})
            };
            return templateData;
        },
        onBeforeAction: function () {
            if(!Roles.userIsInRole(Meteor.userId(), ['educator', 'superadmin'])) {
                this.render('accessDenied');
            }else{
                this.next();
            }
        }
    });

    this.route('manageSchoolYear', {
        path: '/calendar/manage/schoolyear',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('adminEvents',Meteor.userId())
            ];
        },
        data: function (){
            templateData = {
                calevents: CalendarEvents.find({},{sort: {start: 1}})
            };
            return templateData;
        },
        onBeforeAction: function () {
            if(!Roles.userIsInRole(Meteor.userId(), ['educator', 'superadmin'])) {
                this.render('accessDenied');
            }else{
                this.next();
            }
        }
    });
    this.route('manageSchoolSession', {
        path: '/calendar/manage/session',
        layoutTemplate: 'backend-layout',
        onBeforeAction: function () {
            if(!Roles.userIsInRole(Meteor.userId(), ['educator', 'superadmin'])) {
                this.render('accessDenied');
            }else{
                this.next();
            }
        }
    });
    this.route('manageSchoolHolidays', {
        path: '/calendar/manage/holidays',
        layoutTemplate: 'backend-layout',
        onBeforeAction: function () {
            if(!Roles.userIsInRole(Meteor.userId(), ['educator', 'superadmin'])) {
                this.render('accessDenied');
            }else{
                this.next();
            }
        }
    });
    this.route('manageSchoolBreaks', {
        path: '/calendar/manage/breaks',
        layoutTemplate: 'backend-layout',
        onBeforeAction: function () {
            if(!Roles.userIsInRole(Meteor.userId(), ['educator', 'superadmin'])) {
                this.render('accessDenied');
            }else{
                this.next();
            }
        }
    });
    this.route('eventList', {
        path: '/calendar/list',
        layoutTemplate: 'backend-layout',
        onBeforeAction: function () {
            if(!Roles.userIsInRole(Meteor.userId(), ['educator', 'superadmin'])) {
                this.render('accessDenied');
            }else{
                this.next();
            }
        }
    });
    this.route('events', {
        path: '/calendar/events',
        layoutTemplate: 'backend-layout',
        onBeforeAction: function () {
            if(!Meteor.userId()) {
                this.render('accessDenied');
            }else{
                this.next();
            }
        }
    });

});