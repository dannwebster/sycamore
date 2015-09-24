
Template.pageHeader.helpers({
    'live': function(){
        console.log(this);
        if(this.page.status=='live'){
            return true;
        }
    }
})

Template.page.helpers({
    'calendar': function(){
        if(this.page.url==='events'){
            return true
        }
    },
    'fieldTrip': function(){
        if(this.page.url==='suggest-a-field-trip'){
            return true
        }
    },
    'access': function(){
        console.log(this)
        if(this.page.visibility=='users' && !Meteor.userId()){
            return false
        }else if(this.page.visibility=='parents_educators' && ! Meteor.userId()){
            return false
        }else if(this.page.visibility=='educators' && ! Roles.userIsInRole(Meteor.userId(),'educator')){
            return false
        }else{
            return true
        }
    },
    'isLive': function(){
        //var page =
        if(this.page.status=='live'){
            return true
        }else{
            return false
        }
    }
})


Template.page.rendered = function(){

    resizePageView = function(){
        if(Meteor.Device.isDesktop()){
            //SET THE DESKTOP VIEW
            var win = $(document).width();
            var container = $('#mpcontainer').width();
            var content = $('.frontEndContent').width();
            var sidemenu = $('.frontEndSide').width();
            var sides = (win-container)/2;

            //console.log(win+' (win) '+container+' (container) '+content+' (content) '+sides+' (sides)')

            $('.page-bg1').width(win-content-sides+15);
            $('.page-bg2').width(win-sidemenu-sides+15);

            $('.main-syc-nav').css({right:'0px', position:'fixed'})
            $('.mm-login').css({right:'66px', position:'fixed'})
            $('.mm-search').css({right:'132px', position:'fixed'})
        }else{
            //SET THE MOBILE VIEW
            var win = $(document).width();
            //REMOVE THE LEFT SIDE ITEMS
            //$('.page-bg1').remove();  $('.frontEndSide').remove(); $('.fesmBG').remove(); $('.fesMenu').remove();
            //SET THE MAIN PAGE WIDTH TO FULL
            $('.page-bg2').width(win);
            $('.frontEndContent').width('100%');

            //$('.frontEndSide').remove();

        }


    }

    resizePageView()

    $(window).resize(function(evt) {
        resizePageView();
    });
}

Template.frontCalendar.helpers({
    'title': function(){
        var view = $('#EventCalendar').fullCalendar('getView');
        if(view){
            return view.title;
        }
    },
    calendarOptions: {
        // Standard fullcalendar options
        theme: false,
        header: false,
        addedClasses: 'syc-shadow ns full-width',
        eventClick: function(calEvent, jsEvent, view) {
            Router.go('calendar', {id: calEvent.id});   // route to a calendar event
        },
        eventRender: function(event, element, view) {
            element.find('span.fc-title').html(element.find('span.fc-title').text());   // seems like a hack to get the dot and the title
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
        id: 'EventCalendar',
        // Optional: Additional functions to apply after each reactive events computation
        autoruns: [
            function () {
                CalendarEvents.find();
            }
        ]
    },
});
 
Template.frontCalendar.events({
    'click #prev': function(){
        console.log('prev')
        $('#EventCalendar').fullCalendar('prev');
        var view = $('#EventCalendar').fullCalendar('getView');
        $('#cal_title').html(view.title)
    },
    'click #next': function(){
        console.log('next')
        $('#EventCalendar').fullCalendar('next');
        var view = $('#EventCalendar').fullCalendar('getView');
        $('#cal_title').html(view.title)
    }
});


Template.frontCalendar.rendered = function(event,template){
    var view = $('#EventCalendar').fullCalendar('getView');
    $('#cal_title').html(view.title)
}
