Template.MEchathub_form.events({
    'click .addChat': function(event,template){
        var data = {
            conversation: template.data.conversation,
            text: $('#chatContent').val(),
            timestamp: moment().format('X'),
            user: Meteor.userId()
        }
        $('#chatContent').val('');
        var notification = {
            type: null
        }
        Meteor.call('addChat',data,notification);
    }
})
