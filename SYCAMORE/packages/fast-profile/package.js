Package.describe({
  name: 'bashengine:fast-profile',
  version: '0.0.24',
  // Brief, one-line summary of the package.
  //summary: 'Fast Profile Pages with Image Upload, Email Update / Changes, Password Reset, & additional custom fields.',
  summary: '-- DEVELOPMENT --',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: null
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use('templating', 'client');
  api.use('handlebars', 'client');  
  api.use(["bashengine:s3-for-dream-objects"], ["client", "server"]);
  
  
  api.addFiles('server/fast-profile.js', 'server');
  api.addFiles('client/fast-profile-routes.js', 'client');
  api.addFiles('client/fast-profile.js', 'client');
  api.addFiles('client/fast-profile.html', 'client');
  
  
});

/*Package.onTest(function(api) {
  api.use('tinytest');
  api.use('bashengine:fast-profile');
  api.addFiles('fast-profile-tests.js');
});
*/

//Npm.depends();
