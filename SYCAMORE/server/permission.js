AppSettings.permit(['update']).ifHasRole('superadmin').apply();
AppSettings.permit(['update']).ifHasRole('educator').apply();

StudentApplications.permit(['insert']).apply();

StudentApplications.permit(['update','insert','remove']).ifHasRole('educator').apply();
StudentApplications.permit(['update','insert','remove']).ifHasRole('superadmin').apply();


TempUsers.permit(['update','insert','remove']).ifLoggedIn().apply();

SliderImages.permit(['update','insert','remove']).ifHasRole('educator').apply();
SliderImages.permit(['update','insert','remove']).ifHasRole('superadmin').apply();

Blog.permit(['update','insert','remove']).ifHasRole('superadmin').apply();

Blog.permit(['update','insert','remove']).ifHasRole('educator').apply();

Projects.permit(['update','insert','remove']).ifHasRole('educator').apply();
ProjectUsers.permit(['update','insert','remove']).ifHasRole('educator').apply();

Chats.permit(['update','insert']).ifLoggedIn().apply();
Conversations.permit(['update','insert']).ifLoggedIn().apply();
MyConversations.permit(['update','insert']).ifLoggedIn().apply();

ProjectUsers.permit(['update']).ifLoggedIn().apply();
ProjectGroups.permit(['update','insert','remove']).ifHasRole('educator').apply();

ForumTopics.permit(['update','insert']).ifLoggedIn().apply();
ForumSubscribers.permit(['insert','remove']).ifLoggedIn().apply();
ForumComments.permit(['insert']).ifLoggedIn().apply();

Meteor.users.permit(['update','insert']).ifHasRole('educator').apply();
Meteor.users.permit(['update','insert','remove']).ifHasRole('superadmin').apply();
Meteor.users.permit(['update']).ifHasRole('parent').apply();

CalendarEvents.permit(['update','insert','remove']).ifHasRole('educator').apply();
CalendarEvents.permit(['update','insert','remove']).ifHasRole('superadmin').apply();

Families.permit(['update','insert','remove']).ifHasRole('educator').apply();
FamilyMembers.permit(['update','insert','remove']).ifHasRole('educator').apply();
FamilyMembers.permit(['update','insert','remove']).ifHasRole('superadmin').apply();

Notifications.permit(['update','insert','remove']).ifHasRole('educator').apply();
Notifications.permit(['update','insert','remove']).ifHasRole('superadmin').apply();

NotificationSubscribers.permit(['update','insert','remove']).ifHasRole('educator').apply();
NotificationSubscribers.permit(['update','insert','remove']).ifHasRole('superadmin').apply();
