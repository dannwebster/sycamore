Template.newsletterSignup.events({
    'click #subscribe2': function(event,template){
        var name = $('#subname2').val();
        var email = $('#subemail2').val();
        //var mailChimp = new MailChimp(
        if(name && email){
            Meteor.call('subcribeNewsLetter',name,email)
            bootbox.alert('Thanks for signing up!')
            var name = $('#subname2').val('');
            var email = $('#subemail2').val('');
        }else{
            bootbox.alert('Please fill out all form fields.')
        }
    },
})

Template.newsletterSignup.rendered = function(){
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
    });

    $('.page-bg2').css('backgroundColor','#dce9ea')
    $('body').css('backgroundColor','#dce9ea')
}
