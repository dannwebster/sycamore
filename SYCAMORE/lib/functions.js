
Handlebars.registerHelper('switchSwatch', function () {
    colorSwatch(Router.current().route.getName())
});

Handlebars.registerHelper('iter', function (context, options) {
    var ret = "";

    for (var i = 0, j = context.length; i < j; i++) {
        ret += options.fn($.extend(context[i], {position: i + 1}));
    }

    return ret;
});

getMyEvents2 = function(){
    Meteor.subscribe('adminEvents',12345)
    var calendarEvents = CalendarEvents.find().fetch();

    if(calendarEvents){
        var data = new Array();
        _.each(calendarEvents, function(event){
            var event_data = {
                title: event.name,
                start: moment.unix(event.start).format(),
                className: event.eventType
            }

            if(event.eventType == 'sessionStart'){
                event_data.title = 'Start of '+event.name
            }
            if(event.eventType == 'sessionEnd'){
                event_data.title = 'End of '+event.name
            }

            if(event.admin){
                event_data.allDay = true
            }else{
                event_data.end = moment.unix(event.end).format('MM-DD-YYYY h:mm a');
            }

            data.push(event_data)
        })
        Session.set('calevents',data)
        return data
    }
}

scrollMeAlt = function(element,distance){
    if(distance){
        var diff = $(element+' > div').innerHeight() - $(element).scrollTop();
        if(diff < distance){
            $(element).scrollTop($(element+' > div').innerHeight());
        }
    }else{
        //console.log('called')
        $(element).scrollTop($(element+' > div').innerHeight());
    }
}

scrollMe = function(element){
    //console.log($(element).scrollTop())
    //console.log($(element+' > div').innerHeight())
    var diff = $(element+' > div').innerHeight() - $(element).scrollTop();
    //console.log(diff)
    if(diff < 650){
        $(element).scrollTop($(element+' > div').innerHeight());
    }
}

scrollMe3 = function(element){
    if($(element+' > div').innerHeight() > Session.get('SC_last_height')){
        if($(element).scrollTop() >= Session.get('SC_position')){
            //$(element).scrollTop($(element+' > div').innerHeight());
            $(element).animate({ scrollTop: $(element+' > div').innerHeight()   });

            Session.set('SC_position', $(element).scrollTop());
            Session.set('SC_last_height', $(element+' > div').innerHeight())
            Session.set('SC_last_position', $(element+' > div').innerHeight())
        }else{
            $('.newMessageIndicator').fadeIn();
        }
    }
}

myFam = function (){
    Meteor.subscribe('userFamilyMembers',Meteor.userId(),{
        onReady: function(){
            var user = FamilyMembers.findOne({user: Meteor.userId()});
            var mem = FamilyMembers.find({family: user.family}).fetch();
            var members = new Array();

            _.each(mem,function(record){
                members.push(record.user)
            });
            console.log(members)
            return members;
        }
    });
}
myFamParents = function (){
    Meteor.subscribe('userFamilyMembers',Meteor.userId(),{
        onReady: function(){
            var user = FamilyMembers.findOne({user: Meteor.userId()});
            var mem = FamilyMembers.find({family: user.family}).fetch();
            var members = new Array();

            _.each(mem,function(record){
                if(Roles.userIsInRole(record.user,'parent')){
                    members.push(record.user)
                }
            });
            console.log(members)
            return members;
        }
    });
}
myFamChildren = function (){
    Meteor.subscribe('userFamilyMembers',Meteor.userId(),{
        onReady: function(){
            var user = FamilyMembers.findOne({user: Meteor.userId()});
            var mem = FamilyMembers.find({family: user.family}).fetch();
            var members = new Array();

            _.each(mem,function(record){
                if(Roles.userIsInRole(record.user,'student')){
                    members.push(record.user)
                }
            });
            console.log(members)
            return members;
        }
    });
}

Handlebars.registerHelper('inFamily', function (user) {
    var fam = myFam();
    console.log('<><><><><><><><><><><><><><><><>')
    console.log(fam)
    if(fam.indexOf(user) > -1 || Roles.userIsInRole(Meteor.userId(),'educator') || Roles.userIsInRole(Meteor.userId(),'superadmin')){
        return true;
    }else{
        return false;
    }
});

Handlebars.registerHelper('allInfamily', function (user) {
    var members = new Array();

    if(Roles.userIsInRole(Meteor.userId(),'educator') || Roles.userIsInRole(Meteor.userId(),'student')){
        _.each(mem,function(record){
            members.push(Meteor.userId())
        });
    }else{
        var user = FamilyMembers.findOne({user: Meteor.userId()});
        var mem = FamilyMembers.find({family: user.family}).fetch();
        var members = new Array();

        _.each(mem,function(record){
            members.push(record.user)
        });
    }

    return members;
});

Handlebars.registerHelper('isInRole', function() {
    return Roles.userIsInRole(Meteor.userId(), _.filter(arguments, function(e){ return typeof e === 'string';}));
});

Handlebars.registerHelper('formatDate', function(date) {
    return moment.unix(date).format('MMM DD, YYYY hh:mm A');
});

var blogTypes = new Array();
blogTypes[1] = 'blog';          blogTypes['blog'] = 1;
blogTypes[2] = 'newsletter';    blogTypes['newsletter'] = 2;
blogTypes[3] = 'press';          blogTypes['press'] = 3;
blogTypes[4] = 'announcement';  blogTypes['announcement'] = 4;
blogTypes[5] = 'page';          blogTypes['page'] = 5;

getType = function(typecode){
    return blogTypes[typecode];
}

var blogTitle = new Array();
blogTitle[1] = 'Blog Post';       blogTitle['blog'] = 'Blog Post';
blogTitle[2] = 'Newsletter';      blogTitle['newsletter'] = 'Newsletter';
blogTitle[3] = 'Press Release';   blogTitle['press'] = 'Press Release';
blogTitle[4] = 'Announcement';    blogTitle['announcement'] = 'Announcement';
blogTitle[5] = 'Page';            blogTitle['page'] = 'Page';

getTypeTitle = function(typecode){
    return blogTitle[typecode];
}

var projectStat = new Array();
projectStat[0] = 'Draft';       projectStat['blog'] = 'Blog Post';
projectStat[1] = 'Current';      projectStat['newsletter'] = 'Newsletter';
projectStat[2] = 'Past';   projectStat['press'] = 'Press Release';

getProjectStatus = function(status){
    return projectStat[status];
}
