Router.map(function() {
    this.route('blogManage', {
        path: '/blog/manage/:view',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('contentViews','list','blog',this.params.view)
            ];
        },
        data: function (){
            templateData = {
                view: this.params.view,
                type: 'blog',
                rootPath: 'blogManage',
                title: 'Blog Post',
                pluralTitle: 'Blog Posts',
                posts: Blog.find({type: getType('blog')}).fetch()
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

    this.route('blogCompose', {
        path: '/blog/compose/:id',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('contentViews','single','blog',this.params.id)
            ];
        },
        data: function (){
            templateData = {
                type: 'blog',
                post: Blog.findOne(this.params.id),
                rootPath: 'blogManage',
                title: 'Blog Post',
                pluralTitle: 'Blog Posts',
                crumbs: [
                    {path: '/dashboard', text: 'Dashboard'},
                    {path: '/manage/'+this.params.type+'/', text: this.params.type+' Posts'},
                    {path: '/manage/new/'+this.params.type+'/'+this.params.id, text: 'New '+this.params.type+' Post'}
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

    this.route('blogEdit', {
        path: '/blog/edit/:id',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('contentViews','single','blog',this.params.id)
            ];
        },
        data: function (){
            templateData = {
                type: 'blog',
                post: Blog.findOne(this.params.id),
                rootPath: 'blogManage',
                title: 'Blog Post',
                pluralTitle: 'Blog Posts',
                crumbs: [
                    {path: '/dashboard', text: 'Dashboard'},
                    {path: '/manage/'+this.params.type+'/', text: this.params.type+' Posts'},
                    {path: '/manage/new/'+this.params.type+'/'+this.params.id, text: 'New '+this.params.type+' Post'}
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


    this.route('blogList', {
        path: '/blog',
        layoutTemplate: function(){
            if(Meteor.Device.isDesktop()){
                return 'pageLayout';
            }else{
                return 'pageLayoutMobile';
            }
        },
        waitOn : function () {
            return [
                Meteor.subscribe('contentViews','list','blog','live')
            ];
        },
        data: function (){
            templateData = {
                posts: Blog.find({type: getType('blog')},{sort: {created: 1}}),
                page: {
                    status: 'live'
                }
            };
            return templateData;
        },
        yieldTemplates: {
            'blogList': {       to: 'main'},
            'blogHeader': { to: 'header'}
        }
    });

    this.route('blogView', {
        path: '/blog/:id',
        layoutTemplate: function(){
            if(Meteor.Device.isDesktop()){
                return 'pageLayout';
            }else{
                return 'pageLayoutMobile';
            }
        },
        waitOn : function () {
            return [
                Meteor.subscribe('contentViews','single','blog',this.params.id)
            ];
        },
        data: function (){
            templateData = {
                post: Blog.findOne(this.params.id),
                page: {
                    status: 'live'
                }
            };
            return templateData;
        },
        yieldTemplates: {
            'blogView': {       to: 'main'},
            'blogHeader': { to: 'header'}
        }
    });
});
