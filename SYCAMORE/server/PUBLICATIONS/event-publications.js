Meteor.publish('calendarEvents', function(user) {
    return CalendarEvents.find();
});

Meteor.publish('calendarEvent', function(id) {
    return CalendarEvents.find({_id: id});
});

Meteor.publish('adminEvents', function(user) {
    return CalendarEvents.find({admin:true});
});

Meteor.publish('publicEvents', function() {
    return CalendarEvents.find({public:true});
});

Meteor.publish('currentEvents', function(user) {
    return CalendarEvents.find({admin: {$ne: true}, start: {$gte: moment().startOf('day').format('X') }});
});

Meteor.publish('pastEvents', function(user) {
    return CalendarEvents.find({admin: {$ne: true}, start: {$lt: moment().startOf('day').format('X') }});
});
