Template.eventHolder.helpers({
    'dates':function(){
        return moment.unix(this.start).format('MM/DD/YYYY')
    }
})
