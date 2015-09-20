Template.contentListView.helpers({
  'settings': function () {
    return {
      rowsPerPage: 30,
      showFilter: true,
      fields: [
        { key: 'url', label: 'URL Slug'},
        { key: 'title', label: 'Title'},
        { key: 'status', label: 'Status'},
        { key: 'created', label: 'created', tmpl: Template.dateShort },
        { key: 'status', label: 'Actions', tmpl: Template.postActions }
      ]
    };
  },
  'new_view': function(){
    if(this.view=='trash'){
      return 'Deleted';
    }else{
      return this.view;
    }
  },
  'empty_trash': function(){
    if(this.view=='trash'){
      return true;
    }
  }
});

Template.contentListView.events({
  'click .empty_trash': function(event,template){
    bootbox.confirm("Are you sure you want to empty the trash bin? This will permanently delete all items.", function(result) {
      if(result){
         Meteor.call('emptyTrash',getType(template.data.type),function(){
          sAlert.error(getTypeTitle(template.data.type)+' Trash Emptied.');
        });
      }
    });
  }
})
