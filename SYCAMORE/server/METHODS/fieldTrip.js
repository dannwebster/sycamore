Meteor.methods({
    'saveFieldTrip': function(data){
        var fti = FieldTripIdeas.insert(data)
        console.log(fti);
        console.log(data)
    }
})
 
