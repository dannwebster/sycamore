Template.ChatForm.events({
    'click .addChat': function(event,template){
        var data = {
            conversation: template.data.conversation,
            text: $('#chatContent').editable('getHTML', false, false),
            timestamp: moment().format('X'),
            user: Meteor.userId()
        }
        var notification = {
            type: null
        }
        if(!jQuery.trim( data.text ).length==0){
            Meteor.call('addChat',data,notification,function(){
                $('#chatContent').editable('setHTML', '', false);

                scrollMe('.chatHolder')
            });
        }
    },
    'click .chatHub_emoticon': function(event,template){
        var image = $(event.target).attr('id');
        $('#chatContent').editable('insertHTML', '<img src="/images/emoticons/'+image+'.png"  height=30 width=30>', true);

    }
})

Template.ChatForm.rendered = function(){
    $('#chatContent').editable({
        inlineMode: false,
        buttons: [],
        toolbarFixed: false,
        height: 150,
        theme: 'sycamore',
        countCharacters: false
    })
}

Template.TopicForm.events({
    'click .chatHub_emoticon': function(event,template){
        var image = $(event.target).attr('id');
        $('#chatContent').editable('insertHTML', '<img src="/images/emoticons/'+image+'.png" height=30 width=30>', true);
    },
    'click .addChat': function(event,template){
        var data = {
            type: template.data.type,
            uid: template.data.uid,
            text:  $('#chatContent').editable('getHTML', false, false),
            timestamp: moment().format('X'),
            user: Meteor.userId()
        }
        var notification = {
            type: null
        }

        if(!jQuery.trim( data.text ).length==0){
            Meteor.call('addTopicChat',data,notification,function(){
                $('#chatContent').editable('setHTML', '', false);
                scrollMe('.chatHolder')
            });
        }
    }
})

Template.TopicForm.rendered = function(){
    $('#chatContent').editable({
        inlineMode: false,
        buttons: [],
        toolbarFixed: false,
        height: this.data.height,
        theme: 'sycamore',
        countCharacters: false
    })
}

Template.CCompose.events({
    'click .startConvo': function(){
        var users = $("#recipients").val().split(",");
        users.push(Meteor.userId());
        var convo = {
            timestamp: moment().format('X'),
            type: 'direct',
            users: users,
            last_post: moment().format('X')
        }
        var data = {
            text: $('#newChatContent').val(),
            timestamp: moment().format('X'),
            user: Meteor.userId()
        }
        var notification = {
            type: null
        }
        Meteor.call('startConversation',convo,data,notification,function(){
            $('#recipients').tagsinput('removeAll');
            $('#newChatContent').val('');
        });
    }
});

Template.CCompose.rendered = function(){
    users = this.data.userlist;
    var Qusers = new Bloodhound({
        local: users,
        datumTokenizer: function(d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        identify: function(obj) { return obj.name; },
        queryTokenizer:  Bloodhound.tokenizers.whitespace
    });

    $("#recipients").tagsinput({
        itemValue: 'id',
        itemText: 'name',
        typeaheadjs: {
            name: 'Qusers',
            displayKey: 'name',
            source: Qusers.ttAdapter()
        }
    })
}


Template.emoticons.rendered = function(){
    $('.dropdown-toggle').dropdown()
}

Template.attachment.helpers({
    "files": function(){
        return S3.collection.find({percent_uploaded: {$lt: 100}});
    },
})


Template.attachment.events({
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
                    scrollMe('.chatHolder')
                }
            }
        });
    },
})
