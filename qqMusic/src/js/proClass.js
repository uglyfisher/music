(function($,root){
    var frameId;
    var dur;
    var lastPer = 0;
    var startTime;
    function renderTime(time){
        dur = time;
        var newTime = formatTime(time);
        $('.all-time').html(newTime);
    }
    function formatTime(time){
        t = Math.round(time);
        var m = Math.floor(t / 60);
        var s = t - m * 60;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        return m + ':' + s;
    }
    function start(p){
        lastPer = p == undefined ? lastPer : p;
        startTime = new Date().getTime();
        cancelAnimationFrame(frameId);
        function frame(){
            nowTime = new Date().getTime();
            var per = lastPer + (nowTime - startTime) / (dur * 1000);
            if(per < 1){
                update(per);
            }else{
                cancelAnimationFrame(frameId);
            }

            frameId = requestAnimationFrame(frame);
        }
        frame();
    }
    function update(p){
        var time = formatTime(p * dur);
        $(".now-time").html(time);
        var perX = (p - 1) * 100 + '%';
        $('.line-top').css({
            "transform" : "translateX(" + perX + ")"
        })
    }
    function stop(){
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (dur * 1000);
    }
    root.pro = {
        renderTime : renderTime,
        start : start,
        stop : stop,
        update: update
    }
})(window.Zepto, window.player || (window.player = {}));