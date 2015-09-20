Template.calendar.helpers({
    'title': function(){
        var view = $('#EventCalendar').fullCalendar('getView');
        if(view){
            //console.log(view)
            //return view.title;
        }
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

    getMyEvents = function(){
        var calendarEvents = CalendarEvents.find().fetch();
        var data = new Array();
        _.each(calendarEvents, function(event){
            data.push({
                title: '<i class="fa fa-circle cal-dot"></i> '+event.name,
                id: event._id,
                start: moment.unix(event.start).format(),
                end: moment.unix(event.end).format(),
                className: event.eventType,
                description: event.description,
                eventType: event.eventType,
                allDay: function(){
                    if(event.allday){
                        return true
                    }else{
                        return false
                    }
                }
            })
        })
        console.log(data)
        return data
    }



    $('#EventCalendar').fullCalendar({
        theme: false,
        header: false,
        events: getMyEvents(),
        eventClick: function(calEvent, jsEvent, view) {
            Router.go('calendarView',{id: calEvent.id })
        },
        eventRender: function(event, element, view) {
            element.find('span.fc-title').html(element.find('span.fc-title').text());
        }
    });
    element.find('td.fc-today').html('<div class="today-dot">'+element.find('td.fc-today').text()+"</div>");
    var view = $('#EventCalendar').fullCalendar('getView');
    $('#cal_title').html(view.title)

    $('#eventDetailsBox').height($('#EventCalendar').height() - 30)
}



Template.calendarView.helpers({
    'title': function(){
        var view = $('#EventCalendar').fullCalendar('getView');
        if(view){
            //console.log(view)
            //return view.title;
        }
    },
    'startDate': function(){
        return moment.unix(this.event.start).format('MMM DD, YYYY hh:mm A')
    },
    'endDate': function(){
        return moment.unix(this.event.end).format('MMM DD, YYYY hh:mm A')
    }
});


Template.calendarView.events({
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

Template.calendarView.rendered = function(){

    getMyEvents = function(){
        var calendarEvents = CalendarEvents.find().fetch();
        var data = new Array();
        _.each(calendarEvents, function(event){
            if(moment.unix(event.start).format('MM-DD-YYYY') != 'Invalid date' || moment.unix(event.end).format('MM-DD-YYYY') != 'Invalid date'){
                data.push({
                    title: '<i class="fa fa-circle cal-dot"></i> '+event.name,
                    id: event._id,
                    start: moment.unix(event.start).format(),
                    end: moment.unix(event.end).format(),
                    className: event.eventType,
                    description: event.description,
                    eventType: event.eventType,
                    allDay: function(){
                        if(event.allday){
                            return true
                        }else{
                            return false
                        }
                    }
                })

            }


        })
        console.log(data)
        return data
    }

    var eventlist = getMyEvents();


    $('#EventCalendar').fullCalendar({
        theme: false,
        header: false,
        events: eventlist,
        eventClick: function(calEvent, jsEvent, view) {
            Router.go('calendarView',{id: calEvent.id })
        },
        eventRender: function(event, element, view) {
            element.find('span.fc-title').html(element.find('span.fc-title').text());
            element.find('td.fc-today').html('<div class="today-dot">'+element.find('td.fc-today').text()+"</div>");
            
        }
    });

    var view = $('#EventCalendar').fullCalendar('getView');
    $('#cal_title').html(view.title)

    $('#eventDetailsBox').height($('#EventCalendar').height() - 30)
}
