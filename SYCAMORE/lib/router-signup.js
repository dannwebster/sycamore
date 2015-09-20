Router.map(function() {
    this.route('signupStep2', {
        path: '/signup/step/2',
        onBeforeAction: function (pause) {
            if (!Meteor.user()) {
                this.render('home');
            }else{
                this.next()
            }
        }
    });
    this.route('signupStep3', {
        path: '/signup/step/3',
        waitOn : function () {
            return [
                Meteor.subscribe('tempUsers',Meteor.userId()),
                Meteor.subscribe('schoolRoster')
            ];
        },
        onBeforeAction: function (pause) {
            if (!Meteor.user()) {
                this.render('home');
            }else{
                this.next()
            }
        }
    });

    this.route('signupComplete', {
        path: '/signup/complete',
        layoutTemplate: 'backend-layout',
        onBeforeAction: function (pause) {
            if (!Meteor.user()) {
                this.render('home');
            }else{
                this.next()
            }
        }
    });
    this.route('enrollAccount', {
        path: '/invitation/enroll-account/:token',
        data: function (){
            //delete Session.keys['familySearch']
            templateData = {
                token: this.params.token
            };
            return templateData;
        },
    });
});
