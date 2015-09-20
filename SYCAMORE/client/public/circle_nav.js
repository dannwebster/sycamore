
Template.circleNav.rendered = function(){
    $('.circle-item').hide();

    $('#kids_content').show();
    $('.slice').hover(function() {

        //NOT- hasClass() and addClass() and removeClass() don't work on SVGs so we'll use attr()

        //if slice is not active...
        if($(this).attr('class') == 'slice' ) {
            //Construct selector for corresponding content
            var dest = '#' + $(this).attr('id') + '_content';
            //Deactivate any active slice...
            $('.slice.active').attr('class', 'slice');
            //Activate this slice
            $(this).attr('class', 'slice active');

            //Hide existing content.
            $('.circle-item').fadeOut(100);

            //Fade in new content
            setTimeout(function() {
                $(dest).fadeIn(100);
            }, 100);

        }
    });
    $('#kids_content').fadeIn()
}

Template.circleNavOld.rendered = function(){
    $('.syc-path').mouseenter(
        function(){

            $('.syc-path').fadeTo(100,0.5);
            $(this).fadeTo(100,1);
            var id = $(this).attr('id')
            $('.noshow').hide(0,function(){
                $('#'+id+'_content').show();
            });
        }
    );

    $('.syc-main_circle_holder').height($('.syc-main_circle_holder').width());
    $('.syc-circ-treebox').height($('.syc-circ-treebox').width());

    $('#kids').fadeTo(100,1);
    $('#kids_content').fadeIn();

    $(window).resize(function(evt) {
        $('.syc-main_circle_holder').height($('.syc-main_circle_holder').width());
        $('.syc-circ-treebox').height($('.syc-circ-treebox').width());
    });
}
