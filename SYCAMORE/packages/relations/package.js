Package.describe({
  name: 'meteorengine:relations',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  // Dependencies
  api.use('mongo');
  api.use(['grigio:babel@0.1.6', 'deanius:promise@2.2.0']);

  api.addFiles('client/relations.es6.js', 'client');
  api.addFiles('lib/collections.es6.js', ['client', 'server']);
  api.addFiles('lib/relations.es6.js', ['client', 'server']);
  api.addFiles('lib/methods.es6.js', ['client', 'server']);
  api.addFiles('server/relations.es6.js', 'server');

  api.export(['MErelations', 'ME_Relations']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('relations');
  api.addFiles('relations-tests.js');
});
