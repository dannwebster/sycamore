Template.projectUsers.helpers({
    'non_users': function(){
        if(this.users && this.users.count()>0){
            var members = new Array();
            _.each(this.users.fetch(),function(member){
                members.push(member.user)
            })
            return Meteor.users.find({_id: {$nin: members}, roles: 'student'})
        }else{
            return Meteor.users.find({roles: 'student'})
        }
    },
    'ungrouped_users': function(){
        var users = ProjectUsers.find({group: null});
        var members = new Array();
        _.each(users.fetch(),function(member){
            members.push(member.user)
        })
        return Meteor.users.find({_id: {$in: members}})
    },
    'adult_non_users': function(){
        if(this.users && this.users.count()>0){
            var members = new Array();
            _.each(this.users.fetch(),function(member){
                members.push(member.user)
            })
            return Meteor.users.find({_id: {$nin: members}, roles: 'parent'})
        }else{
            return Meteor.users.find({roles: 'parent'})
        }
    },
    'user_list': function(){
        var members = new Array();
        _.each(this.users.fetch(),function(member){
            members.push(member.user)
        })
        return Meteor.users.find({_id: {$in: members}, roles: 'student'})
    },
    'adult_user_list': function(){
        var members = new Array();
        _.each(this.users.fetch(),function(member){
            members.push(member.user)
        })
        return Meteor.users.find({_id: {$in: members}, roles: 'parent'})
    },
    'groupsess': function(){
        var groups = ProjectGroups.find({},{sort: {name: 1}});
        var count = 0;
        _.each(groups.fetch(),function(g){
            count++;
            if(count === 1){
                Session.set('currentGroup',g._id);
            }
        })
    },
    'groups': function(){
        var groups = ProjectGroups.find({},{sort: {name: 1}});
        var count = 0;
        _.each(groups.fetch(),function(g){
            count++;
            if(count === 1){
                Session.set('currentGroup',g._id);
            }
        })
        return groups;
    }
})

Template.projectUsers.events({
    'click .changeView': function(event,template){
        delete Session.keys['currentGroup']
        $('.projectMemberTab').hide().promise().then(function(){
            var id = event.currentTarget.id;
            $('#'+id+'View').fadeIn();
        })
    },
    'click .addMember': function(event,template){
        ProjectUsers.insert({project: template.data.project._id, user: event.currentTarget.id},function(){
            //sAlert.info('User Added');
        })
    },
    'click .addAll': function(event,template){
        if(template.data.users && template.data.users.count()>0){
            var members = new Array();
            _.each(template.data.users.fetch(),function(member){
                members.push(member.user)
            })
            var non_users = Meteor.users.find({_id: {$nin: members}, roles: 'student'})
        }else{
            var non_users = Meteor.users.find({roles: 'student'})
        }

        _.each(non_users.fetch(),function(user){
            ProjectUsers.insert({project: template.data.project._id, user: user._id},function(){
                //sAlert.info('User Added');
            })
        })

    },
    'click .viewGroup': function(event,template){
        $('.singleGroup').hide().promise().then(function(){
            var id = event.currentTarget.id;
            Session.set('currentGroup',id)
            $('#group'+id).fadeIn();
        })
    },
    'click .ungrouped': function(event,template){
        Meteor.call('UpdateUserGroup',event.currentTarget.id,Session.get('currentGroup'),template.data.project._id)

    },
    'click .grouped': function(event,template){
        Meteor.call('UpdateUserGroup',event.currentTarget.id,null,template.data.project._id)

    },
    'change .editGroupName': function(event,template){
        var groupid = $(event.target).attr('name');
        var name = $(event.target).val();
        ProjectGroups.update(groupid,{$set: {name: name}},function(){
            //sAlert.info('Group Name Updated');
        })
    },
    'change .editGroupColor': function(event,template){
        var groupid = $(event.target).attr('name');
        var color = $(event.target).val();
        ProjectGroups.update(groupid,{$set: {color: color}},function(){
            //sAlert.info('Group Color Updated');
        })
    },
    'click .deleteGroup': function(event,template){
        var group = $(event.target).attr('name')

        bootbox.confirm("Are you sure?", function(result) {
            if(result){
                Meteor.call('ProjectGroupRemove',group,function(){
                    //sAlert.info('Group Deleted');
                })
            }
        });
    },
    'click .addGroup': function(event,template){
        var count = ProjectGroups.find().count();
        count++;
        ProjectGroups.insert({project: template.data.project._id, name: 'Group '+count},function(){
            //sAlert.info('Group Added');
        })
    },
    'click .removeMember': function(event,template){
        var project = template.data.project._id;
        var user = event.currentTarget.id;
        Meteor.call('ProjectUserRemove',project,user,function(){
            //sAlert.info('User Removed');
        })
    }
})
