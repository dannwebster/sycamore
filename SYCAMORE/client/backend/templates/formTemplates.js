Template.dateTimeTemplate.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
});

Template.dateTemplate.onRendered(function() {
    this.$('.datetimepicker').datetimepicker({timepicker:false});
});
