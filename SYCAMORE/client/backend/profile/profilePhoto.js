Template.profileSnip.helpers({
    'snipid': function(){
        //return Math.floor(Math.random()*(max-min+1)+min);

        if(this.userid){
            var id = this.userid+'-'+moment().format('X')+'-'+Math.floor(Math.random()*(100-1+1)+1);
            return {
                id: id,
                mini: 'mini_'+id
            }
        }else{
            //console.log('00000000000000000000000000000000000000000')
            //console.log(this.user)
            var id = this.user._id+'-'+moment().format('X')+'-'+Math.floor(Math.random()*(100-1+1)+1);
            return {
                id: id,
                mini: 'mini_'+id
            }
        }
    },
    'user': function(){
        if(this.userid){
            return Meteor.users.findOne(this.userid);
        }else{
            return this.user
        }
    },
    'self': function(){
        if(this.userid == Meteor.userId()){
            return true
        }
    }
})
Template.profileSnip.events({
    'click .profileSnip': function(event,template){
        var id = event.currentTarget.id;
        var user = template.data.user;
        if(user._id == Meteor.userId()){
            Router.go('/profile/'+Meteor.userId())
        }
    },
    'click .hoverProfile': function(event,template){
        var user = template.data.user;
        console.log(user)
        Router.go('/profile/'+user._id)
    },
    'click .hoverMessage': function(event,template){
        var user = template.data.user;
        newPopupMessage(user);
    },
})

Template.familySnip.events({
    'click .familySnip': function(event,template){
        var id = event.currentTarget.id;
        var user = template.data.user;
        if(user._id == Meteor.userId()){
            Router.go('/profile/'+Meteor.userId())
        }else{
        var profile = template.data.user.profile;
        //console.log(id+'  ---  '+'#mini_'+id);
        var content = "<div class='row text-center'>"+
            "<div class='col-md-5 text-center'>"+
                "<div class='img-div' style='background-image: url("+profile.photo.secure_url+"); height:100px; width:100px'></div>"+
            "</div>"+
            "<div class='col-md-7'>"+
                "<a href='/profile/"+user._id+"' class='btn btn-info btn-lg btn-block'><i class='fa fa-user'></i> View Profile</a>"+
                "<a href='/messages' class='btn btn-lg btn-block btn-info'><i class='fa fa-envelope'></i> Direct Message</a>"+
            "</div>"+
        "</div>"
        bootbox.dialog({
            message: content,
            title: profile.firstname+' '+profile.lastname,
            onEscape: true
        })
    }
        //alert('clicked')
        //$('#mini_'+id).show(function(){
        //    alert('loaded');
        //    console.log('loaded');
        //});
        //$('.syc-menu-image').stop().animate({width: '200px'})
        //console.log('#mini_'+event.currentTarget.id)
    },
})


Template.addFamilySnip.events({
    'click .addFamilySnip': function(event,template){
        /*
        var id = event.currentTarget.id;
        var user = template.data.user;
        if(user._id == Meteor.userId()){
            Router.go('/profile/'+Meteor.userId())
        }else{
        var profile = template.data.user.profile;
        //console.log(id+'  ---  '+'#mini_'+id);
        var content = "<div class='row text-center'>"+
            "<div class='col-md-5 text-center'>"+
                "<div class='img-div' style='background-image: url("+profile.photo.secure_url+"); height:100px; width:100px'></div>"+
            "</div>"+
            "<div class='col-md-7'>"+
                "<a href='/profile/"+user._id+"' class='btn btn-info btn-lg btn-block'><i class='fa fa-user'></i> View Profile</a>"+
                "<a href='/messages' class='btn btn-lg btn-block btn-info'><i class='fa fa-envelope'></i> Direct Message</a>"+
            "</div>"+
        "</div>"
        bootbox.dialog({
            message: content,
            title: profile.firstname+' '+profile.lastname,
            onEscape: true
        })
        */
        //alert('clicked')
        //$('#mini_'+id).show(function(){
        //    alert('loaded');
        //    console.log('loaded');
        //});
        //$('.syc-menu-image').stop().animate({width: '200px'})
        //console.log('#mini_'+event.currentTarget.id)
    },
})
