
Template.pageHeader.helpers({
    'live': function(){
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
    }
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
    var eve = getMyEvents2()
    var eventArray = this.data.events;

    $('#EventCalendar').fullCalendar({
        theme: false, header: false, events: Session.get('calevents')
    });

    Meteor.setTimeout(function(){
        $('#EventCalendar').fullCalendar( 'refetchEvents' );    console.log('events refetched')
    }, 3500);

    Meteor.setTimeout(function(){
        $('#EventCalendar').fullCalendar( 'rerenderEvents' );   console.log('events rerendered')
    }, 5000);

    Meteor.setTimeout(function(eventArray){
        $('#EventCalendar').fullCalendar({ theme: false, header: false, events: Session.get('calevents') });
        console.log('cal reloaded')
    }, 8000);

    var view = $('#EventCalendar').fullCalendar('getView');
    $('#cal_title').html(view.title)

}
