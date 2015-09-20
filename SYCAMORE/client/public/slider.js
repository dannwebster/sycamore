Template.homeSlideItem.helpers({
    'status': function(){
        if(this.order===1){
            return 'active'
        }
    },
})

Template.homeSlider.helpers({
    'slideCount': function(){
        return SliderImages.find().count();
    },
    'slideButtons': function(){
        var count = SliderImages.find().count();

        var cur = 0;

        if(count > 1){
            var buttons = '';
            while (cur+1 <= count) {
                if(cur===0){
                    buttons += '<li data-target="#carousel-example-generic" data-slide-to="'+cur+'" class="active"></li>'
                }else{
                    buttons += '<li data-target="#carousel-example-generic" data-slide-to="'+cur+'"></li>'
                }
                cur++;
            }
            return buttons
        }else{
            return false;
        }
    }
})

Template.homeSlider.rendered = function(){
    var count = SliderImages.find().count();

    if(count > 1){
        $('.carousel').carousel({
            interval: 5000
        })
    }
}
