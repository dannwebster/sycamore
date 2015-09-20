Template.roster.helpers({
    settings: function () {
        return {
            collection: Meteor.users,
            rowsPerPage: 30,
            showFilter: true,
            fields: [
                { key: '_id', tmpl: Template.userMiniProfile },
                'username',
                'emails.0.address',
                { key: 'roles', label: 'Roles', tmpl: Template.userListRoles },
                { key: '_id', tmpl: Template.userListButtons }
            ]


        };
    },
    'showCreateUser': function(){
        if(Roles.userIsInRole(Meteor.user(), ['superadmin'])) {
            return true
        }else if(Roles.userIsInRole(Meteor.user(), ['educator'])) {
            return true
        }else{
            return false
        }
    },
    "files": function(){
        return S3.collection.find();
    }
});

Template.progressBar.helpers({
    progress: function () {
        return Math.round(this.uploader.progress() * 100);
    }
});
