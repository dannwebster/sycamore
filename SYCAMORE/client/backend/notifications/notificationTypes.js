Template.notificationTypes.helpers({
    'page': function(){
        var type = this.type;
        var page = {}
        if(type==='drafts'){        page.drafts = true;     }
        if(type==='sent'){        page.sent = true;     }
        if(type==='archived'){        page.archived = true;     }
        if(type==='starred'){        page.starred = true;     }

        return page;
    },
    notifications: function(){
        return Notifications.find({},{sort: {created: -1, sendDate: -1}})
    }
});

Template.notificationTypeView.helpers({
    notifications: function(){
        return Notifications.find({},{sort: {created: -1, sendDate: -1}})
    }
})
