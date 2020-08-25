(function($,root){
    function renderImg(src){
        var img = new Image();
        img.src = src;
        img.onload = function(){
            $('.circle img').attr("src",src);
            root.blurImg(img, $('body'));
        }
    }

    function renderWord(info){
        var str = '<div class="name">'+ info.song +
        '</div><div class="singer">'+ info.singer +
        '</div><div class="go">'+ info.album +
        '</div>';
        $('.word').html(str);
    }

    function renderIslike(like){
        if(like){
            $('.like').addClass("liking");
        }else{
            $('.like').removeClass("liking");
        }
    }

    root.render = function(data){
        renderImg(data.image);
        renderWord(data);
        renderIslike(data.isLike);
    }
})(window.Zepto, window.player || (window.player = {}))