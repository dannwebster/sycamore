//CONTENT VIEWER
//BLOGS, ANNOUNCEMENTS, NEWS, ETC POSTS
Meteor.publish('contentViews', function(returnType,type,param2) {
    if(returnType=='list'){
        if(param2=='all'){
            var data = {
                type: getType(type)
            }
        }else{
            if(param2==='drafts'){  var stat = 'draft'}
            else{  var stat = param2;      }
            var data = {
                type: getType(type),
                status: stat
            }

        }
    }
    if(returnType=='single'){
        var data = param2
    }

    return Blog.find(data);
});

Meteor.publish('SliderImages', function() {
    return SliderImages.find();
});

//PAGES
Meteor.publish('pageViews', function(returnType,type,param2) {
    if(returnType=='list'){
        if(param2=='all'){
            var data = {
                type: getType(type)
            }
        }else{
            if(param2==='drafts'){  var stat = 'draft'}
            else{  var stat = param2;      }
            var data = {
                type: getType(type),
                status: stat
            }

        }
    }
    if(returnType=='single'){
        var data = {  url:  param2  }
    }

    return Blog.find(data);
});

Meteor.publish('allPages', function() {
    return Blog.find({type: 5});
});

Meteor.publish('homeContent', function() {
    return Blog.find({type: 5});
});
