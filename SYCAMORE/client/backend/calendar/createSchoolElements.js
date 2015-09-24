// SAFE FILE -- to be honest, nothing here is safe, but some things are safer than others

Template.createSchoolSession.events({
    'click .create': function(event,template){
        var name = $('#name').val();
        var startDate = moment($('#start').val(), "MM/DD/YYYY h:mm A").format('X');
        var endDate = moment($('#end').val(), "MM/DD/YYYY h:mm A").format('X');
        var description = $('#description').val();

        if(name !== '' && startDate !== '' && endDate !== ''){
            var data = {
                name: name,
                start: startDate,
                end: endDate,
                owner: Meteor.userId(),
                description: description,
                type: 'session',
                public: true
            };
            CalendarEvents.insert(data);
            Router.go('manageSchoolYear');
        }else{
            bootbox.alert('You must fill out all fields.');
        }
    },
});

Template.createSchoolBreak.events({
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
                owner: Meteor.userId(),
                description: description,
                type: 'break',
                public: true
            };
            CalendarEvents.insert(data)
            Router.go('manageSchoolYear');
        }else{
            bootbox.alert('You must fill out all fields.');
        }
    },
});

Template.createSchoolHoliday.events({
    'click .create': function(event,template){
        var name = $('#name').val();
        var startDate = moment($('#start').val(), "MM/DD/YYYY h:mm A").format('X');
        var description = $('#description').val();

        if(name !== '' && startDate !== ''){
            var data = {
                name: name,
                start: startDate,
                owner: Meteor.userId(),
                description: description,
                type: 'holiday',
                public: true
            };
            CalendarEvents.insert(data);
            Router.go('manageSchoolYear');
        }else{
            bootbox.alert('You must fill out all fields.');
        }
    },
});