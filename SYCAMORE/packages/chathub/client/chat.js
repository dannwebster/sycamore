Template.MEchathub_chats.helpers({
    'chats': function(){
        Meteor.subscribe('ME_ChatHub_Chats',Session.get('convo'))

        return MEchathub_chats.find({conversation: Session.get('convo')},{sort: {createdAt: -1}})
    },
    'scrollchat': function(){
        var elem = document.getElementById('ME_CONVERSATION');
        elem.scrollTop = elem.scrollHeight;
    }
});

Template.MEchathub_topics.helpers({
    'chats': function(){
        Meteor.subscribe('ME_ChatHub_Topics',this.type,this.uid)
        return MEchathub_chats.find()
    },
    'scrollchat': function(){
        var elem = document.getElementById('ME_CONVERSATION');
        elem.scrollTop = elem.scrollHeight;
    }
});

Template.MEchathub_chat.helpers({
    'time': function(){
        if(moment.unix(this.timestamp).startOf('day').format('X') === moment().startOf('day').format('X') ){
            return moment.unix(this.timestamp).format('[<br>]h:mm A')
        }else{
            return moment.unix(this.timestamp).format('MM/DD/YY')
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

Template.MEchathub_fileDisplay.helpers({
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
        console.log(data)
        return data
    }
})

Template.MEchathub_chats.rendered = function(){

        var elem = document.getElementById('ME_CONVERSATION');
        elem.scrollTop = elem.scrollHeight;
}
