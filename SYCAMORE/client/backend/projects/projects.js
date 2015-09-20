Template.projectListItem.helpers({
    'dueOn': function(){
        var data = {
            date: moment.unix(this.due).format("MM/DD/YYYY")
        }
        if(moment().format('X') > this.due){
            data.class = 'text-danger'
        }
        return data
    },
    'completedOn': function(){
        return moment.unix(this.archived).format("MM/DD/YYYY")
    },
    'new': function(){
        //if(Roles.userIsInRole(Meteor.userId(),'educator')){
            if(this.status==0){
                if(this.created < moment().add(48,'hours').format('X') && this.created > moment().subtract(48,'hours').format('X')){
                    return true;
                }
            }if(this.status==1){
                if(this.published < moment().add(48,'hours').format('X') && this.published > moment().subtract(48,'hours').format('X')){
                    return true;
                }
            }
        //}
    },
    'myProgress': function(){
        if(Roles.userIsInRole(Meteor.userId(),'educator') || Roles.userIsInRole(Meteor.userId(),'superadmin')){
            Meteor.subscribe('singleProjectUsers',this._id);
            var sum=0;
            var userdata = ProjectUsers.find({project: this._id}).fetch();
            var count = ProjectUsers.find({project: this._id}).count();
            _.each(userdata, function(user){
                if(user.progress){
                    sum = sum + user.progress
                }
            });
            return (sum/count);
        }
        if(Roles.userIsInRole(Meteor.userId(),'student')){
            Meteor.subscribe('singleProjectUserRecord',this._id,Meteor.userId());
            var userdata = ProjectUsers.findOne({user: Meteor.userId(), project: this._id});
            if(userdata.progress){
                return userdata.progress
            }else{
                return 0;
            }
        }
        if(Roles.userIsInRole(Meteor.userId(),'parent')){
            var sum=0;
            var userdata = ProjectUsers.findOne({project: this._id, user: this.parent.data._id });
            if(userdata.progress){
                return userdata.progress
            }else{
                return 0;
            }
        }
    },
})
Template.homeProjectListItem.helpers({
    'new': function(){
        if(this.project.status==1 && this.project.published > moment().subtract(48,'hours').format('X')){
            //alert(this.project.status)
            return true;
        }
    },
    'myProgress': function(){
        if(Roles.userIsInRole(Meteor.userId(),'educator') || Roles.userIsInRole(Meteor.userId(),'superadmin')){
            Meteor.subscribe('singleProjectUsers',this.project._id);
            var sum=0;
            var userdata = ProjectUsers.find({project: this.project._id}).fetch();
            var count = ProjectUsers.find({project: this.project._id}).count();
            _.each(userdata, function(user){
                if(user.progress){
                    sum = sum + user.progress
                }
            });
            return (sum/count);
        }
        if(Roles.userIsInRole(Meteor.userId(),'student')){
            Meteor.subscribe('singleProjectUserRecord',this.project._id,Meteor.userId());
            var userdata = ProjectUsers.findOne({user: Meteor.userId(), project: this.project._id});
            if(userdata.progress){
                return userdata.progress
            }else{
                return 0;
            }
        }
        if(Roles.userIsInRole(Meteor.userId(),'parent')){
            //Meteor.subscribe('singleProjectUserRecord',this._id,Meteor.userId());
            var sum=0;
            var userdata = ProjectUsers.findOne({project: this.project._id, user: this.studentId });
            return userdata.progress
        }
    }
})
Template.projects.helpers({
    'drafts': function(){
        if(Roles.userIsInRole(Meteor.userId(),'educator')){
            return Projects.find({educator: Meteor.userId(),status: 0},{sort: {created: -1}});
        }
    },
    'current': function(){
        if(Roles.userIsInRole(Meteor.userId(),'educator')){
            var current = Projects.find({educator: Meteor.userId(),status: 1},{sort: {created: -1}});
        }else{
            var current = Projects.find({status: 1},{sort: {created: -1}});
        }

        return current;
    },
    'past': function(){
        if(Roles.userIsInRole(Meteor.userId(),'educator')){
            var past = Projects.find({educator: Meteor.userId(),status: 2},{sort: {created: -1}});
        }else{
            var past = Projects.find({status: 2},{sort: {created: -1}});
        }

        return past;
    }
})

Template.projects.events({
    'click .newProject': function(){
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
    'click .project-link': function(event,template){
        if(Roles.userIsInRole('parent')){
            Router.go('projectViewStudent',{id: event.currentTarget.id, user: $(event.target).attr('user')})
        }else{
            Router.go('projectView',{id: event.currentTarget.id})
        }
    }
})
