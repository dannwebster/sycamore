Meteor.methods({
	'MErelations-remove' (options) {
		check(options, Object);

		// TODO: add security
		return ME_Relations.remove(options);
	},
	'MErelations-removeAll' () {
		// TODO: add security

		return ME_Relations.remove({});
	}
});