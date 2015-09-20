Template.Chats.helpers({
    'chats': function(){
        Meteor.subscribe('Chats',this.conversation)
        scrollMe('.chatHolder')
        return Chats.find({conversation: this.conversation},{sort: {timestamp: 1}})
    },
    'chatCount': function(){
        return Chats.find({conversation: this.conversation},{sort: {timestamp: 1}}).count();
    }
});

Template.Chats.events({
    'change #chatCount': function(){
        scrollMe('.chatHolder')
    },
    'click .addChat': function(event,template){
        scrollMe('.chatHolder')
    },
})


Template.Topics.helpers({
    'chats': function(){
        Meteor.subscribe('Topics',this.type,this.uid)
        scrollMe('.chatHolder')
        return Chats.find()
    }
});

Template.Chat.helpers({
    'time': function(){
        if(moment.unix(this.timestamp).startOf('day').format('X') === moment().startOf('day').format('X') ){
            return {
                display: moment.unix(this.timestamp).format('[<br>]h:mm A'),
                class: 'today'
            }
        }else{
            return {
                display: moment.unix(this.timestamp).format('MM/DD/YY'),
                class: 'nottoday'
            }
        }
    },
    'user': function(){
        var user = Meteor.users.findOne(this.user)
        return user;
    },
    'self': function(){
        if(this.user===Meteor.userId()){
            return true;
        }
    }
})

Template.fileDisplay.helpers({
    'doc': function(){
        getIcon = function(filetype){
            switch(filetype){
                case 'xlsx': return 'file-excel-o'; break;
                case 'xls': return 'file-excel-o'; break;
                case 'pdf': return 'file-pdf-o'; break;
                case 'doc': return 'file-word-o'; break;
                case 'docx': return 'file-word-o'; break;
                case 'txt': return 'file-text-o'; break;
                case 'pptx': return 'file-powerpoint-o'; break;
                case 'ppt': return 'file-powerpoint-o'; break;
                default: return 'file'
            }
        }
        var doc = this.file;
        var data = {
            link: doc.secure_url,
            name: doc.file.original_name
        }

        var parts = doc.file.name.split('.')
        var type = parts[1]
        if(type=='jpeg'||type=='png'||type=='gif'||type=='jpg'){
            data.type = 'image';
            data.image = true;
        }else{
            data.type = parts[1],
            data.icon = getIcon(parts[1])
        }
        //console.log(data)
        return data
    }
})

Template.listFileDisplay.helpers({
    'doc': function(){
        getIcon = function(filetype){
            switch(filetype){
                case 'xlsx': return 'file-excel-o'; break;
                case 'xls': return 'file-excel-o'; break;
                case 'pdf': return 'file-pdf-o'; break;
                case 'doc': return 'file-word-o'; break;
                case 'docx': return 'file-word-o'; break;
                case 'txt': return 'file-text-o'; break;
                case 'pptx': return 'file-powerpoint-o'; break;
                case 'ppt': return 'file-powerpoint-o'; break;
                default: return 'file'
            }
        }
        var doc = this.file;
        var data = {
            link: doc.secure_url,
            name: doc.file.original_name
        }

        var parts = doc.file.name.split('.')
        var type = parts[1]
        if(type=='jpeg'||type=='png'||type=='gif'||type=='jpg'){
            data.type = 'image';
            data.image = true;
        }else{
            data.type = parts[1],
            data.icon = getIcon(parts[1])
        }
        //console.log(data)
        return data
    }
})
