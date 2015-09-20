Accounts.config({
	//sendVerificationEmail: true
});

process.env.MAIL_URL="smtp://info@sycamore-school.org:sycserver20!5@smtp.gmail.com:465/";


Accounts.emailTemplates = {
	from: "Sycamore Dev <info@sycamore-school.org>",
	siteName: Meteor.absoluteUrl().replace(/^https?:\/\//, '').replace(/\/$/, ''),
	enrollAccount: {
		subject: function(){ return "Set your Sycamore School Password"	},
		html: function(user, url) {
			var url = url.replace('http://localhost:3000/#/','http://sycamore-school.org/invitation/');

		   return '<html><body><a href="'+url+'"><img src="https://s3-us-west-2.amazonaws.com/sycamore-la/chatfiles/0f9e874e-e1c5-4317-9fa6-3035c1058f83.jpg" width="600"></a></body></html>';

	   },
	   text: function(user, url) {
		   var url = url.replace('http://localhost:3000/#/','http://sycamore-school.org/invitation/');

		  return 'Please set your password by clicking the link below: '+url;

	  }

	},
	verifyEmail: {
		subject: function(user) {
			return "Please verify your email for your account on " + Accounts.emailTemplates.siteName;
		},
		text: function(user, url) {
			//REMOVE NEXT LINE WHEN READY TO LAUNCH
			var url = url.replace('http://localhost:3000/#/','http://sycamore-107107.nitrousapp.com:3000/');

			var greeting = (user.profile && user.profile.name) ?
				("Hello " + user.profile.name + ",") : "Hello,";
			return greeting + "\n"
			+ "\n"
			+ "To verify your account email, simply click the link below.\n"
			+ "\n"
			+ url + "\n"
			+ "\n"
			+ "Thanks.\n";
		}
	}
}

Meteor.methods({
	'sendFormEmail': function(name,email,message){
		var options = {
            from: 'Sycamore School <info@sycamore-school.org>',
            to: 'davidryanspeer@gmail.com',
            subject: 'Website Message',
            html: "<p>You've received a new message on the website. You can view it's contents below.</p><p>---------------------------------</p><p><b>From: "+email+"</b></p><p>"+message+"</p>",
            headers: "Content-Type: text/html; charset=ISO-8859-1\r\n"
        }
        Email.send(options)

		var options2 = {
            from: 'Sycamore School <info@sycamore-school.org>',
            to: email,
            subject: 'Website Message',
            html: "<p>Thank you for your message to the Sycamore School. You can view a copy of your email below.</p><p>---------------------------------</p>"+message,
            headers: "Content-Type: text/html; charset=ISO-8859-1\r\n"
        }
        Email.send(options2)
	},
	'emailAdminApplication':function(data){
		var message = "<p>You've received a new student application on the website. You can view it's contents below or via the admin portal.</p><p>---------------------------------</p>";
		message +="<p><b>Student Name: </b>"+data.student_name+"</p>";
		message +="<p><b>Birthday: </b>"+data.dob+"</p>";
		message +="<p><b>Parents: </b>"+data.parent_1+" "+data.parent_2+"</p>";
		message +="<p><b>Address: </b>"+data.address+"</p>";
		message +="<p><b>Phone: </b>"+data.phone+"</p>";
		message +="<p><b>Email: </b>"+data.email+"</p>";
		message +="<p><b>Current School: </b>"+data.current_school+"</p>";
		message +="<p><b>What is driving your search for an alternative approach to education for your child?: </b>"+data.why+"</p>";
		message +="<p><b>What are your child's passions/interests?: </b>"+data.passions+"</p>";
		message +="<p><b>What kinds of activities do you like to do as a family?: </b>"+data.activities+"</p>";
		message +="<p><b>Describe your child at play: </b>"+data.play+"</p>";
		message +="<p><b>Describe your child's ideal learning environment: </b>"+data.learning+"</p>";
		message +="<p><b>What kinds of enrichment activites would you like for your child?: </b>"+data.enrichment+"</p>";


		var options = {
            from: 'Sycamore School <info@sycamore-school.org>',
            to: 'davidryanspeer@gmail.com',
            subject: 'Student Application',
            html: message,
			text: message,
			headers: "Content-Type: text/html; charset=ISO-8859-1\r\n"
        }
        Email.send(options)
	}
})

//Accounts.sendEnrollmentEmail('7CTmhJZvAsqAK2Ao3')
