Template.manageFamily.helpers({
    'family': function(){
        var record = this.memberRecord.family;
        return Families.findOne({_id: record})
    },
    'families': function(){
        var families = Families.find();
        return {
            families: families,
            count: families.count()
        }
    },
    'members': function(){
        var record = this.memberRecord.family;
        Meteor.subscribe('familyMembers',record)
        var users = FamilyMembers.find({family: record})
        var members = new Array();
        _.each(users.fetch(),function(member){
            members.push(member.user)
        });
        var data = {
            parents: Meteor.users.find({_id: {$in: members},roles: 'parent'}),
            children: Meteor.users.find({_id: {$in: members},roles: 'student'}),
            edufam: Meteor.users.find({_id: {$in: members},roles: 'educator'}),
            adults: Meteor.users.find({_id: {$nin: members},roles: 'parent'}),
            educators: Meteor.users.find({_id: {$nin: members},roles: 'educator'}),
            students: Meteor.users.find({_id: {$nin: members},roles: 'student'})
        }
        return data;
    },
})
Template.manageFamily.rendered = function(){
}
Template.manageFamily.events({
    'click .addParents': function(event,template){
        $('.search').hide().promise().then(function(){
            $('#searchAdults').show();
        })
    },
    'click .remove': function(event,template){
        Meteor.call('removeFamily',event.currentTarget.id)
    },
    'click .addChildren': function(event,template){
        $('.search').hide().promise().then(function(){
            $('#searchKids').show();
        })
    },
    'click .createFamily': function(event,template){
        bootbox.prompt("Give this family a name: (i.e. The Robinson's)", function(result) {
            if (result != null) {
                Meteor.call('createFamily',result,template.data.user._id)
            }
        });
    },
    'click .removeMember': function(event,template){
        var count = FamilyMembers.find({family: template.data.memberRecord.family}).count()
        if(count>1){
            bootbox.confirm("Are you sure?", function(result) {
                if(result){
                    var user = event.currentTarget.id
                    Meteor.call('leaveFamily',template.data.memberRecord.family,user)
                }
            });
        }else{
            bootbox.confirm("Are you sure? This will delete the entire family.", function(result) {
                if(result){
                    Meteor.call('removeFamily',template.data.memberRecord.family)
                }
            });
        }
    },
    'click .addMember': function(event,template){
        var user = event.currentTarget.id;
        console.log(template.data.memberRecord.family+' --- '+user)
        Meteor.call('joinFamily',template.data.memberRecord.family,user)
    },
    'click .joinFamily': function(event,template){
        var family = event.currentTarget.id
        console.log(family)
        Meteor.call('joinFamily',family,template.data.user._id)
    }
})
