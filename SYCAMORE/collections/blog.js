Meteor.methods({
	'newPost': function(type){
		var data = {
			title: 'New '+type,
			type: type
		}
		var post = Blog.insert(data)
		console.log(post)
	}
})