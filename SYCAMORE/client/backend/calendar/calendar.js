// SAFE FILE
Template.calendar.events({
	// log the sad rsvp radio button changes to the sad event rsvp details
	'change input[type=radio]': function(event,template){
		Session.set('rsvp', event.target.value);
		Meteor.call('updateRSVP', this.event._id, event.target.value, function(err, res){
			if(err){
				console.error(err);
			} else {
				console.log(res);
			}
		});
	},
	// toggle the month
	'click #prev': function(e, template){
		$('#calendar').fullCalendar('prev');
		$('.date-title').text($('#calendar').fullCalendar('getView').title);
	},
	'click #next': function(e, template){
		$('#calendar').fullCalendar('next');
		$('.date-title').text($('#calendar').fullCalendar('getView').title);
	}
});

Template.calendar.helpers({
	isRSVP: function(val){
		return val === Session.get('rsvp', val);
	},
	// can the event be edited
	editableEvent: function(evt){
		return !!evt && ['onsite', 'offsite'].indexOf(evt.type) != -1;
	},
	// create a google embedded map from a query
	googleEmbeddedMap: function(query){
		return GOOGLE_EMBEDDED_MAPS_URI + Utilities.encodeURIParameters({
			q: query,
			key: Meteor.settings.public.google.api_key
		});
	},
	calendarOptions: {
		// Standard fullcalendar options
		theme: false,
		header: false,
		addedClasses: 'syc-shadow ns full-width',
		eventClick: function(calEvent, jsEvent, view) {
			Router.go('calendar', {id: calEvent.id});	// route to a calendar event
		},
		eventRender: function(event, element, view) {
			element.find('span.fc-title').html(element.find('span.fc-title').text()); 	// seems like a hack to get the dot and the title
		},
		// Function providing events reactive computation for fullcalendar plugin
		events: function(start, end, timezone, callback) {
			//console.log(start);
			//console.log(end);
			//console.log(timezone);
			var calendarEvents = CalendarEvents.find().fetch();
			var events = _.map(calendarEvents, function(evt){
				console.log(evt);
				console.log(evt.end ? moment.unix(evt.end).format() : null);
				return {
					title: '<i class="fa fa-circle cal-dot"></i> '+evt.name,
					id: evt._id,
					start: moment.unix(evt.start).format(),
					end: evt.end ? moment.unix(evt.end).format() : null,
					description: evt.description,
					allDay: evt.all_day
				};
			});
			callback(events);
		},
		// Optional: id of the calendar
		id: 'calendar',
		// Optional: Additional functions to apply after each reactive events computation
		autoruns: [
			function () {
				CalendarEvents.find();
			}
		]
	},
});

Template.calendar.onRendered(function(){
	// set the title of the calendar month
	var d = new Date();
	$('.date-title').text($('#calendar').fullCalendar('getView').title || d.getMoth() + ' ' + d.getYear());

	// i'm so sorry for such hackery, but we haz deadlines today
	// check the existing rsvp setting if available
	this.autorun(function(){
		var data = Template.currentData();

		if(data && data.event && data.event.rsvp_list){
			Session.set('rsvp', data.event.rsvp_list[Meteor.userId()]);
		}
	});
});