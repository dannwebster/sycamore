Meteor.methods({
    'project_photo': function(response){
        Projects.update(response.context.project._id,{$set: {mainphoto: response.upload_data.public_id}})

    },
    'distributeProject': function(pid){
        Projects.update(pid,{$set: {status: 1, published: moment().format('X')}})
    },
    'archiveProject': function(pid){
        Projects.update(pid,{$set: {status: 2, archived: moment().format('X')}})
    },
    'unarchiveProject': function(pid){
        Projects.update(pid,{$set: {status: 1}})
        Projects.update(pid,{$unset: {archived: null}})
    },
    'rescindProject': function(pid){
        Projects.update(pid,{$set: {status: 0}})
        Projects.update(pid,{$unset: {published: null}})
    },
    'addProject':function(userid){
        var pid = Projects.insert({
            educator: userid,
            created: moment().format('X'),
            due: moment().add(7, 'days').format('X'),
            title: 'Untitled New Project',
            status: 0
        })
        return pid
    },
    'ProjectUserRemove': function(project,user){
        ProjectUsers.remove({project: project, user: user})
    },
    'ProjectGroupRemove': function(group){
        console.log(group)
        ProjectUsers.update({group: group},{$unset: {group: null}},{multi:true})
        ProjectGroups.remove(group)
    },
    'UpdateUserGroup': function(user,group,project){
        ProjectUsers.update({user: user, project: project},{$set: {group: group}});
    },
    'removeProject': function(pid){
        Projects.remove(pid,function(e,r){
            if(r){
                ProjectGroups.remove({project: pid},function(e,r){
                    if(r){
                        ProjectUsers.remove({project: pid},function(e,r){
                            if(r){

                            }
                        })
                    }
                })
            }
        })
    }
})
