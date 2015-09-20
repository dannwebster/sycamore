Template.newEvent.helpers({

})
Template.newEvent.events({
    'change #guests': function(event,template){
        var guests = $(event.target).val();
        if(guests=='invited'){
            $('.invitees').fadeIn();
        }else{
            $('.invitees').hide();
        }
    },
    'click .create': function(event,template){
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
                author: Meteor.userId(),
                created: moment().format('X'),
                description: description,
                eventType: 'event',
                event: true,
                rsvp: rsvp,
                guests: guests,
                invitees: invitees,
                customFields: customFields
            }

            if(document.getElementById('public').checked) {
                data.public = true;
            }

            if(document.getElementById('allday').checked) {
                data.allday = true;
            }

            Meteor.call('CreateSpecialEvent',data, Meteor.userId(),function(){
                Router.go('manageEvents');
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
Template.newEvent.rendered = function(){
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
