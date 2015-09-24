Template.manageEvents.helpers({
	calendarEvents: function(){
		return CalendarEvents.find({type: {$in: ['onsite', 'offsite']}}, {sort: {start: 1}});
	},
});

Template.eventHolder.helpers({
	dates:function(){
        return moment.unix(this.start).format('MM/DD/YYYY');
    }
});
