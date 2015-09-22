# sycamore

meteor application for the sycamore school. published at <a href="sycamore-school.org">sycamore-school.org</a>

## Installation

1. Clone the project <code>git clone https://github.com/srtucker22/sycamore.git</code>
2. Go to the primary directory <code>cd sycamore/SYCAMORE</code>
3. Add a settings.json to the primary directory <code>touch settings.json</code>
4. Add your personal settings for the following services included in sycamore. You will need to create a Google project with Embedded Maps API access

        {
          "public": {
            "google": {
              "api_key": "YOUR_API_KEY"
            }
          }
        }

6. run the app from <code>cd sycamore/SYCAMORE</code> with the settings <code>meteor --settings settings.json</code>
7. enjoy at your own risk...

## Deploying

Deploy with MUP. Requires a <code>mup.json</code> file. Example file:

      {
        // Server authentication info
        "servers": [
          {
            "host": "YOUR_HOST_URL",
            "username": "root", // or your access username
            "password": "YOUR_PASSWORD"
          }
        ],

        "setupMongo": true,  // Install MongoDB in the server, does not destroy local MongoDB on future setup
        "setupNode": true,  // WARNING: Node.js is required! Only skip if you already have Node.js installed on server.
        "nodeVersion": "0.10.36", // WARNING: If nodeVersion omitted will setup 0.10.36 by default. Do not use v, only version number.
        "setupPhantom": false, // Install PhantomJS in the server
        "appName": "SycamoreSchool",  // Application name (No spaces)
        "app": ".", // Location of app (local directory)
        "env": {
          "ROOT_URL": "YOUR_ROOT_URL" // Configure environment
        },
        "deployCheckWaitTime": 15,
         "enableUploadProgressBar": true
      }

We're gonna deploy to a Digital Ocean instance. More here when I figure out a nice deployment process.