Router.map(function() {
  this.route('pressManage', {
    path: '/press/manage/:view',
    layoutTemplate: 'backend-layout',
    waitOn : function () {
      return [
        Meteor.subscribe('contentViews','list','press',this.params.view)
      ];
    },
    data: function (){
      templateData = {
        view: this.params.view,
        type: 'press',
        rootPath: 'pressManage',
        title: 'Press Release',
        pluralTitle: 'Press Releases',
        posts: Blog.find({type: getType('press')}).fetch(),
        crumbs: [
          {path: '/dashboard', text: 'Dashboard'},
          {path: '/press/manage/'+this.params.view, text: this.params.view+' Press Releases'}
        ]
      };
      return templateData;
    },
    onBeforeAction: function (pause) {
      var loggedInUser = Meteor.user();
      if (!loggedInUser) {
        this.render('loginRequired')
      }else if(!Roles.userIsInRole(loggedInUser, ['educator'])){
        this.render('accessDenied')
      }else{
        this.next()
      }
    }
  });

  this.route('pressCompose', {
    path: '/press/compose/:id',
    layoutTemplate: 'backend-layout',
    waitOn : function () {
      return [
        Meteor.subscribe('contentViews','single','press',this.params.id)
      ];
    },
    data: function (){
      templateData = {
        type: 'press',
        post: Blog.findOne(this.params.id),
        rootPath: 'pressManage',
        title: 'Press Release',
        pluralTitle: 'Press Releases',
        crumbs: [
          {path: '/dashboard', text: 'Dashboard'},
          {path: '/press/manage/', text: 'Press Releases'},
          {path: '/press/compose/'+this.params.id, text: 'New Press Release'}
        ]
      };
      return templateData;
    },
    onBeforeAction: function (pause) {
      var loggedInUser = Meteor.user();
      if (!loggedInUser) {
        this.render('loginRequired')
      }else if(!Roles.userIsInRole(loggedInUser, ['educator'])){
        this.render('accessDenied')
      }else{
        this.next()
      }
    }
  });

  this.route('pressEdit', {
    path: '/press/edit/:id',
    layoutTemplate: 'backend-layout',
    waitOn : function () {
      return [
        Meteor.subscribe('contentViews','single','press',this.params.id)
      ];
    },
    data: function (){
      templateData = {
        type: 'press',
        post: Blog.findOne(this.params.id),
        rootPath: 'pressManage',
        title: 'Press Release',
        pluralTitle: 'Press Releases',
        crumbs: [
          {path: '/dashboard', text: 'Dashboard'},
          {path: '/press/manage/', text: 'Press Releases'},
          {path: '/press/edit/'+this.params.id, text: 'Edit Press Release'}
        ]
      };
      return templateData;
    },
    onBeforeAction: function (pause) {
      var loggedInUser = Meteor.user();
      if (!loggedInUser) {
        this.render('loginRequired')
      }else if(!Roles.userIsInRole(loggedInUser, ['educator'])){
        this.render('accessDenied')
      }else{
        this.next()
      }
    }
  });
});
