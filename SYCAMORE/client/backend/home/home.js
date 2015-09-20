Template.allHome.helpers({
    'notification': function(){
        Meteor.subscribe('topNotifications',Meteor.userId())
        var noti = Notifications.findOne();
        if(noti){
            return noti
        }else{
            return {
                title: 'Notifications Box',
                content: 'Important notifications will appear here. You can also click the "view all" button or the Notifications Tab on the left to see all of your notifications'
            }
        }
    },
    'notifications': function(){
        Meteor.subscribe('educatorNotifications',Meteor.userId())
        var noti = Notifications.find({},{sort: {created: -1}});
        //console.log(noti.fetch())
        return noti
    },
    'projects': function(){
        Meteor.subscribe('projectLimitCount',1,Meteor.userId(),8)
        var projects = Projects.find({},{sort: {due: 1}});
        return projects
    },
    'mainAlert': function(){
        var settings = AppSettings.findOne();
        if(settings.alert===''){
            return false
        }else{
            return settings.alert;
        }
    },
    'emergencyInfo': function(){
        return Blog.findOne({title: 'Safety Information'})
    }
})

Template.allHome.events({
    'click .newProject': function(event,template){
        if(Roles.userIsInRole(Meteor.userId(),'educator')){
            Meteor.call('addProject',Meteor.userId(),function(error,result){
                if( error ){
                    console.log(error)
                }else{
                    console.log(result)
                    Router.go('projectEdit',{id: result})
                }
            })
        }
    },
    'click .notification-link': function(event,template){
        Router.go('notificationView',{id: event.currentTarget.id})
    },
    'click .practicalInfo': function(event,template){
        var blog = Blog.findOne({url: 'practical-and-safety-information'});
        bootbox.dialog({
            title: "Practical and Safety Information",
            message: blog.content
        });
    }
})

Template.allHome.rendered = function(){
    //matchHeight();
    Meteor.setTimeout(matchHeight(), 1500);
    colorSwatch(Router.current().route.getName());
}
/*
Template.allHome.rendered = function(){
var tour = {
id: "hello-sycamore",
steps: [
{
title: "Welcome to Sycamore",
content: "This quick tour will show you around the dasboard.",
target: "header",
placement: "right"
},
{
title: "Notifications",
content: "The latest and most important notifications will show up here.",
target: '#mainnotification',
placement: "bottom"
},
{
title: "Projects",
content: "The project list will let you view your childs progress.",
target: '#projectlist',
placement: "bottom"
},
{
title: "Notifications",
content: "Here you'll see the full list of current notifications",
target: '#notilist',
placement: "bottom"
},
{
title: "Messages",
content: "And finally, your messages box will show your latest discussions.",
target: '#messagelist',
placement: "bottom"
}
]
};

// Start the tour!
hopscotch.startTour(tour);
}
*/
