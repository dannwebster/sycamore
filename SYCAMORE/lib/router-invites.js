Router.map(function() {
    this.route('invitationList', {
        path: '/invites',
        layoutTemplate: 'backend-layout',
        onBeforeAction: function () {
            if(!Roles.userIsInRole(Meteor.userId(),'educator')) {
                this.render('accessDenied')
            }else{
                this.next();
            }
        }
    });
});
