Meteor.publish('appSettings',function(){
  var count = AppSettings.find().count();
  if(count===0){
    AppSettings.insert({});
  }
  /*if(count > 1){
        AppSettings.remove({})
        AppSettings.insert({});
      }*/
  return AppSettings.find()
});

Meteor.publish('studentApplications', function() {
    return StudentApplications.find({});
});

Meteor.methods({
    'removeApplication': function(id){
        StudentApplications.remove(id)
    }
})
