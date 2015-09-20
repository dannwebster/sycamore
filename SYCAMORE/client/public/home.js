Template.home.events({
    'mouseenter .syc-home-image':function(event,template){
        var id = $(event.target).attr('id')

        $('.'+id+'-content').fadeIn();
    },
    'mouseleave .syc-home-image':function(event,template){
        var id = $(event.target).attr('id')
        $('.'+id+'-content').fadeOut();
    },
    'click .syc-home-image': function(){
        Router.go('/the-student-experience')
    },
    'click .syc-mobile-text': function(){
        Router.go('/the-student-experience')
    }
})
Template.home.rendered = function(){
    $('.syc-home-image').height($('.syc-home-image').width());

    var parent = $('.syc-home-image').height();
    var green = $('.green-text').innerHeight();
    var red = $('.red-text').innerHeight();
    var blue = $('.blue-text').innerHeight();

    var res = (parent - green) / 2
    var resr = (parent - red) / 2
    var resb = (parent - blue) / 2

    //$('#inf').append(parent+' - '+ green + ' / 2 = '+res)

    $('.green-text').css('top',res)
    $('.red-text').css('top',resr)
    $('.blue-text').css('top',resb)

    $('.syc-home-image > .content').hide();

    $(window).resize(function(evt) {
        $('.syc-home-image').height($('.syc-home-image').width());
    });
}
