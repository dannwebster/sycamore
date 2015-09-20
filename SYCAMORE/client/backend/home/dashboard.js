Template.allHome.rendered = function(){
    //FIX THE ISSUE ON HOMEPAGE COLOR LOADS
    Meteor.setTimeout(colorSwatch(Router.current().route.getName()),1500);
}
