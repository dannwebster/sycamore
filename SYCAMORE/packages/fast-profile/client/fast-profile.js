Meteor.startup(function(){
  Meteor.subscribe('userData');
  
  Template.fastProfile.helpers({

  });
  
  Template.fastProfilePassword.events({
    'click .change_password': function(event,template){
      var old = $('#current_password').val();
      var newp = $('#new_password').val();
      var newpc = $('#new_password_confirm').val();
      var data = {}
      
      if(old==''){
        data = {
          error: true,
          message: 'You must provide your current password.'
        }
      }else  if(newp==''){
        data = {
          error: true,
          message: 'You cannot enter a blank password.'
        }
      }else if(newp!=newpc){
        data = {
          error: true,
          message: 'Your new password and password confirmation do not match.'
        }
      }
      if(!data.error){
        Accounts.changePassword(old, newp,function(err,res){
          if(err){
            console.log(err)
            bootbox.alert("<div class='alert alert-danger'>"+err.reason+"</div>"); 
          }
          else{
            bootbox.alert("<div class='alert alert-success'>Password Updated!</div>"); 
          }
        });
      }else{
        bootbox.alert("<div class='alert alert-danger'>"+data.message+"</div>"); 
      }
    }
  })


  Template.fastProfilePhoto.events({
    "click button.upload": function(){
      var files = $("input.file_bag")[0].files
      S3.upload({
      files:files,
      path: 'user_files/'+Meteor.userId(),
      acl: "private"
    },function(e,r){
      console.log(e);
      console.log(r);
    });
    }
  });

  Template.fastProfilePhoto.helpers({
    "files": function(){
        return S3.collection.find();
    },
    "photo": function(){
      return false;
    },
    "button_text": function(){
      return 'Upload Photo'
    },
    "photo_url": function(){
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      var signed = client.signedUrl('test',tomorrow);
    }
  })

  Template.fastProfileEmail.helpers({
    'mail': function(){
      console.log(Meteor.user());
      var user = Meteor.user();
      var emails = user.emails;
      var count = emails.length;
      console.log(count)
      var data = {}
      if(count > 1){
        data.multi = true;
        data.emails = emails;
      }else{
        data.multi = false;
        data.email = emails[0];
      }
      return data
    }
  });
  Template.fastProfileEmailBlock.helpers({
    'emailSent': function(){
      var user = Meteor.users.findOne();
      var tokens = user.services.email.verificationTokens;
      if(tokens.indexOf(this.address)){
        return true
      }
    }
  })
  Template.fastProfileEmailBlock.events({
    'click .verifyEmail': function(){
      Meteor.call('sendVerificationEmail',Meteor.userId());
    }
  })
  
  Template.fastProfileVerifyEmail.helpers({
    'verified': function(){
      Accounts.verifyEmail(this.token);
    }
  })
  
  Template.fastProfileAddEmail.events({
    'click .add_email': function(){
      $('.add_email_block').show();
    },
    'click .cancel_add_email': function(){
      $('.add_email_block').hide();
      $('#email').val('');
    },
    'click .add_email_address': function(){
      //$('.add_email_block').hide();
      //$('#email').val('');
    },
  })
  
  
  
});