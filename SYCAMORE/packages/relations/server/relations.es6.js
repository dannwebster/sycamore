// Write your package code here!
MErelations = {};

/**
* Create a new relationship
*	@param {Array} data - First element becomes the parent id or group id. Elements that will be linked.
*	@param {Array} options
* @param {Object} options.name - The name of the relationship
*/
MErelations.create = function (data, options) {
	try {
		check(data, Array);
		check(options, Object);
	} catch (e) {
		console.error(e.message);
	}
	// Keep note of the id and field that ties everything together
	let groupId = data[0]._id;
	let groupField = data[0].label;
	let formattedRelations = [];
	const name = options.name;

	data = _.drop(data);

	_.each(data, d => {
		formattedRelations.push({
			name,
			[d.label]: d._id,
			[groupField]: groupId
		});
	});
	_.each(formattedRelations, f => {
		ME_Relations.insert(f);
	});

	return this;
};

/**
*	Removes an existing relationship
* @param {Object} data - Elements to remove
* @param {Object} options
* @param {Object} options.name - Name of the relationship to remove
*/
MErelations.remove = function (data, options) {
	check(data, Match.OneOf(Object, undefined));
	check(options, Match.OneOf(Object, undefined));

	let methodName;
	const cb = options && options.cb;

	if (!!data) {
		methodName = 'MErelations-remove';
	} else {
		methodName = 'MErelations-removeAll';
	}

	Meteor.promise(methodName, data)
		.then(r => {
			if (cb) cb(r);

			if (!r)	return console.log('Failed to remove relationship(s)');

			console.log('Removed relation(s)');
		})
		.catch(e => {
			console.error(e.message);
		})

	return this;
};

MErelations.retrieve = function () {
	console.log('Retrieving relationship');
	return this;
};
