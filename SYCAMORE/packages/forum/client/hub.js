Template.MEchathub.events({
    'click .conversation': function(event){
        $('#ME_COMPOSE').hide();
        $('#ME_CONVERSATION').fadeIn();
        Session.set('convo',event.currentTarget.id);
    },
    'click .new': function(event){
        $('#ME_CONVERSATION').hide();
        $('#ME_COMPOSE').fadeIn();
        Session.set('convo', undefined)
    }
})
Template.MEchathub.helpers({
    'convo': function(){
        return Session.get('convo');
    }
})
