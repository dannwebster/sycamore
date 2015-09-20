Template.projectView.helpers({
    'duedate': function(){
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
            var sum=0;
            var userdata = ProjectUsers.find({project: this.project._id}).fetch();
            var count = ProjectUsers.find({project: this.project._id}).count();
            _.each(userdata, function(user){
                console.log(user)
                if(user.progress){
                    sum = sum + user.progress
                }
            });
            console.log(sum)
            console.log(count)
            console.log(sum/count)
            return (sum/count);
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
            var userdata = ProjectUsers.findOne({project: this.project._id, user: myFam() });
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
    'chatid': function(event,template){
        return Meteor.userId()+'_'+this.project._id;
    }
})


getPosition = function(element) {
    var xPosition = 0;
    var yPosition = 0;

    while (element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}

function getClickPosition(e) {
    var parentPosition = getPosition(e.currentTarget);
    var xPosition = e.clientX - parentPosition.x;
    var yPosition = e.clientY - parentPosition.y;
    return {
        left: xPosition,
        top: yPosition,
        parent: parentPosition
    }
}

Template.projectView.events({
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
            var data = {
                type: 'project',
                uid: Meteor.userId()+'_'+this.project._id,
                text:  'Progress Bar Moved to '+prog,
                timestamp: moment().format('X'),
                user: Meteor.userId(),
                system: true
            }

            Meteor.call('addTopicChat',data,'',function(){
                $('#chatContent').editable('setHTML', '', false);
                scrollMe('.chatHolder')
            });
        }



    },
    'click .closeConvo': function(event,template){
        delete Session.keys['projectChat']
    },
    'click .percent': function(event,template){
        if(Roles.userIsInRole(Meteor.userId(),'student')){
            var userdata = ProjectUsers.findOne({user: Meteor.userId(), project: template.data.project._id});

            var percent = event.currentTarget.getAttribute("name")
            $('.progress-bar.progressProject').width(Number(percent)+'%')
            ProjectUsers.update(userdata._id,{$set: {progress: Number(percent)}});
            var data = {
                type: 'project',
                uid: Meteor.userId()+'_'+this.project._id,
                text:  'Progress Bar Moved to '+prog,
                timestamp: moment().format('X'),
                user: 'system',
                system: true
            }

            Meteor.call('addTopicChat',data,'',function(){
                $('#chatContent').editable('setHTML', '', false);
                scrollMe('.chatHolder')
            });
        }
    },
    'click .viewStudent': function(event,template){
        Meteor.subscribe('userFamilyMembers',event.currentTarget.id,{
            onReady: function(){
                var record = FamilyMembers.findOne({user: event.currentTarget.id});
                Session.set('projectChat',record.family+'__'+template.data.project._id);
            }
        });

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


Template.projectView.rendered = function(){
    Meteor.subscribe('projectUsersArray',this.data.project._id);
    delete Session.keys['projectChat']

    $('.chatHolder').height($(window).height() - 450)

    //SET THE INITIAL SCROLL position
    $('.chatHolder').scrollTop($('.chatHolder > div').innerHeight());
    Session.set('SC_position', $('.chatHolder').scrollTop());
    Session.set('SC_last_height', $('.chatHolder > div').innerHeight())

    //THEN once every 3 seconds
    scrollMe3('.chatHolder');
    Meteor.setInterval(function(){scrollMe3('.chatHolder');}, 3000);
}
