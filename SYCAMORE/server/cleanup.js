Meteor.methods({
    'cleanup': function(){
        Blog.update({status: null},{$set: {status: 'draft'}},{multi: true})
    }
})
