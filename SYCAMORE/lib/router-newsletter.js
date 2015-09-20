Router.map(function() {
    this.route('newsletterManage', {
        path: '/newsletter/manage/:view',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('contentViews','list','newsletter',this.params.view)
            ];
        },
        data: function (){
            templateData = {
                view: this.params.view,
                type: 'newsletter',
                rootPath: 'newsletterManage',
                title: 'Newsletter',
                pluralTitle: 'Newsletters',
                posts: Blog.find({type: getType('newsletter')}).fetch(),
                crumbs: [
                    {path: '/dashboard', text: 'Dashboard'},
                    {path: '/newsletter/manage/'+this.params.view, text: this.params.view+' Newsletters'}
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

    this.route('newsletterCompose', {
        path: '/newsletter/compose/:id',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('contentViews','single','newsletter',this.params.id)
            ];
        },
        data: function (){
            templateData = {
                type: 'newsletter',
                post: Blog.findOne(this.params.id),
                rootPath: 'newsletterManage',
                title: 'Newsletter',
                pluralTitle: 'Newsletters',
                crumbs: [
                    {path: '/dashboard', text: 'Dashboard'},
                    {path: '/newsletter/manage/', text: 'Newsletters'},
                    {path: '/newsletter/compose/'+this.params.id, text: 'New Newsletter'}
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

    this.route('newsletterEdit', {
        path: '/newsletter/edit/:id',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('contentViews','single','newsletter',this.params.id)
            ];
        },
        data: function (){
            templateData = {
                type: 'newsletter',
                post: Blog.findOne(this.params.id),
                rootPath: 'newsletterManage',
                title: 'Newsletter',
                pluralTitle: 'Newsletters',
                crumbs: [
                    {path: '/dashboard', text: 'Dashboard'},
                    {path: '/newsletter/manage/', text: 'Newsletters'},
                    {path: '/newsletter/edit/'+this.params.id, text: 'Edit Newsletter'}
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
