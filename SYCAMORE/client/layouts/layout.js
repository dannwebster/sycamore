Template.backendLayout.helpers({
    'screensize': function(){
        return $( window ).width()+ ' x '+$( window ).height();
    }
})
Template.coverMe.rendered = function(){
    var win = $('.coverMe' ).height();
    var pic = $('#cosoon').height();

    $('#cosoon').css('top', (win-pic)/2 +'px')

    var pw = Router.current().params.query.pw
    if(pw && pw == 'prelaunch'){
        Session.set('prelaunch', true)
    }

    if(Session.get('prelaunch')){
        $('.coverMe').hide();
    }
}
