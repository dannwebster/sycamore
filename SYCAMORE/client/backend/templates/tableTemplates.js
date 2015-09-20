Template.dateShort.helpers({
  'date': function(){
    if(this.created){
      return moment.unix(this.created).format('MM/DD/YYYY')
    }else{
      return moment.unix(this.date).format('MM/DD/YYYY')
    }
  }
})
Template.dateLong.helpers({
  'date': function(){
    return moment.unix(this.date).format('ddd MM/DD/YY h:mm A');
  }
})


Template.postActions.helpers({
  'live': function(){
    if(this.status=='live'){
      return true
    }else{
      return false
    }
  },
  'editPath': function(){
    var type = getType(this.type);
    return type+'Edit'
  },
  'scheduled': function(){
    if(this.status=='scheduled'){
      return true
    }else{
      return false
    }
  },
  'draft': function(){
    if(this.status=='draft'){
      return true
    }else{
      return false
    }
  },
  'trash': function(){
    if(this.status=='trash'){
      return true
    }else{
      return false
    }
  }
});
Template.postActions.events({
  'click .make_live':function(event,template){
    var id = event.currentTarget.id;
    Blog.update(id,{$set: {
      status: 'live',
      dateLive: moment().format('X')
    }})
    
    Meteor.call('inboxDistribute',template.data.type,'new',id,template.data.visibility);
    
    sAlert.success(getTypeTitle(template.data.type)+' is now Live.');
  },
  'click .make_draft':function(event,template){
    var id = event.currentTarget.id;
    Blog.update(id,{$set: {
      status: 'draft',
      dateLive: null,
    }})
    
    sAlert.info(getTypeTitle(template.data.type)+' Moved to Drafts.');
  },
  'click .delete':function(event,template){
    bootbox.confirm("Are you sure you want to delete this post?", function(result) {
      if(result){
        var id = event.currentTarget.id;
        Blog.update(id,{$set: {
          status: 'trash',
          dateLive: null,
        }})
        sAlert.warning(getTypeTitle(template.data.type)+' Moved to Trash.');
      }
    }); 
  },
  'click .restore':function(event,template){
    var id = event.currentTarget.id;
    Blog.update(id,{$set: {
      status: 'draft',
      dateLive: null,
    }})
    sAlert.info(getTypeTitle(template.data.type)+' Restored to Drafts.');
  }
})