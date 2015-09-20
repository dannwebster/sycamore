Template.manageContentMenu.events({
  'click .new': function(){
    var type = this.type;
    
    var id = Blog.insert({
      created: moment().format('X'),
      live: false,
      title: 'New '+type+' '+moment().format('MM/DD h:mm A'),
      type: getType(type),
      status: 'draft'
    });
    
    Router.go(type+'Compose',{id: id});
  }
})