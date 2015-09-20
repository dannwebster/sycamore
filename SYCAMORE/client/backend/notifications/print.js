
Template.printNotification.helpers({
    'time': function(){
        return moment.unix(this.sendDate).format('MM/D/YY, h:mm A')
    },
    'urgent': function(){
        if(this.alert=='danger'){
            return true;
        }
    },
})
