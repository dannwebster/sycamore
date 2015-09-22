Template.calendar.helpers({
    googleEmbeddedMap: function(query){
        return 'https://www.google.com/maps/embed/v1/search?q=' + encodeURIComponent(query) + '&key=AIzaSyD8rXBC7OhqFQI26IvajvAa9UC49jjImwI';
    }
});


Template.calendar.events({
    'click #prev': function(){
        $('#EventCalendar').fullCalendar('prev');
        var view = $('#EventCalendar').fullCalendar('getView');
        $('#cal_title').html(view.title)
    },
    'click #next': function(){
        $('#EventCalendar').fullCalendar('next');
        var view = $('#EventCalendar').fullCalendar('getView');
        $('#cal_title').html(view.title)
    }
});

Template.calendar.rendered = function(){
    function getMyEvents(){
        var calendarEvents = CalendarEvents.find().fetch();
        var data = [];
        _.each(calendarEvents, function(event){
            console.log(event.start);
            console.log(event.end);
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

    $('#EventCalendar').fullCalendar({
        theme: false,
        header: false,
        events: getMyEvents(),
        eventClick: function(calEvent, jsEvent, view) {
            Router.go('calendar',{id: calEvent.id });
        },
        eventRender: function(event, element, view) {
            element.find('span.fc-title').html(element.find('span.fc-title').text());
        }
    });
    //this.find('td.fc-today').html('<div class="today-dot">'+this.find('td.fc-today').text()+"</div>");
    var view = $('#EventCalendar').fullCalendar('getView');
    $('#cal_title').html(view.title);

    $('#eventDetailsBox').height($('#EventCalendar').height() - 30);
};