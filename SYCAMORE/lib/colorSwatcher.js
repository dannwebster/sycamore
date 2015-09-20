var routeStyles = new Array();
routeStyles['notifications'] = {    bg: '#e2f1ee',      menu: '#a1dbe0',        font: '#49c3cc',    hover: '#6dcdd2',    tree: 'tree-blue'   }
routeStyles['calendar'] = {    bg: '#ffffef',      menu: '#faeb82',        font: '#f0d200',    hover: '#e3c700',    tree: 'tree-yellow'   }
routeStyles['home'] = {         bg: '#fff2df',      menu: '#f9c488',        font: '#ec6645',    hover: '#f1967e',   tree: 'tree-orange' }
routeStyles['default'] = {         bg: '#eeeeee',      menu: '#cecece',        font: '#222222',    hover: '#333333',   tree: 'tree-grey' }
routeStyles['forum'] = {         bg: '#faf3fc',      menu: '#e1cbe7',        font: '#ca8edb',    hover: '#ca8edb',   tree: 'tree-purple' }
routeStyles['messages'] = {   bg: '#e2f1ee',    menu: '#a1dbe0',    font: '#49c3cc',    hover: '#6dcdd2',   tree: 'tree-blue' }
routeStyles['projects'] = {    bg: '#d7e4ce',    menu: '#B6D1A5',    font: '#77a65a',    hover: '#92c075',  tree: 'tree-green' }

routeStyles['page'] = {    bg: '#e3edee',    menu: '#f9c488',    font: '#ec6645',    hover: '#f1967e'}

colorSwatch = function(route){

    if(ActiveRoute.path(/^\/dash/)){
        $('.mm').removeClass('active');
        $('#mm-home').addClass('active');
        var style = routeStyles['home'];
    }else if(ActiveRoute.name(/^noti/)){
        $('.mm').removeClass('active');
        $('#mm-notifications').addClass('active');
        var style = routeStyles['notifications'];
    }else if(ActiveRoute.path(/^\/cal/)){
        $('.mm').removeClass('active');
        $('#mm-calendar').addClass('active');
        var style = routeStyles['calendar'];
    }else if(ActiveRoute.name(/^fam/) || ActiveRoute.name(/^roster/) || ActiveRoute.path(/^\/invites/)){
        $('.mm').removeClass('active');
        $('#mm-family').addClass('active');
        var style = routeStyles['default'];
    }else if(ActiveRoute.name(/^settings/)){
        $('.mm').removeClass('active');
        $('#mm-settings').addClass('active');
        var style = routeStyles['default'];
    }else if(ActiveRoute.path(/^\/forum/)){
        $('.mm').removeClass('active');
        $('#mm-forum').addClass('active');
        var style = routeStyles['forum'];
    }else if(ActiveRoute.path(/^\/message/)){
        $('.mm').removeClass('active');
        $('#mm-messages').addClass('active');
        var style = routeStyles['messages'];
    }else if(ActiveRoute.path(/^\/project/)){
        $('.mm').removeClass('active');
        $('#mm-project').addClass('active');
        var style = routeStyles['projects'];
    }else if(ActiveRoute.path(/^\/page/)){
        $('.mm').removeClass('active');
        $('#mm').addClass('active');
        var style = routeStyles['page'];
    }else if(ActiveRoute.path(/^\/signup/)){
        $('.mm').removeClass('active');
        var style = routeStyles['default'];
    }else if(ActiveRoute.path(/^\/page\/manage/)){
        $('#mm-home').addClass('active');
        $('.mm').removeClass('active');
        var style = routeStyles['home'];
    }else if(ActiveRoute.path(/^\/blog\/manage/)){
        $('#mm-home').addClass('active');
        $('.mm').removeClass('active');
        var style = routeStyles['home'];
    }else{
        $('.mm').removeClass('active');
        var style = routeStyles['default'];
    }

    var ease = {
        type: 'easeInOutQuart',
        time: 250
    }

    //MANAGE THE TREE color
    if(!$('.active-tree').hasClass(style.tree)){
        $('.active-tree').removeClass('active-tree')
        $('.tree-logo').hide()
        $('.'+style.tree).fadeIn(ease.time,ease.type).addClass('active-tree')
    }

    $('body').clearQueue().animate({backgroundColor: style.bg},ease.time,ease.type)
    $('.nav-bg-bar').clearQueue().animate({backgroundColor: style.menu},ease.time,ease.type)
    $('.sidebar-nav .navbar').clearQueue().animate({backgroundColor: style.menu},ease.time,ease.type)
    $('.sidebar-nav .navbar li a').clearQueue().animate({backgroundColor: style.menu,color: style.font},ease.time,ease.type)

    $('.sidebar-nav .navbar li a:hover').clearQueue().animate({backgroundColor: style.hover},ease.time,ease.type)
    $('.sidebar-nav .navbar li a:focus').clearQueue().animate({backgroundColor: style.hover,color:'#fffff'},ease.time,ease.type)

    $('.sidebar-nav .navbar .active > a').clearQueue().animate({backgroundColor: style.hover,color: '#ffffff'},ease.time,ease.type)
    //$('.sidebar-nav .navbar .active > a').clearQueue().animate({backgroundColor: 'rgba(0,0,0,0.2)',color: style.font},ease.time,ease.type)


    $('.sidebar-nav .navbar li a .menu-text').clearQueue().animate({color:'#222'},ease.time,ease.type)
    $('.sidebar-nav .navbar li a .menu-text:hover').clearQueue().animate({color:'#fffff'},ease.time,ease.type)
    $('.sidebar-nav .navbar li a .menu-text:focus').clearQueue().animate({color:'#fffff'},ease.time,ease.type)
    $('.sidebar-nav .navbar .active > a > .menu-text').clearQueue().animate({color: '#ffffff'},ease.time,ease.type)

    $('.sidebar-nav .navbar li .border').clearQueue().animate({border: '1.5px solid '+style.font},ease.time,ease.type)



}
