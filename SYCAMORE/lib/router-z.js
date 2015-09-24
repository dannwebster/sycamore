Router.map(function() {
    this.route('contactForm', {
        path: '/contact',
        layoutTemplate: 'homeLayout'
    });

    this.route('studentApplication', {
        path: '/apply',
        layoutTemplate: 'homeLayout'
    });

    this.route('newsletterSignup', {
        path: '/newsletter/subscribe',
        layoutTemplate: 'homeLayout'
    });

    /*this.route('frontCalendar', {
        path: '/events',
        layoutTemplate: 'wide-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('allPages'),
                Meteor.subscribe('adminEvents',12345),
                Meteor.subscribe('publicEvents')
            ];
        }
    });
    */
    this.route('page', {
        path: '/:page_name',
        layoutTemplate: function(){
            if(Meteor.Device.isDesktop()){
                return 'pageLayout';
            }else{
                return 'pageLayoutMobile';
            }
        },
        waitOn : function () {
            return [
                Meteor.subscribe('allPages'),
                Meteor.subscribe('publicEvents')
            ];
        },
        data: function (){
            templateData = {
                page: Blog.findOne({url: this.params.page_name}),
                page_name: this.params.page_name
            };

            templateData.events = getMyEvents2();
            
            return templateData;
        },
        yieldTemplates: {
            'page': {       to: 'main'},
            'pageHeader': { to: 'header'}
        }
    });

});

Router.onBeforeAction('loading');

Router.onAfterAction(function(){
    colorSwatch(Router.current().route.getName())
})

Router._filters = {
    resetScroll: function () {
        var scrollTo = window.currentScroll || 0;
        $('body').scrollTop(scrollTo);
        $('body').css("min-height", 0);
    }
};

var filters = Router._filters;

if(Meteor.isClient) {
    Router.onAfterAction(filters.resetScroll); // for all pages
}
