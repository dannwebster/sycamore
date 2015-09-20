Router.map(function() {
    this.route('forum', {
        path: '/forum',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('myForumTopics',Meteor.userId()),
                Meteor.subscribe('myForumSubscriptions',Meteor.userId()),
                Meteor.subscribe('popularForumTopics')
            ];
        },
        data: function (){
            var subs = ForumSubscribers.find({user: Meteor.userId()}).fetch();
            var subsearch = new Array();
            _.each(subs, function(sub){
                subsearch.push(sub.topic)
            })
            templateData = {
                //myTopics: ForumTopics.find({composer: Meteor.userId()},{sort: {last_post: -1}}),
                myTopics: ForumTopics.find({ $or: [ { composer: Meteor.userId() }, { _id: {$in: subsearch} } ] },{sort: {last_post: -1}}),
                popular: ForumTopics.find({},{sort: {subscribers: -1, last_post: -1}}),
                latest: ForumTopics.find({},{sort: {created: -1}})
            };
            return templateData;
        },
        onBeforeAction: function () {
            if(!Meteor.user()) {
                this.render('accessDenied')
            }else{
                this.next();
            }
        }
    });

    this.route('forumAll', {
        path: '/forum/all',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('popularForumTopics')
            ];
        },
        data: function (){
            templateData = {
                popular: ForumTopics.find({},{sort: {subscribers: -1, last_post: -1}})
            };
            return templateData;
        },
        onBeforeAction: function () {
            if(!Meteor.user()) {
                this.render('accessDenied')
            }else{
                this.next();
            }
        }
    });

    this.route('forumCompose', {
        path: '/forum/compose/:id',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('oneForumTopic',this.params.id),
                Meteor.subscribe('forumSubscribers',this.params.id)
            ];
        },
        data: function (){
            templateData = {
                topic: ForumTopics.findOne(this.params.id),
                subscribers: ForumSubscribers.find({topic: this.params.id}),
                subcount: ForumSubscribers.find({topic: this.params.id}).count()
            };
            return templateData;
        },
        onBeforeAction: function () {
            if(!Meteor.user()) {
                this.render('accessDenied')
            }else{
                this.next();
            }
        }
    });


    this.route('forumView', {
        path: '/forum/view/:id',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('oneForumTopic',this.params.id),
                Meteor.subscribe('forumSubscribers',this.params.id),
                Meteor.subscribe('schoolRoster')
            ];
        },
        data: function (){
            templateData = {
                topic: ForumTopics.findOne(this.params.id),
                subscribers: ForumSubscribers.find({topic: this.params.id}),
                subcount: ForumSubscribers.find({topic: this.params.id}).count()
            };
            return templateData;
        },
        onBeforeAction: function () {
            if(!Meteor.user()) {
                this.render('accessDenied')
            }else{
                this.next();
            }
        }
    });

    this.route('forumEdit', {
        path: '/forum/edit/:id',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('oneForumTopic',this.params.id),
                Meteor.subscribe('forumSubscribers',this.params.id),
                Meteor.subscribe('schoolRoster')
            ];
        },
        data: function (){
            templateData = {
                topic: ForumTopics.findOne(this.params.id),
                subscribers: ForumSubscribers.find({topic: this.params.id}),
                subcount: ForumSubscribers.find({topic: this.params.id}).count()
            };
            return templateData;
        },
        onBeforeAction: function () {
            if(!Meteor.user()) {
                this.render('accessDenied')
            }else{
                this.next();
            }
        }
    });

});
