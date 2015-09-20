Template.adminConsole.helpers({
    'alert': function(){
        var settings = AppSettings.findOne();
        return settings.alert;
    }
})
Template.adminConsole.events({
    'change #alert': function(event,template){
        var alert = $.trim($('#alert').val());
        var config = AppSettings.findOne();
        
        if(alert === ''){
            AppSettings.update(config._id,{$set: {alert: ''}});
        }else{
            AppSettings.update(config._id,{$set: {alert: alert}});
        }

    },
})
