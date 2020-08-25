var root = window.player;
var control;
var dataList;
var len;
var audio = root.audioManage;
var timer = null;
function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            console.log(data);
            dataList = data;
            len = data.length;
            control = new root.indexControl(len);
            audio.getAudio(data[0].audio);
            root.render(data[0]);
            root.pro.renderTime(dataList[0].duration);
            bindEvent();
            bindTouch();
        },
        error: function () {
            console.log("error");
        }
    })
}

function bindEvent() {
    $('body').on('play:change', function (e, i) {
        audio.getAudio(dataList[i].audio);
        root.render(dataList[i]);
        root.pro.renderTime(dataList[i].duration);

        if (audio.status == 'play') {
            rotated(0);
            audio.play();
            root.pro.start(0);
        } else {
            root.pro.update(0);
        }
        $('.circle').attr('data-deg', 0);
        $('.circle').css({
            'transform': 'rotateZ(0)',
            'transition': 'none'
        })
    })
    $('.pre').on('click', function () {
        var i = control.prev();
        $('body').trigger('play:change', i);
        root.pro.start(0);
        if (audio.status == 'pause') {
            root.pro.stop();
            audio.pause();
        }
        $('.list').attr("is-click", "false");
            $('ul').css({ "display": "none" });
    });
    $('.next').on('click', function () {
        var i = control.next();
        $('body').trigger('play:change', i);
        root.pro.start(0);
        if (audio.status == 'pause') {
            root.pro.stop();
            audio.pause();
        }
        $('.list').attr("is-click", "false");
            $('ul').css({ "display": "none" });
    });
    $('.play').on('click', function () {
        if (audio.status == 'play') {
            audio.pause();
            root.pro.stop();
            clearInterval(timer);
        } else {
            audio.play();
            root.pro.start();
            var deg = $('.circle').attr('data-deg') || 0;
            rotated(deg);
        }
        $('.play').toggleClass('playing');
        
    });
    // 切歌事件
    $('.list').on('click', function () {
        var isClick = $('.list').attr("is-click");
        if (isClick == "false") {
            $('.list').attr("is-click", "true");
            $('ul').css({ "display": "block" });
        }
        if (isClick == "true") {
            $('.list').attr("is-click", "false");
            $('ul').css({ "display": "none" });
        }
    })
    for (var j = 0; j < $('li').length; j++) {
        $('li').on('click', function (event) {
            event.stopPropagation();
            var i = parseInt($(this).attr("index"));
            if (i == 0) {
                $('body').trigger('play:change', i);
                root.pro.start(0);
                if (audio.status == 'pause') {
                    root.pro.stop();
                    audio.pause();
                }
            }
            if (i == 1) {
                $('body').trigger('play:change', i);
                root.pro.start(0);
                if (audio.status == 'pause') {
                    root.pro.stop();
                    audio.pause();
                }
            }
            if (i == 2) {
                $('body').trigger('play:change', i);
                root.pro.start(0);
                if (audio.status == 'pause') {
                    root.pro.stop();
                    audio.pause();
                }
            }
        })
    }

}
function rotated(deg) {
    clearInterval(timer);
    deg = parseInt(deg);
    timer = setInterval(function () {
        deg += 2;
        $('.circle').attr('data-deg', deg);
        $('.circle').css({
            'transform': 'rotateZ(' + deg + 'deg)',
            'transition': 'all 1s linear'
        })
    }, 200)
}
function bindTouch() {
    var offset = $('.in-line').offset();
    var left = offset.left;
    var width = $('.in-line').width();
    console.log(offset)
    $('.line-circle').on('touchstart', function () {
        root.pro.stop();
    }).on('touchmove', function (e) {
        var x = e.originalEvent.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per >= 0 && per < 1) {
            root.pro.update(per);
        }

    }).on('touchend', function (e) {
        var x = e.originalEvent.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per > 0 && per <= 1) {
            var time = dataList[control.index].duration;
            var curTime = per * time;
            audio.playTo(curTime);
            audio.play();
            audio.status = 'play';
            root.pro.start(curTime);
            $('.play').addClass('playing');
        }
    })
}

getData("../mock/data.json");