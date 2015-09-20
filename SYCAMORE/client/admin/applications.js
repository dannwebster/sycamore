Template.adminViewApplication.events({
    'click .deleteApplication': function(event,template){
        bootbox.confirm('Are you sure you want to delete this application?',function(result){
            if(result){
                //StudentApplications.remove({_id: event.currentTarget.id},function(){
                //    Router.go('adminApplications')
                //})
                Meteor.call('removeApplication',event.currentTarget.id,function(){
                    Router.go('adminApplications')
                })
                //StudentApplications.remove({_id: event.currentTarget.id})
            }
        })

    },
})
