Meteor.startup(function(){
    //process.env.MAIL_URL="smtp://david@theimagists.com:The_imagists0012@smtp.hylh-jtbq.accessdomain.com:465/";
    process.env.MAIL_URL="smtp://info@sycamore-school.org:sycserver20!5@smtp.gmail.com:465/";

    //CalendarEvents.remove({});
    //Notifications.remove({eventId: {$ne: undefined}})

    InviteMe.config = ({
        from: "The Sycamore School <info@sycamore-school.org>",
        hostRoles: 'educator',
        inviteRoles: {
            roles: ['educator','parent','student'],
            required: true
        },
        email: {
            modify: false,
            //EMAIL IS ALWAYS REQUIRED
            //required: true
        },
        /*firstname: {
        modify: false,
        required: true
    },
    lastname: {
    modify: false,
    required: true
},
username: {
modify: false,
auto: true,
required: true
},
phone: {
modify: true,
required: true
},*/
emailContent: {
    organization: 'Sycamore School',
    //website: 'http://sycamore-107107.nitrousapp.com:3000',
    website: 'http://sycamore-school.org',
    message: "You've been invited to join the Sycamore School community. Click on the link below to setup your account."
},
welcomeContent: {
    title: 'Welcome to the Sycamore School "TreeHouse"',
    message: "Enter your password below and continue on to your account and profile setup.",
    buttonText: "Next: Personal Info <i class='fa fa-chevron-right'></i>"
},
signUp: {
    redirectRoute: 'signupStep2'
}
})

})

Meteor.settings = {}
Meteor.settings.private = {}
Meteor.settings.private = {
    MailChimp: {
        "apiKey": "90426f2364b5784da2925d063f67fc34-us10",
        "listId": "70a33316f4" /*live list*/
        //"listId": "bdd9355fde" /*test list*/
    }
}


S3.config = {
    key: 'AKIAI2EQLFDBGX6KUUHQ',
    secret: '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',
    bucket: 'sycamore-la',
    region:  'us-west-2'
};


Cloudinary.config({
    cloud_name: 'iconic',
    api_key: '332534447274452',
    api_secret: 'hzczjqmJVvfhu11XGKWDg3Zyq0E'
});

Meteor.methods({
    'subcribeNewsLetter': function(name,email){
        var mc = Meteor.settings.private.MailChimp
        var mailChimp = new MailChimp(mc.apiKey);

        mailChimp.call( 'lists', 'subscribe', {
            id: mc.listId,
            email: {
                email: email
            },
            merge_vars: {
                FNAME: name
            }
        },
        // Callback beauty in action
        function ( error, result ) {
            if ( error ) {
                console.log(error)
            } else {
                console.log('mailchimp subscriber subscribed')
            }
        });
    }
})
