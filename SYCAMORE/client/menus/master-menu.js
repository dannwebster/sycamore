Template.masterMenu.helpers({

})

Template.masterMenu.events({
    'click .sub-nav': function(event,template){
        $('.fesmitem').children('ul').hide();
        $(event.target.id).children('ul').show();
        $('.fesmitem > ul > .link').removeClass('active')
    }
})

Template.masterMenu.rendered = function(){
    $('.main-syc-nav').hoverIntent(
        function(){
            //$(this).children('.x').stop(true).fadeIn();
            $(this).children('ul').stop(true).fadeIn();
        },
        function(){
            //$(this).children('.x').stop(true).fadeOut();
            $(this).children('ul').delay(1000).fadeOut();
        }
    );

    $('.main-syc-nav > .x').click(function(){
        //$('.main-syc-nav').children('.x').stop(true).fadeOut();
        $('.main-syc-nav').children('ul').stop(true).fadeOut();
    })

    $('.main-syc-nav > ul > li').hoverIntent(
        function(){
            $(this).children('.sub-nav').fadeIn()
        },
        function(){
            $(this).children('.sub-nav').fadeOut()
        }
    );

    window.onscroll = function() {
        if(document.body.scrollTop == 0) {
            $('.syc-menu-image').stop().animate({width: '200px'})
        }else{
            $('.syc-menu-image').stop().animate({width: '100px'})
        }
    }
}
