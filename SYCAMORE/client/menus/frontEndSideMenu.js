Template.frontEndSideMenu.helpers({
    'whatPage': function(){
        var pageGroups = [
                {group: 'about', page: 'our-vision-for-education'},
                {group: 'about', page: 'the-school'},
                {group: 'about', page: 'leadership-team'},
                {group: 'experience', page: 'the-student-experience'},
                {group: 'experience', page: 'recent-events'},
                {group: 'experience', page: 'life-at-sycamore'},
                {group: 'experience', page: 'activities-at-sycamore'},
                {group: 'experience', page: 'the-sycamore-difference'},
                {group: 'parents', page: 'events'},
                {group: 'parents', page: 'after-school'},
                {group: 'parents', page: "what's-for-lunch"},
                {group: 'parents', page: 'practical-and-safety-information'},
                {group: 'parents', page: 'login'},
                {group: 'involved', page: 'donate'},
                {group: 'involved', page: 'volunteer'},
                {group: 'involved', page: 'suggest-a-field-trip'},
                {group: 'apply', page: 'application-information'},
                {group: 'apply', page: 'financial-aid'},
                {group: 'apply', page: 'apply'},
                {group: 'news', page: 'blog'},
                {group: 'news', page: 'the-sycamore-blog'},
                {group: 'news', page: 'subscribe'},
                {group: 'news', page: 'sycamore-in-the-news'}
        ]

        _.each(pageGroups,function(page){
            var group = page.group;
            if(Router.current().params.page_name == page.page){

                if(Session.get('currentPageGroup')!=group){
                    Session.set('currentPageGroup',group)
                    //$('.fesmitem > ul').hide();
                    $('#'+page.group+' > ul').show();
                }else{
                    $('#'+page.group+' > ul').show();
                }
                $('li[href$="/'+page.page+'"]').addClass('active')
                Session.set('currentPageGroup',group)
                return Session.get('currentPageGroup')
            }else{
                if(Iron.Location.get().path == '/blog' || Iron.Location.get().path == '/newsletter/subscribe'){
                    if(Session.get('currentPageGroup')!='news'){
                        Session.set('currentPageGroup','news')
                        //$('.fesmitem > ul').hide();
                        $('#news > ul').show();
                    }else{
                        $('#news > ul').show();
                    }
                    $('li[href$="'+Iron.Location.get().path+'"]').addClass('active')
                    Session.set('currentPageGroup','news')
                    return Session.get('currentPageGroup')
                }
            }
        })
    }
})
Template.frontEndSideMenu.events({
    'click .fesmitem': function(event,template){
        $('.fesmitem').children('ul').hide();
        $(event.target).children('ul').show();

    },
    'click .link': function(event,template){
        $('.fesmitem > ul > .link').removeClass('active')
        $(event.target).addClass('active');

    },
})
Template.frontEndSideMenu.rendered = function(){

    $('li.link').click(function(){
        var link = $(this).attr('href')
        Meteor.subscribe('pageViews','single','page',link,{
            onReady: function () { Router.go(link) },
            onError: function () { Router.go(link) }
        })
    })
}
