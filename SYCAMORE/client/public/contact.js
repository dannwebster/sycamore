
Template.contactForm.events({
    'click #sendmessage2': function(event,template){
        var name = $('#name2').val();
        var email = $('#email2').val();
        var message = $('#message2').val();
        if(name && email && message){
            Meteor.call('sendFormEmail',name,email,message,function(){
                $('#name2').val('');
                $('#email2').val('');
                $('#message2').val('');
                bootbox.alert('Thank you for your message!')
            })

        }else{
            bootbox.alert('Please fill out all form fields.')
        }
    },
})

Template.contactForm.rendered = function(){
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

    var data = {
        width: $('.infoholder').outerWidth(),
        height: $('#messageholder').outerHeight() - $('.infoholder').outerHeight() - 28
    }

    $('.MEinvite > .googlemap').width(data.width)

    $('.MEinvite > .googlemap').height(data.height)

    //$('.MEinvite > .mobilemap').width($('.MEinvite').width())
}
