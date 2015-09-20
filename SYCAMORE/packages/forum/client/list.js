Template.meForumTopicList.rendered = function(){
    //if(!this.data.data){
    //    Meteor.subscribe('meForum', this.data.type, Meteor.userId());
    //}
}
Template.meForumTopicList.helpers({
    'topic': function(){
        if(this.data){
            return this.data
        }
    }
})

Template.meForumTopicItem.helpers({
    'subscribers': function(){
        //var users = Meteor.users.find({_id: {$in: this.users}})
        return 5;
    },
    'time': function(){
        var now = moment();
        //if the time was less than 45 minutes ago
        if(moment.unix(this.last_post).add(45,'minutes') > now){
            return moment.unix(this.last_post).fromNow()
        }else if(moment.unix(this.last_post).add(45,'minutes') <= now && moment.unix(this.last_post) > moment().startOf('day')){
            return 'Today at '+moment.unix(this.last_post).format('h:mm A')
        }else if(moment.unix(this.last_post) < moment().startOf('day') && moment.unix(this.last_post) >= moment().subtract(1,'days').startOf('day')){
            return 'Yesterday at '+moment.unix(this.last_post).format('h:mm A')
        }else{
            return moment.unix(this.last_post).format('MM/D/YY [at] h:mm A')
        }

    }
})
