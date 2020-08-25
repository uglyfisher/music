(function($,root){
    function Control(len){
        this.len = len;
        this.index = 0;
    }
    Control.prototype = {
        prev:function(){
            return this.getIndex(-1);
        },
        next:function(){
            return this.getIndex(1);
        },
        getIndex:function(val){
            var len = this.len;
            var index = this.index;
            curIndex = (index + val + len) % len;
            this.index = curIndex;
            return curIndex;
        }
    }
    
    root.indexControl = Control;
})(window.Zepto, window.player || (window.player = {}))