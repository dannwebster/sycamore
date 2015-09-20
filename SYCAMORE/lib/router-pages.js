Router.map(function() {
    this.route('frontSlider',{
        path: '/slider/manage',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('SliderImages')
            ];
        },
        data: function (){
            templateData = {
                slides: SliderImages.find({},{sort: { order: 1}})
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
    })
    this.route('pageManage', {
        path: '/page/manage/:view',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('contentViews','list','page',this.params.view)
            ];
        },
        data: function (){
            if(this.params.view==='drafts'){
                var stat = 'draft';
            }else{
                var stat = this.params.view;
            }
            templateData = {
                view: this.params.view,
                type: 'page',
                rootPath: 'pageManage',
                title: 'Page',
                pluralTitle: 'Pages',
                posts: Blog.find({type:  getType('page'),status: stat},{sort: {url: 1}}).fetch()
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

    this.route('pageCompose', {
        path: '/page/compose/:id',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('contentViews','single','page',this.params.id)
            ];
        },
        data: function (){
            templateData = {
                type: 'page',
                post: Blog.findOne(this.params.id),
                rootPath: 'pageManage',
                title: 'Page',
                pluralTitle: 'Pages',
                crumbs: [
                    {path: '/dashboard', text: 'Dashboard'},
                    {path: '/page/manage/', text: 'Pages'},
                    {path: '/page/compose/'+this.params.id, text: 'New Page'}
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

    this.route('pageEdit', {
        path: '/page/edit/:id',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('contentViews','single','page',this.params.id)
            ];
        },
        data: function (){
            templateData = {
                type: 'page',
                post: Blog.findOne(this.params.id),
                rootPath: 'pageManage',
                title: 'Page',
                pluralTitle: 'Pages',
                crumbs: [
                    {path: '/dashboard', text: 'Dashboard'},
                    {path: '/page/manage/', text: 'Pages'},
                    {path: '/page/edit/'+this.params.id, text: 'Edit Page'}
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
