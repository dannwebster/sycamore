// SAFE FILE

// configure first upperclass users so we immediately have admin users for our app
Meteor.startup(function () {
	if (Meteor.users.find().fetch().length === 0) {
		
		var users = [
			{name:'Educator', email:'educator@example.com', roles:['educator']},
			{name:'Administrator', email:'srtucker22@gmail.com', roles:['superadmin']}
		];

		_.each(users, function (user) {
			console.log(user);

			var id = Accounts.createUser({
				email: user.email,
				password: 'apple1',
				profile: { name: user.name }
			});

			if (user.roles.length > 0) {
				// Need _id of existing user record so this call must come 
				// after `Accounts.createUser` or `Accounts.onCreate`
				Roles.addUsersToRoles(id, user.roles);
			}
		});
	}
});
