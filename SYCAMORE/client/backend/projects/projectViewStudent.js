Template.projectViewStudent.helpers({
    'duedate': function(){
        console.log(this.student)
        var data = {
            date: moment.unix(this.project.due).format("MMMM DD, YYYY")
        }
        if(moment().format('X') > this.due){
            data.class = 'text-danger'
        }
        return data
    },
    'myprogress': function(){
        if(Roles.userIsInRole(Meteor.userId(),'educator') || Roles.userIsInRole(Meteor.userId(),'superadmin')){
            var userdata = ProjectUsers.findOne({user: this.student._id, project: this.project._id});
            if(userdata.progress){
                return userdata.progress
            }else{
                return 0;
            }
        }
        if(Roles.userIsInRole(Meteor.userId(),'student')){
            var userdata = ProjectUsers.findOne({user: Meteor.userId(), project: this.project._id});
            if(userdata.progress){
                return userdata.progress
            }else{
                return 0;
            }
        }
        if(Roles.userIsInRole(Meteor.userId(),'parent')){
            var sum=0;
            var userdata = ProjectUsers.findOne({project: this.project._id, user: this.student._id });
            if(userdata.progress){
                return userdata.progress
            }else{
                return 0;
            }
        }
    },
    'projectUsers': function(){
        if(Roles.userIsInRole(Meteor.userId(),'educator')){
            return ProjectUsers.find({project: this.project._id});
        }
    },
    'educator': function(){
        if(Roles.userIsInRole(Meteor.userId(),'educator') || Roles.userIsInRole(Meteor.userId(),'superadmin')){
            return true
        }
    },
    'chatid': function(){
        return this.student._id+'_'+this.project._id
    }
})

Template.projectViewStudent.events({
    'click .progress': function(event,template){
        if(Roles.userIsInRole(Meteor.userId(),'student')){
            var position = getClickPosition(event)
            var parentwidth = $('.progress').width();

            var progress = Math.round((position.left / parentwidth)*100);
            if(progress <= 10){                     prog = 0;        }
            if(progress > 10 && progress <= 30){    prog = 20;   }
            if(progress > 30 && progress <= 50){    prog = 40;   }
            if(progress > 50 && progress <= 70){    prog = 60;   }
            if(progress > 70 && progress <= 90){    prog = 80;   }
            if(progress > 90){    prog = 100;   }
            var userdata = ProjectUsers.findOne({user: Meteor.userId(), project: template.data.project._id});

            $('.progress-bar.progressProject').width(prog+'%');
            if(Roles.userIsInRole(Meteor.userId(),'student')){
                ProjectUsers.update(userdata._id,{$set: {progress: prog}})
            }
        }
    },
    'click .closeConvo': function(event,template){
        //Router.go();
    },
    'click .percent': function(event,template){
        if(Roles.userIsInRole(Meteor.userId(),'student')){
            var userdata = ProjectUsers.findOne({user: Meteor.userId(), project: template.data.project._id});

            var percent = event.currentTarget.getAttribute("name")
            $('.progress-bar.progressProject').width(Number(percent)+'%')
            ProjectUsers.update(userdata._id,{$set: {progress: Number(percent)}});
        }
    },
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

Template.projectViewStudent.rendered = function(template){
    $('.chatHolder').height($(window).height() - 450)

    //SET THE INITIAL SCROLL position
    $('.chatHolder').scrollTop($('.chatHolder > div').innerHeight());
    Session.set('SC_position', $('.chatHolder').scrollTop());
    Session.set('SC_last_height', $('.chatHolder > div').innerHeight())

    //THEN once every 3 seconds
    scrollMe3('.chatHolder');
    // Meteor.setInterval(function(){scrollMe3('.chatHolder');}, 3000);
}
