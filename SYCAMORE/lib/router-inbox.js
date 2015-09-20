Router.map(function() {
    this.route('messages', {
        path: '/messages',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('schoolRoster'),
                Meteor.subscribe('MyConversations',Meteor.userId())
            ];
        },
        onBeforeAction: function () {
            if(!Meteor.user()) {
                this.render('accessDenied')
            }else{
                this.next();
            }
        }
    });

    this.route('messageView', {
        path: '/message/:id',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('schoolRoster'),
                Meteor.subscribe('Chats',this.params.id),
                Meteor.subscribe('MyConversations',Meteor.userId())
            ];
        },
        data: function(){
            var templateData = {
                convo: this.params.id
            }
            return templateData
        },
        onBeforeAction: function () {
            if(!Meteor.user()) {
                this.render('accessDenied')
            }else{
                this.next();
            }
        }
    });

    this.route('messageCompose', {
        path: '/messages/compose',
        layoutTemplate: 'backend-layout',
        waitOn : function () {
            return [
                Meteor.subscribe('schoolRoster'),
                Meteor.subscribe('MyConversations',Meteor.userId())
            ];
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
