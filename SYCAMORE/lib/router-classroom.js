Router.map(function() {
  this.route('classrooms', {
    path: '/classroom',
    layoutTemplate: 'backend-layout',
    onBeforeAction: function () {
      if(!Meteor.user()) {
        this.render('accessDenied')
      }else{
        this.next();
      }
    }
  });

});
