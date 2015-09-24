Template.eventRSVPS.helpers({
	rsvps: function(){
		var list = this.event.rsvp_list;
		var userList = Meteor.users.find({_id: {$in: _.keys(list)}}, {emails: 1, profile: 1}).fetch();
		var res = _.map(userList, function(user){
			var data = {id: user._id};
			if(user.profile && user.profile.firstname){
				data.name = user.profile.firstname+' '+user.profile.lastname;
			} else if(user.emails && user.emails[0].address){
				data.name = user.emails[0].address;
			}
			data.status = list[user._id];
			return data;
		});
		return res;
	}
});