Router.map(function() {
    //HOMEPAGE
    this.route('settings', {
        path: '/settings',
        layoutTemplate: 'backend-layout',
        onBeforeAction: function () {
            if(!Meteor.userId()) {
                this.render('accessDenied')
            }else{
                this.next();
            }
        }
    });
});
