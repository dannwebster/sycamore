Template.editEvent.helpers({
	// don't like this but we'll keep for now -- how to put functions inside template params?
	start: function(){
		return (this.event && this.event.start) ? moment.unix(this.event.start).format('MM-DD-YYYY h:mm a') : null;
	},
	end: function(){
		return (this.event && this.event.end) ? moment.unix(this.event.end).format('MM-DD-YYYY h:mm a') : null;
	},

	isSelected: function(type, val){
		console.log(type);
	},

	// set the options for various settings
	typeOptions: function(){
		return [
			{value: 'offsite', title: 'Off-Site Event'},
			{value: 'onsite', title: 'In-School Event'},
		];
	},
	invitationOptions: function(){
		return [
			{value: 'all', title: 'Everyone'},
			{value: 'students', title: 'Students & Educators Only'},
			{value: 'parents', title: 'Parents & Educators Only'},
			{value: 'educators', title: 'Educators Only'},
			{value: 'invited', title: 'Invited Guests Only'},
		];
	},
	rsvpOptions: function() {
		return [
			{value: 'none', title: 'No RSVP Required'},
			{value: 'optional', title: 'RSVP Optional'},
			{value: 'required', title: 'RSVP Required'},
		];
	},
});

Template.editEvent.events({
	// hack it up david
	'change #guests': function(event,template){
		 var guests = $(event.target).val();
		 if(guests=='invited'){
			 $('.invitees').fadeIn();
		 }else{
			 $('.invitees').hide();
		 }
	},

	// submit the form and update the event
	'submit form': function(event, template){
		event.preventDefault();

		// find all the incomplete required fields
		var incomplete = _.filter(event.target, function(element){
			return element.required && !element.value;
		});

		var start = moment(event.target.start.value, 'MM/DD/YYYY h:mm A');
		var end = moment(event.target.end.value, 'MM/DD/YYYY h:mm A');

		// if the form is incomplete, send user an alert
		if(incomplete.length){
			bootbox.alert('You must fill out all required fields.');
			return;
		}

		// test the date inputs
		if(!start.isValid()){
			bootbox.alert('Please select a valid start date.');
			return;
		} else if (!event.target.isAllDay.checked && !end.isValid() || (end.isValid() && end.isBefore(start))){
			bootbox.alert('Please select a valid end date.');
			return;
		}

		// put all the form data in an object sorry for the mess it's not mine
		var data = {
			owner: Meteor.userId(),
			name: event.target.name.value,
			type: event.target.eventType.value,
			start: start.format('X'),
			end: end.isValid() && end.format('X'),
			all_day: event.target.isAllDay.checked,
			public: event.target.isPublic.checked,
			description: $('#description').editable('getHTML'),
			guests: event.target.guests.value,
			invitees: event.target.guests.value === 'invited' && $("#invitees").tagsinput('items'),
			rsvp: event.target.rsvp.value,
			address: event.target.address? event.target.address.value : null,
			url: event.target.url.value? event.target.url.value : null,
		};

		// if we are updating
		if(template.data && template.data.event && template.data.event._id){
			console.log('updating');

			// hack it up, boyeeee
			if(data.rsvp !== 'none' && !template.data.event.rsvp_list){
				data.rsvp_list = {};
			}

			// update the CalendarEvent object with the new data -- we need a method because we'll be setting roles
			CalendarEvents.update({_id: template.data.event._id}, {$set: data}, function(err, succ){
				if(err){
					console.error(err);
				} else {
					console.log(succ);
					Router.go('calendar');
				}
			});
		} else {	// if we are creating
			console.log('inserting');
			
			// hack it up, boyeeee
			if(data.rsvp !== 'none')
				data.rsvp_list = {};

			CalendarEvents.insert(data, function(err, succ){
				if(err){
					console.error(err);
				} else {
					console.log(succ);
					Router.go('calendar');
				}
			});
		}

	},
	'click .delete': function(event, template){
		event.preventDefault();

		bootbox.confirm('Are you sure you want to remove this event?', function(result){
            if(result){
                // we can call the remove directly because we have built-in privilages
				CalendarEvents.remove({_id: template.data.event._id}, function(err, succ){
					if(err){
						console.err(err);
					} else {
						console.log(succ);
						Router.go('calendar');
					}
				});
            }
        }); 
	}
});

Template.editEvent.rendered = function(event,template){
	// turn the description div into a froalla object
	$('#description').editable({
		inlineMode: false,
		toolbarFixed: false,
		height: 550,
		buttons: [  // this should really be set somewhere as a default
			'bold',
			'italic',
			'underline',
			'strikeThrough',
			'sep',
			'fontSize',
			'color',
			'sep',
			'align',
			'outdent',
			'indent',
			'insertOrderedList',
			'insertUnorderedList',
			'sep',
			'selectAll',
			'createLink',
			'table',
			'undo',
			'redo',
			'insertHorizontalRule',
			'fullscreen'
		],
	});

	// add existing description html to the WYSIWYG
	if(this.data && this.data.event && this.data.event.description){
		$('#description').editable('setHTML', this.data.event.description);
	}

	// use this sad tagsinput leftover from david for now
	users = this.data.userList;
	var Qusers = new Bloodhound({
		local: users,
		datumTokenizer: function(d) {
			return Bloodhound.tokenizers.whitespace(d.name);
		},
		identify: function(obj) { return obj.name; },
		queryTokenizer:  Bloodhound.tokenizers.whitespace
	});

	$("#invitees").tagsinput({
		itemValue: 'id',
		itemText: 'name',
		typeaheadjs: {
			name: 'Qusers',
			displayKey: 'name',
			source: Qusers.ttAdapter()
		}
	});

	// hack -- show the invitees section on load, find all the users invited and prepopulate, ain't got time to do this nicely right now
	if(this.data && this.data.event && this.data.event.guests === 'invited'){
		$('.invitees').fadeIn();
		_.each(this.data.event.invitees, function(guest){
			$('#invitees').tagsinput('add', guest);
		});
	}
};
