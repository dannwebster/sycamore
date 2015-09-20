Router.map(function() {
    //HOMEPAGE
    this.route('roster', {
        path: '/roster',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
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

    this.route('familyTree', {
        path: '/familytree',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
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
});
