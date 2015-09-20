getRecipients = function(recipients){
  //console.log('recipients reached')
  //console.log(recipients)
  if(recipients=='users' || recipients=='public' || recipients==''){
    var users = Meteor.users.find({},{fields: {_id: 1}}).fetch();
  }
  if(recipients=='educators'){
    var users = Meteor.users.find({roles: 'educator'},{fields: {_id: 1}}).fetch();
  }
  if(recipients=='parents_educators'){
    var educators = Meteor.users.find({roles: 'educator'},{fields: {_id: 1}}).fetch();
    var parents = Meteor.users.find({roles: 'parent'},{fields: {_id: 1}}).fetch();
    var users = educators.concat(parents);
  }
  //console.log(users);
  return users;
}