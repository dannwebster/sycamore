Template.educatorSidebar.events({
    'mouseenter #sidebar': function(){
        $('#sidebar').animate({left: 0},{duration: 500, easing: 'easeOutExpo', queue: false});
    },
    'mouseleave #sidebar': function(){
        $('#sidebar').animate({left: -240},{duration: 500, easing: 'easeOutExpo', queue: false});
    }
})
