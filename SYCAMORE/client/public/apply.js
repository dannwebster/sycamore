Template.applicationForm.events({
    'click #apply': function(event,template){
        //CHECK ALL FORMS ARE FILLED
        var data = {}
        var errm = false;

        $('.appInfoSubmit').each( function(){
            var value = $(this).val();
            if(value != ''){
                data[$(this).attr('id')] = value
            }else{
                var errm = true;
            }
        });

        Object.size = function(obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };

        // Get the size of an object
        var size = Object.size(data);
        console.log(size)
        console.log(data)

        if(size < 14){
            bootbox.alert('You must fill out all form fields.')
        }else{
            data.created = moment().format('X')
            StudentApplications.insert(data,function(e,r){
                if(e){
                    bootbox.alert(e)
                }else{
                    $('.appInfoSubmit').val('');
                    bootbox.alert('Your application has been submitted! We will be in touch once we start the review process.')
                    Meteor.call('emailAdminApplication',data)
                }
            })
        }

        //SAVE THE data

        //DISPLAY A THANK YOU
    }
})

Template.studentApplication.rendered = function(){
    resizePageView = function(){
        var win = $(document).width();
        var container = $('#mpcontainer').width();
        var content = $('.frontEndContent').width();
        var sidemenu = $('.frontEndSide').width();
        var sides = (win-container)/2;

        console.log(win+' (win) '+container+' (container) '+content+' (content) '+sides+' (sides)')

        $('.page-bg1').width(win-content-sides+15);
        $('.page-bg2').width(win-sidemenu-sides+15);

        $('.main-syc-nav').css({right:'0px', position:'fixed'})
        $('.mm-login').css({right:'66px', position:'fixed'})
        $('.mm-search').css({right:'132px', position:'fixed'})
    }

    resizePageView()

    $(window).resize(function(evt) {
        resizePageView();
    });Template.calendar.rendered = function(){
        getMyEvents = function(){
            var calendarEvents = Events.find().fetch();
            var data = new Array();
            _.each(calendarEvents, function(event){
                data.push({
                    title: event.title,
                    start: moment.unix(event.startDate).format('MM-DD-YYYY h:mm a'),
                    end: moment.unix(event.endDate).format('MM-DD-YYYY h:mm a'),
                    className: 'fieldTripEvent',
                    description: event.description,
                    eventType: event.eventType
                })
            })
            console.log(data)
            return data
        }

        if(template.data.page.url==='events'){
            $('#EventCalendar').fullCalendar({
                theme: false,
                header: false,
                events: getMyEvents(),
                eventClick: function(calEvent, jsEvent, view) {

                    $('.calendar-title-box > .syc-title').html(calEvent.title);
                    $('.calendar-title-box > .syc-cal-type').html(calEvent.type);
                    $('.calendar-title-box > .syc-cal-content').html(calEvent.description);
                    $(this).css('border-color', 'red');

                }
            });
        }

    }
}
