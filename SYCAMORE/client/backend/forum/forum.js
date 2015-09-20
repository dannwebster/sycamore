Template.forumTopicListItem.helpers({
    'createdDate': function(){
        return moment.unix(this.created).format('MMM DD, YYYY')
    },
    'lastPostDate': function(){
        return moment.unix(this.last_post).format('MMM DD, YYYY')
    }
})
Template.forum.events({
    'click .forumCompose': function(){
        Meteor.call('addForum',Meteor.userId(),function(error,result){
            if( error ){
                console.log(error)
            }else{
                Router.go('/forum/compose/'+result)
            }
        })

    }
})
