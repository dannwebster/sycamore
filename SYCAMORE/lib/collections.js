//BLOG & NEWSLETTER
Blog = new Meteor.Collection('blog');
/* Blog Types
  1 - Blog Post
  2 - Newsletter Post
  3 - Press Release
  4 - Announcement?
*/
//required for invites (not invite me - temp users on family setup)
TempUsers = new Meteor.Collection('TempUsers');
FieldTripIdeas = new Meteor.Collection('FieldTripIdeas');
//PAGES & GENERAL CMS
Pages = new Meteor.Collection('pages');
PageSections = new Meteor.Collection('pagesections');
SliderImages = new Meteor.Collection('SliderImages');
//Forms = new Meteor.Collection('forms');
//FormData = new Meteor.Collection('formdata');

Families = new Meteor.Collection('families');
FamilyMembers = new Meteor.Collection('familymembers');


Notifications = new Meteor.Collection('notifications');
NotificationSubscribers = new Meteor.Collection('notificationsubs');

//SiteComments = new Meteor.Collection('')

Chats = new Meteor.Collection("chats");
Conversations = new Meteor.Collection("conversations");
MyConversations = new Meteor.Collection("myconversations");

//CALENDAR & EVENTS
CalendarEvents = new Meteor.Collection('CalendarEvents');
EventRSVP = new Meteor.Collection('eventRSVP');
/* Event Types
  1 - School Start Date
  2 - School End Date
  3 - School Break
  4 - School Holiday
  5 - School Event
  6 - Field Trips
  7 - Parent / Teacher Conferences
*/

//CLASSROOM ITEMS
Classrooms = new Meteor.Collection('classrooms');
Projects = new Meteor.Collection('projects');
ProjectUsers = new Meteor.Collection('projectusers');
ProjectGroups = new Meteor.Collection('projectgroups');

//GENERAL MESSAGING AND INBOX
//Inbox = new Meteor.Collection('inbox');
//Messages = new Meteor.Collection('messages');
//Announcements = new Meteor.Collection('announcements'); - Merge with Blog?

//FORUM POSTS & COMMENTING
ForumTopics = new Meteor.Collection('forumtopics');
ForumSubscribers = new Meteor.Collection('forumsubscribers');
ForumComments = new Meteor.Collection('forumcomments')

//ALL SITE COMMENTS
//Comments = new Meteor.Collection('comments');
/* Comment Types
  1 - Forum
  2 - Project
  3 - Announcement
  4 - Blog Post / Newsletter
  5 - Event
*/


StudentApplications = new Meteor.Collection('StudentApplications');

AppSettings = new Meteor.Collection('AppSettings');
