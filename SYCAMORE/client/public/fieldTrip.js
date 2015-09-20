Template.fieldTripForm.events({
    'click #submitFieldTrip': function(event,template){
        var data = {
            name: $('#nn').val(),
            email: $('#ee').val(),
            suggestion: $('#ss').val(),
            contacts: $('#cc').val()
        }
        if(data.name && data.email && data.suggestion){
            Meteor.call('saveFieldTrip',data,function(){
                $('#nn').val('');
                $('#ee').val('');
                $('#ss').val('');
                $('#cc').val('');

                bootbox.alert('Thank you for your message!')
            })

        }else{
            bootbox.alert('Please fill out all form fields.')
        }
    },
})
