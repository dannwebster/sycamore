Template.footer.events({
    'click #subscribe': function(event,template){
        bootbox.alert('Thank you for subscribing!')
        var name = $('#subname').val();
        var email = $('#subemail').val();
        //var mailChimp = new MailChimp(
        if(name && email){
            Meteor.call('subcribeNewsLetter',name,email)
            bootbox.alert('Thanks for signing up!')
            var name = $('#subname').val('');
            var email = $('#subemail').val('');
        }else{
            bootbox.alert('Please fill out all form fields.')
        }
    },
    'click #sendmessage': function(event,template){
        var name = $('#name').val();
        var email = $('#email').val();
        var message = $('#message').val();
        if(name && email && message){
            Meteor.call('sendFormEmail',name,email,message,function(){
                $('#name').val('');
                $('#email').val('');
                $('#message').val('');
                bootbox.alert('Thank you for your message!')
            })

        }else{
            bootbox.alert('Please fill out all form fields.')
        }
    },
})
