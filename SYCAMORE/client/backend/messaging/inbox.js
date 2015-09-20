Template.messages.helpers({
    'userlist': function(){
        var users = new Array();
        _.each(Meteor.users.find().fetch(), function(user) {
            if(user.profile.firstname){
                users.push({id: user._id, name: user.profile.firstname+' '+user.profile.lastname})
            }
            if(user.emails){
                if(user.emails[0].address){
                    users.push({id: user._id, name: user.emails[0].address})
                }
            }
        });
        return users
    },
    'unread': function(){
        var convos = MyConversations.find({user: Meteor.userId()});
        var sum;
        _.each(convos.fetch(),function(unread){
                sum += unread.unreadCount;
        })
        console.log(sum)
        return sum
    }
})
Template.messageCompose.helpers({
    'userlist': function(){
        var users = new Array();
        _.each(Meteor.users.find().fetch(), function(user) {
            if(user.profile.firstname && user._id != Meteor.userId()){
                users.push({id: user._id, name: user.profile.firstname+' '+user.profile.lastname})
            }
            if(user.emails && user._id != Meteor.userId()){
                if(user.emails[0].address){
                    users.push({id: user._id, name: user.emails[0].address})
                }
            }
        });
        return users
    },
    'unread': function(){
        var convos = MyConversations.find({user: Meteor.userId()});
        var sum;
        _.each(convos.fetch(),function(unread){
                sum += unread.unreadCount;
        })
        console.log(sum)
        return sum
    }
})
Template.messageCompose.rendered = function(){
    $('.chatHolder').height($(window).height()-500)
    $('.convoListHolder').height($(window).height()-250)
}
Template.messages.rendered = function(){
    var h = $(document).height();
    $('#chathubHub').height(h-200);
    $('#ME_CONVERSATION').height(h-220);
    $('#MECLIST').height(h-220);


    Meteor.subscribe('Conversations',Meteor.userId());
    var firstPost = Conversations.findOne({users: Meteor.userId()},{sort: { last_post: -1}});
    if(firstPost){
        Router.go('messageView',{ id: firstPost._id})
    }
}
Template.messageView.rendered = function(){
    $('.chatHolder').height($(window).height()-500)
    $('.convoListHolder').height($(window).height()-250)


    Meteor.call('resetMyConvo',this.data.convo,Meteor.userId())

    //SET THE INITIAL SCROLL position
    $('.chatHolder').scrollTop($('.chatHolder > div').innerHeight());
    Session.set('SC_position', $('.chatHolder').scrollTop());
    Session.set('SC_last_height', $('.chatHolder > div').innerHeight())

    //THEN once every 3 seconds
    scrollMe3('.chatHolder');
    Meteor.setInterval(function(){scrollMe3('.chatHolder');}, 3000);

}

Template.messageView.events({
    'click .addChat': function(event,template){
        //$('.chatHolder').scrollTop($('.chatHolder > div').innerHeight());
        $('.chatHolder').animate({ scrollTop: $('.chatHolder > div').innerHeight()   });
    },
    'click .newMessageIndicator': function(event,template){
        //$('.chatHolder').scrollTop($('.chatHolder > div').innerHeight());
        $('.chatHolder').animate({ scrollTop: $('.chatHolder > div').innerHeight()   });
        $('.newMessageIndicator').fadeOut();
    },
})

Template.messageView.helpers({
    'users_names': function(){
        var convo = Conversations.findOne(this.convo);
        var users = convo.users;
        var names;
        var count = 0;
        var total = users.length;
        _.each(users,function(user){
            count++;
            var account = Meteor.users.findOne(user);
            if(user != Meteor.userId()){
                if(account.profile.firstname != undefined){
                    names += ' '+account.profile.firstname;
                }if(account.profile.lastname != undefined){
                    names += ' '+account.profile.lastname;
                }
                if(total > count){
                    names += ','
                }
            }


        })
        return names.replace("undefined", "");
    },
    'unread': function(){
        var convos = MyConversations.find({user: Meteor.userId()});
        var sum;
        _.each(convos.fetch(),function(unread){
                sum += unread.unreadCount;
        })
        console.log(sum)
        return sum
    }
})
