Template.forumCommentBox.helpers({
    'timestamp': function(){
        return moment.unix(this.added).format('MMM DD, YYYY, hh:mm')
    }
})

Template.forumView.helpers({
    'subscribed': function(){
        Meteor.subscribe('ForumSubscribers',this.topic._id)
        return ForumSubscribers.find({user: Meteor.userId(),topic: this.topic._id}).count()
    },
    'mine': function(){
        if(this.topic.composer == Meteor.userId()){
            return true;
        }
    },
    'comments': function(){
        Meteor.subscribe('ForumThreadComments',this.topic._id);
        return ForumComments.find({thread: this.topic._id},{sort: {added: 1}})
    },
    'commentcount': function(){
        return this.topic.comments;
    },
    "files": function(){
        return S3.collection.find({percent_uploaded: {$lt: 100}});
    },
    'creator_name': function(){
        var user = Meteor.users.findOne(this.topic.composer);
        return user.profile.firstname+' '+user.profile.lastname;
    },
    'created_date': function(){
        return moment.unix(this.topic.created).format('MMM DD, YYYY')
    },
    'last_post_date': function(){
        return moment.unix(this.topic.created).format('MMM DD, YYYY')
    }
})
Template.forumView.events({
    'click .leaveThread': function(event,template){
        Meteor.call('leaveThread',Meteor.userId(),template.data.topic._id,function(error,result){
            if(error){
                console.log(error);
            }else{
                sAlert.info('You have left this thread.');
            }
        })

    },
    'click .joinThread': function(event,template){
        ForumSubscribers.insert({user: Meteor.userId(),topic: template.data.topic._id},function(error,result){
            if(error){
                console.log(error);
            }else{
                sAlert.info('You have joined this thread.');
                ForumTopics.update(template.data.topic._id,{$inc: {subscribers: 1}})
                $('#chatContent').editable({
                    inlineMode: false,
                    buttons: [],
                    toolbarFixed: false,
                    height: 150,
                    theme: 'sycamore',
                    countCharacters: false
                })
                $('.chatHolder').height($(window).height()-500)
                scrollMe('.chatHolder')
            }
        })
    },
    'click .chatHub_emoticon': function(event,template){
        var image = $(event.target).attr('id');
        $('#chatContent').editable('insertHTML', '<img src="/images/emoticons/'+image+'.png" height=30 width=30>', true);
    },
    'click .addComment': function(event,template){
        var data = {
            user: Meteor.userId(),
            comment: $('#chatContent').editable('getHTML'),
            thread: template.data.topic._id,
            added: moment().format('X')
        }

        Meteor.call('commentThread',data,function(){
            $('#chatContent').editable('setHTML', '', false);
        });
        //$('.forumComments').scrollTop($('.forumComments')[0].scrollHeight);
        $('.chatHolder').animate({ scrollTop: $('.chatHolder > div').innerHeight()   });

    },
    'click .newMessageIndicator': function(event,template){
        //$('.chatHolder').scrollTop($('.chatHolder > div').innerHeight());
        $('.chatHolder').animate({ scrollTop: $('.chatHolder > div').innerHeight()   });
        $('.newMessageIndicator').fadeOut();
    },
    'change .forumComments': function(){

        $('.forumComments').scrollTop($('.forumComments')[0].scrollHeight);
    },
    "change #forumFile": function(event,template){
        var files = $("#forumFile")[0].files;
        S3.upload({
            files:files,
            path:"chatfiles"
        },function(e,r){
            if(e){
                console.log(e)
            }
            if(r){
                console.log(r)
                getIcon = function(filetype){
                    switch(filetype){
                        case 'xlsx': return 'file-excel-o'; break;
                        case 'xls': return 'file-excel-o'; break;
                        case 'pdf': return 'file-pdf-o'; break;
                        case 'doc': return 'file-word-o'; break;
                        case 'docx': return 'file-word-o'; break;
                        case 'txt': return 'file-text-o'; break;
                        case 'pptx': return 'file-powerpoint-o'; break;
                        case 'ppt': return 'file-powerpoint-o'; break;
                        default: return 'file'
                    }
                }
                var doc = r;
                var data = {
                    link: doc.secure_url,
                    name: doc.file.original_name
                }

                var parts = doc.file.name.split('.')
                var type = parts[1]
                if(type=='jpeg'||type=='png'||type=='gif'||type=='jpg'){
                    data.type = 'image';
                    data.image = true;
                }else{
                    data.type = parts[1],
                    data.icon = getIcon(parts[1])
                }
                if(data.type == 'image'){
                    $('#chatContent').editable('insertHTML', '<a href="'+doc.secure_url+'" target="_blank"><img src="'+doc.secure_url+'" width=200></a>', true);
                }else{
                    $('#chatContent').editable('insertHTML', '<a href="'+doc.secure_url+'" target="_blank"><h1><i class="fa fa-'+data.icon+'"></i></h1>'+doc.file.original_name+'</a>', true);
                }
            }
        });
    }
})
Template.forumView.rendered = function(){
    $('#chatContent').editable({
        inlineMode: false,
        buttons: [],
        toolbarFixed: false,
        height: 150,
        theme: 'sycamore',
        countCharacters: false
    })
    $('.forumComments').height($(window).height()-500)

    $('.chatHolder').scrollTop($('.chatHolder > div').innerHeight());
    Session.set('SC_position', $('.chatHolder').scrollTop());
    Session.set('SC_last_height', $('.chatHolder > div').innerHeight())

    //THEN once every 3 seconds
    scrollMe3('.chatHolder');
    Meteor.setInterval(function(){scrollMe3('.chatHolder');}, 3000);

}
Template.forumView.rerendered = function() {
  scrollMe('.chatHolder')
}
Template.forumView.onRendered = function() {
  scrollMe('.chatHolder')
}
