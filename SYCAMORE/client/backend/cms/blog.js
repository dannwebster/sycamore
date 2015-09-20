Template.feBlogPost.helpers({
    'date': function(){
        return moment.unix(this.created).format('MMMM DDDo, YYYY')
    }
})
Template.blogHeader.helpers({
    'headerPic': function(){
        if(this.post){
            if(this.post.headerImage){
                return this.post.headerImage.secure_url
            }else{
                return 'https://s3-us-west-2.amazonaws.com/sycamore-la/pages/27562bf8-d7d5-4221-af4e-ee0a606d96e4.jpg'
            }
        }else{
            return 'https://s3-us-west-2.amazonaws.com/sycamore-la/pages/27562bf8-d7d5-4221-af4e-ee0a606d96e4.jpg'
        }
    }
})

Template.blogList.rendered = function(){

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

Template.blogView.rendered = function(){

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
