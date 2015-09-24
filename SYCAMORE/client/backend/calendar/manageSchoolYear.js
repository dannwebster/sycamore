Template.manageSchoolYear.helpers({
    calendarEvents: function(){
        return CalendarEvents.find({type: {$nin: ['onsite', 'offsite']}}, {sort: {start: 1}});
    }
});

Template.eventHold.helpers({
    dates:function(){
        return moment.unix(this.start).format('MM/DD/YYYY').toString() + (!!this.end ? (' - ' + moment.unix(this.end).format('MM/DD/YYYY').toString()) : '');
    }
});
Template.eventHold.events({
    'click .delete': function(event,template){
        //if(template.data.) -> do someting with parents / children
        bootbox.confirm('Are you sure you want to remove this event?',function(result){
            if(result){
                CalendarEvents.remove(event.currentTarget.id);
            }
        });
    },
});
