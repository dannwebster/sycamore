Meteor.startup(function(){
  Router.map(function() {
    this.route('/verify-email/:token', {
      template: 'fastProfileVerifyEmail',
      data: function (){
        templateData = {
          token: this.params.token
        };
        return templateData;
      },
    });
  });
});