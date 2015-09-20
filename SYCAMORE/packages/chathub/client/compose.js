Template.MEchathub_compose.events({
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

Template.MEchathub_compose.rendered = function(){
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
