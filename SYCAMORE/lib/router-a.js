Router.configure({
	layoutTemplate: 'wide-layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	trackPageView: true,
	load: function() {
		$('html, body').animate({
			scrollTop: 0
		}, 400);
		$('.frontEndContent').hide().fadeIn(800);
		this.next()
	}
});
Router.map(function() {
	//HOMEPAGE
	this.route('home', {
		path: '/',
		layoutTemplate: 'homeLayout',
		waitOn : function () {
            return [
                Meteor.subscribe('homeContent'),
				Meteor.subscribe('SliderImages')
            ];
        },
        data: function (){
			getMyEvents2();
            templateData = {
                welcome: Blog.findOne({title: 'Z-HOME-WELCOME'}),
				continuous: Blog.findOne({title: 'Z-HOME-CONTINUOUS'}),
				engagement: Blog.findOne({title: 'Z-HOME-ENGAGEMENT-BASED'}),
				future: Blog.findOne({title: 'Z-HOME-FUTURE-FOCUSED'}),
				circle: Blog.findOne({title: 'Z-HOME-CIRCLE-NAV'}),
				slides: SliderImages.find({},{sort: { order: 1}})
            };
            return templateData;
        },
	});

});
