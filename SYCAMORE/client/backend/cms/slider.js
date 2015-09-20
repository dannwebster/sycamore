Template.frontSlider.helpers({
    "files": function(){
        return S3.collection.find({percent_uploaded: {$lt: 100}});
    },
})
Template.frontSlider.events({
    'change #newphoto': function(event,template){
        var files = $("#newphoto")[0].files;
        S3.upload({
            files:files,
            path:"slider"
        },function(error,result){
            if(error){
                console.log(error);
            }else{
                SliderImages.insert(result)
            }
        });
    },
    'click .single_slide': function(event,template){
        Session.set('sliderSelected',event.currentTarget.id);
    },
})

Template.frontSlider.rendered = function(){
    $( ".dragDrop" ).sortable({
        stop: function( event, ui ) {
            var count = 0;
            $('.single_slide').each(function(){
                var id = $(this).attr('id');
                count++
                SliderImages.update({_id: id},{$set: {  order: count }})
            })
        }
    });
}

Template.sliderInfo.helpers({
    'sliderSelected': function(){
        return Session.get('sliderSelected')
    },
    'select': function(){
        return SliderImages.findOne(Session.get('sliderSelected'))
    }
})

Template.sliderInfo.events({
    'click .remove': function(event,template){
        var id = Session.get('sliderSelected')
        SliderImages.remove(id)
    },
    'change #title': function(event,template){
        var id = Session.get('sliderSelected')
        if($('#title').val()== ''){
            SliderImages.update({_id: id},{$unset: {  title: null }})
        }else{
            SliderImages.update({_id: id},{$set: {  title: $('#title').val() }})
        }
    },
    'change #content': function(event,template){
        var id = Session.get('sliderSelected')
        if($('#content').val()== ''){
            SliderImages.update({_id: id},{$unset: {  content: null }})
        }else{
            SliderImages.update({_id: id},{$set: {  content: $('#content').val() }})
        }
    },
    'change #link_text': function(event,template){
        var id = Session.get('sliderSelected')
        if($('#link_text').val()== ''){
            SliderImages.update({_id: id},{$unset: {  link_text: null }})
        }else{
            SliderImages.update({_id: id},{$set: {  link_text: $('#link_text').val() }})
        }
    },
    'change #link_url': function(event,template){
        var id = Session.get('sliderSelected')
        if($('#link_url').val()== ''){
            SliderImages.update({_id: id},{$unset: {  link_url: null }})
        }else{
            SliderImages.update({_id: id},{$set: {  link_url: $('#link_url').val() }})
        }
    }
})
