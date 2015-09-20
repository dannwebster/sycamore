Router.map(function() {
  this.route('announcementManage', {
    path: '/announcement/manage/:view',
    layoutTemplate: 'backend-layout',
    waitOn : function () {
      return [
        Meteor.subscribe('contentViews','list','announcement',this.params.view)
      ];
    },
    data: function (){
      templateData = {
        view: this.params.view,
        type: 'announcement',
        rootPath: 'announcementManage',
        title: 'Announcement',
        pluralTitle: 'Announcements',
        posts: Blog.find({type: getType('announcement')}).fetch(),
        crumbs: [
          {path: '/dashboard', text: 'Dashboard'},
          {path: '/announcement/manage/'+this.params.view, text: this.params.view+' Announcements'}
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

  this.route('announcementCompose', {
    path: '/announcement/compose/:id',
    layoutTemplate: 'backend-layout',
    waitOn : function () {
      return [
        Meteor.subscribe('contentViews','single','announcement',this.params.id)
      ];
    },
    data: function (){
      templateData = {
        type: 'announcement',
        post: Blog.findOne(this.params.id),
        rootPath: 'announcementManage',
        title: 'Announcement',
        pluralTitle: 'Announcements',
        crumbs: [
          {path: '/dashboard', text: 'Dashboard'},
          {path: '/announcement/manage/', text: 'Anouncements'},
          {path: '/announcement/compose/'+this.params.id, text: 'New Announcement'}
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

  this.route('announcementEdit', {
    path: '/announcement/edit/:id',
    layoutTemplate: 'backend-layout',
    waitOn : function () {
      return [
        Meteor.subscribe('contentViews','single','announcement',this.params.id)
      ];
    },
    data: function (){
      templateData = {
        type: 'announcement',
        post: Blog.findOne(this.params.id),
        rootPath: 'announcementManage',
        title: 'Announcement',
        pluralTitle: 'Announcements',
        crumbs: [
          {path: '/dashboard', text: 'Dashboard'},
          {path: '/announcement/manage/', text: 'Announcements'},
          {path: '/announcement/edit/'+this.params.id, text: 'Edit Announcement'}
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
