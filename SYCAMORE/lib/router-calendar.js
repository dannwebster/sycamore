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
			return {
				events: CalendarEvents.find({},{sort: {start: 1}}),
				event: this.params.id ? CalendarEvents.findOne(this.params.id) : null
			};
		},
		onBeforeAction: function () {
			if(!Meteor.user()) {
				this.render('accessDenied');
			}else{
				this.next();
			}
		}
	});

	this.route('createEvent', {
		path: '/calendar/event/create',
		layoutTemplate: 'backend-layout',
		waitOn : function () {
			return [
				Meteor.subscribe('schoolRoster')
			];
		},
		data: function(){
			return {
				userList: function(){	// this isn't mine, but it'll do for quick patches
					var users = [];
					_.each(Meteor.users.find().fetch(), function(user) {
						if(user.profile.firstname){
							users.push({id: user._id, name: user.profile.firstname+' '+user.profile.lastname});
						}
						if(user.emails && user.emails[0].address){
							users.push({id: user._id, name: user.emails[0].address});
						}
					});
					return users;
				}
			};
		},
		onBeforeAction: function () {
			if(!Roles.userIsInRole(Meteor.userId(), ['educator', 'superadmin'])) {
				this.render('accessDenied');
			}else{
				this.next();
			}
		}
	});

	this.route('createSchoolSession', {
		path: '/calendar/session/create',
		layoutTemplate: 'backend-layout',
		onBeforeAction: function () {
			if(!Roles.userIsInRole(Meteor.userId(), ['educator', 'superadmin'])) {
				this.render('accessDenied');
			}else{
				this.next();
			}
		}
	});

	this.route('createSchoolHoliday', {
		path: '/calendar/holiday/create',
		layoutTemplate: 'backend-layout',
		onBeforeAction: function () {
			if(!Roles.userIsInRole(Meteor.userId(), ['educator', 'superadmin'])) {
				this.render('accessDenied');
			}else{
				this.next();
			}
		}
	});
	this.route('createSchoolBreak', {
		path: '/calendar/break/create',
		layoutTemplate: 'backend-layout',
		onBeforeAction: function () {
			if(!Roles.userIsInRole(Meteor.userId(), ['educator', 'superadmin'])) {
				this.render('accessDenied');
			}else{
				this.next();
			}
		}
	});

	this.route('editEvent', {
		path: '/calendar/event/:id/edit',
		layoutTemplate: 'backend-layout',
		waitOn : function () {
			return [
				Meteor.subscribe('calendarEvent',this.params.id),
				Meteor.subscribe('schoolRoster'),
			];
		},
		data: function (){
			templateData = {
				event: CalendarEvents.findOne(this.params.id),
				userList: function(){	// this isn't mine, but it'll do
					var users = [];
					_.each(Meteor.users.find().fetch(), function(user) {
						if(user.profile.firstname){
							users.push({id: user._id, name: user.profile.firstname+' '+user.profile.lastname});
						}
						if(user.emails && user.emails[0].address){
							users.push({id: user._id, name: user.emails[0].address});
						}
					});
					return users;
				}
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

	this.route('eventRSVPS', {
		path: '/calendar/rsvps/:id',
		layoutTemplate: 'backend-layout',
		waitOn : function () {
			return [
				Meteor.subscribe('calendarEvent',this.params.id)
			];
		},
		data: function (){
			return {
				event: CalendarEvents.findOne(this.params.id)
			};
		},
		onBeforeAction: function () {
			if(!Meteor.user()) {
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
				Meteor.subscribe('calendarEvents', Meteor.userId())
			];
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
				Meteor.subscribe('calendarEvents', Meteor.userId())
			];
		},
		onBeforeAction: function () {
			if(!Roles.userIsInRole(Meteor.userId(), ['educator', 'superadmin'])) {
				this.render('accessDenied');
			}else{
				this.next();
			}
		}
	});
});