Template.editEvent.helpers({
    'start': function(){
        return moment.unix(this.event.start).format('MM-DD-YYYY h:mm a')
    },
    'end': function(){

            return moment.unix(this.event.end).format('MM-DD-YYYY h:mm a')
    },
    'epublic': function(){
        console.log(this.event)
        if(this.event.public){
            //$('#public').prop('checked', true);
            $('#public')[0].checked = true;
        }
    },
    'eallday': function(){
        if(this.event.allday){
            //$('#allday').prop('checked', true);
            $('#allday')[0].checked = true;
        }
    },
    'typeSelect': function(){
        var options = "<option value=''></option>";
        if(this.event.type == 'offsite'){
            options+= "<option value='offsite' selected>Off-Site Event</option>"
        }else{
            options+= "<option value='offsite'>Off-Site Event</option>"
        }
        if(this.event.type == 'onsite'){
            options+= "<option value='onsite' selected>In-School Event</option>"
        }else{
            options+= "<option value='onsite'>In-School Event</option>"
        }
        console.log(options)
        return options
    },
    'inviteSelect': function(){
        var options = '';
        if(this.event.guests == 'all'){
            options+= "<option value='all' selected>Everyone</option>"
        }else{
            options+= "<option value='all'>Everyone</option>"
        }
        if(this.event.guests == 'students'){
            options+= "<option value='students' selected>Students & Educators Only</option>"
        }else{
            options+= "<option value='students'>Students & Educators Only</option>"
        }
        if(this.event.guests == 'parents'){
            options+= "<option value='parents' selected>Parents & Educators Only</option>"
        }else{
            options+= "<option value='parents'>Parents & Educators Only</option>"
        }
        if(this.event.guests == 'educators'){
            options+= "<option value='educators' selected>Educators Only</option>"
        }else{
            options+= "<option value='educators'>Educators Only</option>"
        }
        if(this.event.guests == 'invited'){
            options+= "<option value='invited' selected>Invited Guests Only</option>"
        }else{
            options+= "<option value='invited'>Invited Guests Only</option>"
        }
        return options
    },
    'rsvpSelect': function(){
        var options = '';
        if(this.event.guests == 'none'){
            options+= "<option value='none' selected>No RSVP needed</option>"
        }else{
            options+= "<option value='none'>No RSVP needed</option>"
        }
        if(this.event.guests == 'optional'){
            options+= "<option value='optional' selected>RSVP Optional</option>"
        }else{
            options+= "<option value='optional'>RSVP Optional</option>"
        }
        if(this.event.guests == 'required'){
            options+= "<option value='required' selected>RSVP Required</option>"
        }else{
            options+= "<option value='required'>RSVP Required</option>"
        }
        return options
    }
})
Template.editEvent.events({
    'change #guests': function(event,template){
        var guests = $(event.target).val();
        if(guests=='invited'){
            $('.invitees').fadeIn();
        }else{
            $('.invitees').hide();
        }
    },
    'click .delete': function(event,template){


        Meteor.call('RemoveSpecialEvent',event.currentTarget.id,function(e,r){
            Router.go('manageEvents')
        })
    },
    'click .save': function(event,template){
        var name = $('#title').val();
        var type = $('#type').val();

        var start = moment($('#start').val(), "MM/DD/YYYY h:mm A").format('X');
        var end = moment($('#end').val(), "MM/DD/YYYY h:mm A").format('X');

        var description = $('#calendarContent').editable('getHTML', true, true);

        var guests = $('#guests').val();
        if(guests=='invited'){
            var invitees = $('#invitees').val();
        }
        var url = $('#url').val();
        var address = $('#address').val();
        var rsvp = $('#rsvp').val();

        var customFields = new Array();

        var count = 0;
        $('input[name^=customName]').each(function() {
            var mode = $(this).attr('mode')
            var options = $('.customOptions').eq(count).val()
            var description = $('.customDescription').eq(count).val()
            var cfield = {
                name: this.value,
                mode: mode,
                options: options,
                description: description
            }
            customFields.push(cfield)
            count++;
        });

        if(name != '' && start != ''){
            var data = {
                name: name,
                type: type,
                url: url,
                address: address,
                start: start,
                end: end,
                description: description,
                eventType: 'event',
                event: true,
                rsvp: rsvp,
                guests: guests,
                invitees: invitees,
                customFields: customFields
            }
            Meteor.call('UpdateSpecialEvent',data, template.data.event._id,function(){
                //Router.go('eventList');
            })
        }else{
            bootbox.alert('You must fill out all fields.')
        }
        //if(data.title==''){    $('.title').addClass('has-error')}

    },
    'click .removeField': function(event,template){
        $(event.target).closest('.customfieldrow').remove();
    },
    'change #customField': function(event,template){
        var field = $('#customField').val();
        if(field == ''){

        }else if (field =='text'){
            var data = "<div class='row customfieldrow'><hr><div class='col-lg-6'>";
            data +="<b>Custom Text Input</b><p>Name: <input type='text' name='customName[]' class='form-control customName' mode='text'></p>";
            data +="<input type='hidden' name='customOptions[]' class='form-control customOptions'>";
            data += "<div class='btn btn-sm btn-danger removeField'>Remove Field</div></div><div class='col-lg-6'>";
            data +="<p>Description (optional): <textarea type='textarea' class='form-control customDescription' name='customDescription[]'></textarea></p>";
            data +="</div></div>"
        }else if (field =='textarea'){
            var data = "<div class='row customfieldrow'><hr><div class='col-lg-6'>";
            data +="<b>Custom Textarea</b><p>Name: <input type='text' name='customName[]' class='form-control customName' mode='textarea'></p>";
            data +="<input type='hidden' name='customOptions[]' class='form-control customOptions'>";
            data += "<div class='btn btn-sm btn-danger removeField'>Remove Field</div></div><div class='col-lg-6'>";
            data +="<p>Description (optional): <textarea type='textarea' class='form-control customDescription' name='customDescription[]'></textarea></p>";
            data +="</div></div>"
        }else if (field =='select'){
            var data = "<div class='row customfieldrow'><hr><div class='col-lg-6'>";
            data +="<b>Custom Select</b><p>Name: <input type='text' name='customName[]' class='form-control customName' mode='select'></p>";
            data += "<div class='btn btn-sm btn-danger removeField'>Remove Field</div></div><div class='col-lg-6'>";
            data +="<p>Description (optional): <textarea type='textarea' class='form-control customDescription' name='customDescription[]'></textarea></p>";
            data +="<p>Select Options (required - seperate by commas): <textarea type='textarea' class='form-control customOptions' name='customOptions[]'></textarea></p>";
            data +="</div></div>"
        }else if (field =='radio'){
            var data = "<div class='row customfieldrow'><hr><div class='col-lg-6'>";
            data +="<b>Custom Radio</b><p>Name: <input type='text' name='customName[]' class='form-control customName' mode='select'></p>";
            data += "<div class='btn btn-sm btn-danger removeField'>Remove Field</div></div><div class='col-lg-6'>";
            data +="<p>Description (optional): <textarea type='textarea' class='form-control customDescription' name='customDescription[]'></textarea></p>";
            data +="<p>Select Options (required - seperate by commas): <textarea type='textarea' class='form-control customOptions' name='customOptions[]'></textarea></p>";
            data +="</div></div>"
        }else if (field =='checkbox'){
            var data = "<div class='row customfieldrow'><hr><div class='col-lg-6'>";
            data +="<b>Custom Checkbox</b><p>Name: <input type='text' name='customName[]' class='form-control customName' mode='select'></p>";
            data += "<div class='btn btn-sm btn-danger removeField'>Remove Field</div></div><div class='col-lg-6'>";
            data +="<p>Description (optional): <textarea type='textarea' class='form-control customDescription' name='customDescription[]'></textarea></p>";
            data +="<p>Select Options (required - seperate by commas): <textarea type='textarea' class='form-control customOptions' name='customOptions[]'></textarea></p>";
            data +="</div></div>"
        }

        if(field != ''){
            $('#customFields').append(data)
        }
    }
})
Template.editEvent.rendered = function(event,template){

    if(this.data.event.public){
        $('#public').prop('checked', true);
        //$('#public')[0].checked = true;
    }
    if(this.data.event.allday){
        $('#allday').prop('checked', true);
        //$('#public')[0].checked = true;
    }

    $('#calendarContent').editable({
        inlineMode: false,
        toolbarFixed: false,
        height: 550,
        buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'sep' , 'fontSize', 'color', 'sep', 'align', 'outdent', 'indent', 'insertOrderedList', 'insertUnorderedList','sep', 'selectAll', 'createLink', 'table', 'undo', 'redo', 'html', 'insertHorizontalRule', 'fullscreen'],
    });

    users = this.data.userlist;
    var Qusers = new Bloodhound({
        local: users,
        datumTokenizer: function(d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        identify: function(obj) { return obj.name; },
        queryTokenizer:  Bloodhound.tokenizers.whitespace
    });

    $("#invitees").tagsinput({
        itemValue: 'id',
        itemText: 'name',
        typeaheadjs: {
            name: 'Qusers',
            displayKey: 'name',
            source: Qusers.ttAdapter()
        }
    })
}
