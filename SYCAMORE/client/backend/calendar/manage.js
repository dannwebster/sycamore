Template.manageSchoolYear.events({
    'calevents': function(){
        return CalendarEvents.find({},{sort: {start: 1}})
    }
})
Template.eventHold.helpers({
    'text':function(){
        if(this.sessionStart){
            return 'First Day of '+this.name+'!'
        }
        if(this.sessionEnd){
            return 'Last Day of '+this.name+'!'
        }
        if(this.break){
            return this.name;
        }
        if(this.holiday){
            return 'Holiday / Day Off';
        }
    },
    'dates':function(){
        if(this.sessionStart){
            return 'Session Begins '+moment.unix(this.start).format('MM/DD/YYYY')
        }
        if(this.sessionEnd){
            return 'Session Ends '+moment.unix(this.start).format('MM/DD/YYYY')
        }
        if(this.break){
            return 'Break Begins: '+moment.unix(this.start).format('MM/DD/YYYY')+'<br>Break Ends: '+moment.unix(this.end).format('MM/DD/YYYY');
        }
        if(this.holiday){
            return moment.unix(this.start).format('MM/DD/YYYY')
        }
    }
})
Template.eventHold.events({
    'click .delete': function(event,template){
        //if(template.data.) -> do someting with parents / children
        bootbox.confirm('Are you sure you want to remove this event?',function(result){
            if(result){
                CalendarEvents.remove(event.currentTarget.id);
            }
        });
    },
})
Template.manageSchoolSession.events({
    'click .create': function(event,template){
        var name = $('#name').val();
        var startDate = moment($('#start').val(), "MM/DD/YYYY h:mm A").format('X');
        var endDate = moment($('#end').val(), "MM/DD/YYYY h:mm A").format('X');
        var description = $('#description').val();

        if(name != '' && startDate != '' && endDate != ''){
            var data = {
                name: name,
                start: startDate,
                author: Meteor.userId(),
                created: moment().format('X'),
                description: description,
                eventType: 'sessionStart',
                sessionStart: true,
                admin: true
            }
            var pid = CalendarEvents.insert(data)
            if(pid){
                var data2 = {
                    name: name,
                    start: endDate,
                    parent: pid,
                    author: Meteor.userId(),
                    created: moment().format('X'),
                    eventType: 'sessionEnd',
                    sessionEnd: 'true',
                    admin:true
                }
                CalendarEvents.insert(data2,function(){
                    Router.go('manageSchoolYear');
                })
            }
        }else{
            bootbox.alert('You must fill out all fields.')
        }
    },
})
Template.manageSchoolBreaks.events({
    'click .create': function(event,template){
        var name = $('#name').val();
        var startDate = moment($('#start').val(), "MM/DD/YYYY h:mm A").format('X');
        var endDate = moment($('#end').val(), "MM/DD/YYYY h:mm A").format('X');
        var description = $('#description').val();
        if(name != '' && startDate != ''){
            var data = {
                name: name,
                start: startDate,
                end: endDate,
                author: Meteor.userId(),
                created: moment().format('X'),
                description: description,
                eventType: 'break',
                break: true,
                admin: true
            }
            CalendarEvents.insert(data,function(){
                Router.go('manageSchoolYear');
            })
        }else{
            bootbox.alert('You must fill out all fields.')
        }
    },
})

Template.manageSchoolHolidays.events({
    'click .create': function(event,template){
        var name = $('#name').val();
        var startDate = moment($('#start').val(), "MM/DD/YYYY h:mm A").format('X');
        var description = $('#description').val();

        if(name != '' && startDate != ''){
            var data = {
                name: name,
                start: startDate,
                author: Meteor.userId(),
                created: moment().format('X'),
                description: description,
                eventType: 'holiday',
                holiday: true,
                admin: true
            }
            CalendarEvents.insert(data,function(){
                Router.go('manageSchoolYear');
            })
        }else{
            bootbox.alert('You must fill out all fields.')
        }
    },
})
