// initialize variables
Template.calendar.created = function(){
	this.data.title = new ReactiveVar();
};

Template.calendar.helpers({
	// create a google embedded map from a query
	googleEmbeddedMap: function(query){
		return GOOGLE_EMBEDDED_MAPS_URI + Utilities.encodeURIParameters({
			q: query,
			key: Meteor.settings.public.google.api_key
		});
	},
	title: function(){
		return this.title ? this.title.get() : null;
	}
});

Template.calendar.events({
	// toggle the month
	'click #prev': function(e, template){
		$('#calendar').fullCalendar('prev');
		template.data.title.set($('#calendar').fullCalendar('getView').title);
	},
	'click #next': function(e, template){
		$('#calendar').fullCalendar('next');
		template.data.title.set($('#calendar').fullCalendar('getView').title);
	}
});

Template.calendar.rendered = function(){
	// fetch all the calendar events and populate the calendar
	function getMyEvents(){
		var calendarEvents = CalendarEvents.find().fetch();
		var data = [];
		_.each(calendarEvents, function(event){
			data.push({
				title: '<i class="fa fa-circle cal-dot"></i> '+event.name,
				id: event._id,
				start: moment.unix(event.start).format(),
				end: event.end ? moment.unix(event.end).format() : null,
				className: event.eventType,
				description: event.description,
				eventType: event.eventType,
				allDay: function(){
					if(event.allday){
						return true;
					}else{
						return false;
					}
				}
			});
		});
		return data;
	}

	// set up the calendar
	$('#calendar').fullCalendar({
		theme: false,
		header: false,
		events: getMyEvents(),
		eventClick: function(calEvent, jsEvent, view) {
			Router.go('calendar', {id: calEvent.id});	// route to a calendar event
		},
		eventRender: function(event, element, view) {
			element.find('span.fc-title').html(element.find('span.fc-title').text()); 	// seems like a hack to get the dot and the title
		}
	});

	// update the title of the current view (e.g. September 2015)
	this.data.title.set($('#calendar').fullCalendar('getView').title);
};