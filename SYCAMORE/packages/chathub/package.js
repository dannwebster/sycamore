Package.describe({
    name: 'meteorengine:chathub',
    version: '0.0.2',
    // Brief, one-line summary of the package.
    summary: 'IN DEVELOPMENT - public access not available',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.use("templating", "client");
    api.use(["momentjs:moment@2.10.0"], 'client');
    api.use(["ajduke:bootstrap-tagsinput@0.5.0"]);
    api.use(["fongandrew:find-and-modify@0.2.1"]);

    api.versionsFrom('1.1.0.2');
    api.addFiles('client/typeahead.js','client');
    api.addFiles(['client/list.html','client/list.js','client/form.html','client/form.js','client/compose.html','client/compose.js','client/style.css'],'client');
    api.addFiles(['client/hub.html','client/hub.js','client/chat.html','client/chat.js'],'client');

    api.addFiles('collection/chathub.js',['client','server']);
    api.addFiles(['server/chathub.js'],'server');

    api.export('ChatHub');
});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('meteorengine:chathub');
    //api.addFiles('chatcat-tests.js');
});
