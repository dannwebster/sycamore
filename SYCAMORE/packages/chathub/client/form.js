Template.MEchathub_form.events({
    'click .addChat': function(event,template){
        var data = {
            conversation: template.data.conversation,
            text: $('#chatContent').editable('getHTML', true, true),
            timestamp: moment().format('X'),
            user: Meteor.userId()
        }
        var notification = {
            type: null
        }
        Meteor.call('addChat',data,notification,function(){
            $('#chatContent').editable('setHTML', '', false);
        });
    },
    'click .chatHub_emoticon': function(event,template){
        var image = $(event.target).attr('id');
        $('#chatContent').editable('insertHTML', '<img src="/images/emoticons/'+image+'.png"  height=30 width=30>', true);
    }
})

Template.MEchathub_form.rendered = function(){
    $('#chatContent').editable({
        inlineMode: false,
        buttons: [],
        toolbarFixed: false,
        height: 150,
        theme: 'sycamore',
        countCharacters: false
    })
}

Template.MEchathub_topic_form.events({
    'click .chatHub_emoticon': function(event,template){
        var image = $(event.target).attr('id');
        $('#chatContent').editable('insertHTML', '<img src="/images/emoticons/'+image+'.png" height=30 width=30>', true);
    },
    'click .addChat': function(event,template){
        var data = {
            type: template.data.type,
            uid: template.data.uid,
            text:  $('#chatContent').editable('getHTML', true, true),
            timestamp: moment().format('X'),
            user: Meteor.userId()
        }
        var notification = {
            type: null
        }
        Meteor.call('addTopicChat',data,notification,function(){
            $('#chatContent').editable('setHTML', '', false);
        });
    }
})

Template.MEchathub_topic_form.rendered = function(){
    $('#chatContent').editable({
        inlineMode: false,
        buttons: [],
        toolbarFixed: false,
        height: 150,
        theme: 'sycamore',
        countCharacters: false
    })
}

Template.MEchathub_emoticons.rendered = function(){
    $('.dropdown-toggle').dropdown()
}

Template.MEchathub_attachment.helpers({
    "files": function(){
        return S3.collection.find({percent_uploaded: {$lt: 100}});
    },
})


Template.MEchathub_attachment.events({
    "change #chatfile": function(event,template){
        var files = $("#chatfile")[0].files;
        S3.upload({
            files:files,
            path:"chatfiles"
        },function(e,r){
            if(e){
                console.log(e)
            }
            if(r){
                console.log(r)
                var notification = {
                    type: null
                }
                var data = {
                    file: r,
                    timestamp: moment().format('X'),
                    user: Meteor.userId()
                }
                if(template.data.conversation){
                    data.conversation = template.data.conversation;
                    Meteor.call('addChat',data,notification);
                }else{
                    data.type = template.data.type;
                    data.uid = template.data.uid;
                    Meteor.call('addTopicChat',data,notification);
                }
            }
        });
    },
})
