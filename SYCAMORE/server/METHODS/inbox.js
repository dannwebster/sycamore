Meteor.methods({
  
  //SPECIFICALLY FOR ONE TO ONE MESSAGES & NOTIFICATIONS
  inboxSend: function(){
    
  },
  //THE DISTRIBUTE METHOD IS SPECIFICALLY FOR BLOGS, NEWSLETTERS, ANNOUNCEMENTS, & PRESS RELEASES
  inboxDistribute: function(type,mode,uid,recipients){
    var data = {
      type: type,
      mode: mode,
      uid: uid,
      importance: 'normal',
      status: 'active',
      created: moment().format('X')
    }
    //console.log('distribute reached')
    var recipient_list = getRecipients(recipients);
    _.each(recipient_list,function(user){
      data.recipient = user._id;
      Inbox.insert(data)
    });      
  },
  //USE TO REMOVE OR RESCIND ACCESS TO PREVIOUSLY POSTED CONTENT
  inboxRescind: function(type,uid){
    
  }
})