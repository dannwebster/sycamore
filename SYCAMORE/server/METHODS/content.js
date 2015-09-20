Meteor.methods({
  'emptyTrash': function(type){
    Blog.remove({status: 'trash', type: type})
  }
})