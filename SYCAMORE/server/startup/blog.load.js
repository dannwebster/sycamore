// SAFE FILE

// configure blog posts so this thing doesn't break -- jeebus everything about this app is broken
Meteor.startup(function () {
	if (Blog.find().fetch().length === 0) {
		var blogs = JSON.parse(Assets.getText("blogs.json")).data;
		_.each(blogs, function(blog){
			Blog.insert(blog);
		});
	}
});