Meteor.startup(function(){
    InviteMe = {}

    InviteMe.config = {}
    this.InviteMe = InviteMe;



})


Meteor.methods({
    'emailInvitation': function(data){
        var content = InviteMe.config.emailContent
        var text = '<html><body>';
        /*if(data.firstname){
            text += '<p>Dear '+data.firstname+',</p>'
        }else{
            text += '<p>Hello!</p>'
        }
        text += '<p>'+content.message+'</p>';
        text += '<p>Click here to get started: <a href="'+content.website+'/invitation/'+data.token+'">setup account</a></p>'
        text += '</body></html>';*/
        text += '<a href="'+content.website+'/invitation/'+data.token+'"><img src="https://s3-us-west-2.amazonaws.com/sycamore-la/projects/61a0851a-1ff2-4c2f-b114-adc7f9914340.jpg" width="600"></a></body></html>';

        var options = {
            from: InviteMe.config.from,
            to: data.email,
            subject: 'Welcome to '+content.organization,
            html: text,
            headers: "Content-Type: text/html; charset=ISO-8859-1\r\n"
        }
        this.unblock()
        Email.send(options)
    },
    'getConfig': function(item){
        if(item){
            return InviteMe.config[item]
        }else{
            return InviteMe.config
        }
    },
    'sendInvite': function(data){
        var count = 0;
        console.log('INVITE TESTING')
        //console.log(Meteor.users.find().fetch());
        if(data.username){
            var usernames = Meteor.users.find({username: data.username});
            count += usernames.count();
            console.log('--USERS WITH USERNAMES--')
            _.each(usernames.fetch(),function(user){
                console.log(user)
            })
        }

        var emails = Meteor.users.find({emails: { $elemMatch: { address: data.email }}});

        count += emails.count();
        console.log(count)
        console.log('--USERS WITH EMAILS--')
        _.each(emails.fetch(),function(user){
            console.log(user)
        })

        if(count){
            return false;
        }else{
            var token = Math.random().toString(36).slice(-8);
            data.token = token;
            Meteor.call('emailInvitation',data)
            var uid = MEinvites.insert(data);
            return uid;
        }
    },
    'MErescindInvite': function(id){
        MEinvites.remove(id)
    },
    'MEaddUserRole': function(user){
        var user = Meteor.users.findOne(user);
        Roles.addUsersToRoles(user._id,user.profile.invite.role)
    }
})

Meteor.publish('MEinvitations',function(token){
    if(token){
        return MEinvites.find({token: token})
    }else{
        return MEinvites.find()
    }
    //return MEinvites.find()
})
