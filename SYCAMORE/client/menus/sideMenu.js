Template.sideMenu.events({
    'click .logoutUser': function(){
        Meteor.logout(function(){
            Router.go('home')
        });
    }
})
Template.sideMenu.rendered = function(){
    var menu = $('.sidebar-nav').height();
    var doc = $(window).height();
    if(menu-doc > 0){
        var diff = menu-doc;

        window.onscroll = function() {
            if(document.body.scrollTop == 0) {
                $('.sidebar-nav').css({position:'absolute', top:'00px'})
            }else if(document.body.scrollTop > diff){
                console.log('mid')
                //alert(diff+ ' ---  '+(document.body.scrollTop + diff))
                $('.sidebar-nav').css({position:'absolute', top:'-'+diff+'px'})
            }else{
                console.log('last')
                $('.sidebar-nav').css({position:'absolute', top:'-'+document.body.scrollTop+'px'})
            }
        }

    }
}
