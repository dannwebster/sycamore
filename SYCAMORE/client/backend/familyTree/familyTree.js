Template.treeList.helpers({
    'members': function(){
        var sorter = Session.get('famSort');
        var grabber = Session.get('famGrab');

        var members = new Array();
        var membersA = new Array();
        var membersB = new Array();

        if(sorter==='firstname'){
            var sort = {sort: {'profile.firstname': 1}}
        }else if(sorter==='lastname'){
            var sort = {sort: {'profile.lastname': 1}}
        }else{
            var sort = {sort: {'profile.firstname': 1}}
        }
        if(grabber){
            if(grabber==='all'){
                var grab = {}
            }else{
                var grab = {
                    roles: grabber
                }
            }
        }else{
            var grab = {roles: 'student'}
        }

        /*if(Session.get('famSearch')){
            var count = 1;
            var c = 1;
            var thelist = [];
            var allUsers = Meteor.users.find().fetch();
            var options = {
                keys: ['profile.firstname','profile.lastname','profile.username'],
                id: '_id'
            }
            var f = new Fuse(allUsers, options);
            var result = f.search(Session.get('famSearch'));
            Meteor.users.find({_id: {$in: result}}).forEach(function(i){
                i.indexCounter = count++;
                if(count % 2 == 0){
                    i.second = true;
                }
                thelist.push(i);
            });
        }else{*/
            var count = 1;
            var c = 1;
            var thelist = [];
            Meteor.users.find(grab,sort).forEach(function(i){
                i.indexCounter = count++;
                if(count % 2 == 0){
                    i.second = true;
                }
                thelist.push(i);
            });
        //}

        return thelist;
    }
});
Template.treeSnip.helpers({
    'familyMembers': function(){
        Meteor.subscribe('userFamilyMembers',this.user._id)
        var memberRecord = FamilyMembers.findOne({user: this.user._id})
        //Meteor.subscribe('familyMembers',this.memberRecord.family)
        if(memberRecord){
            var users = FamilyMembers.find({family: memberRecord.family})
            if(users){
                var members = new Array();
                var mainuser = this.user._id
                _.each(users.fetch(),function(member){
                    if(member.user != mainuser){
                        members.push(member.user)
                    }
                });
                Meteor.subscribe('usersArray',members)
                return Meteor.users.find({_id: {$in: members}})
            }else{
                var members = new Array();
                return Meteor.users.find({_id: {$in: members}});
            }

        }else{
            var members = new Array();
            return Meteor.users.find({_id: {$in: members}});
        }
    }
})
Template.treeSnip.events({
    'click .famView': function(event,template){
        var id = event.currentTarget.id;

        $('.famViewActive').hide();$('.famView').show();
        $('#'+id).hide();
        $('#active_'+id).show();

        $('.currentTree').removeClass('currentTree').promise().then(function(){
            $('.member_'+id).toggleClass('currentTree')
        });

        $('.famList').hide().promise().then(function(){
            $('#'+id+'_fam').toggle();
        })
    },
    'click .famViewActive': function(event,template){
        var id = event.currentTarget.id;
        var id = id.substring(7);
        console.log(id)
        $('#'+id).show();
        $('.famViewActive').hide();$('.famView').show();
        $('.currentTree').removeClass('currentTree').promise().then(function(){
            //$('.member_'+id).toggleClass('currentTree')
        });

        $('.famList').hide()
    },
})
Template.familyTree.events({
    'change #sorter': function(event,template){
        switch($('#sorter').val()){
            case 'first': Session.set('famSort','firstname'); break;
            case 'last': Session.set('famSort','lastname'); break;
            case 'students': Session.set('famGrab','student'); break;
            case 'parents': Session.set('famGrab','parent'); break;
            case 'edu': Session.set('famGrab','educator'); break;
            case 'all': Session.set('famGrab','all'); break;
        }
    },
    'change #viewer': function(event,template){
        switch($('#sorter').val()){
            case 'first': Session.set('famSort','firstname'); break;
            case 'last': Session.set('famSort','lastname'); break;
            case 'students': Session.set('famGrab','student'); break;
            case 'parents': Session.set('famGrab','parent'); break;
            case 'edu': Session.set('famGrab','educator'); break;
            case 'all': Session.set('famGrab','all'); break;
        }
    },
    'change #searcher': function(event,template){
        if($('#searcher').val()!=''){
            Session.set('famSearch',$('#searcher').val())
        }else{
            delete Session.keys['famSearch']
        }
    },
})
Template.familyTree.rendered = function(){
}
