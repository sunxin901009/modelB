(function () {
    Function.prototype.myBind = function () {
        var arg1 = arguments[0];
        var _this = this;
        var a = [].slice.call(arguments,1);
        return function () {
            var arg2 = [].slice.call(arguments);
            var cur = a.concat(arg2);
            _this.apply(arg1,cur);
        }
    }
    function on(curEle,type,fn) {// curEle: 当前元素  type : 事件类型  fn : 绑定的方法；
        if(curEle.addEventListener){
            // 这是标准浏览器执行此处
            curEle.addEventListener(type,fn,false);
            return;
        }
        // 自定义属性
        if(!curEle['pool'+type]){
            // 第一次进来绑定执行
            curEle['pool'+type] = [];
            document.body.attachEvent('on'+type,run.myBind(curEle));
        };
        var  ary = curEle['pool'+ type];
        for(var i=0;i<ary.length;i++){
            if(fn === ary[i]){
                return;
            }
        }
        ary.push(fn);
    }
    function run(e) {
        e.target = e.srcElement;
        e.pageX = e.clientX + document.body.scrollLeft;
        e.pageY = e.clientY + document.body.scrollTop;
        e.stopPropagation = function () {
            e.cancelBubble = true;
        }
        e.preventDefault = function () {
            e.returnValue  = false;
        }
        //this-->curEle
        var a = this['pool'+e.type];
        for(var i=0;i<a.length;i++){
            if(ary[i]===null){
                ary.splice(i,1);
                i--;
                continue;
            }
            a[i].call(this,e);
        }
    }
    function off(curEle,type,fn) {
        var  ary = curEle['pool'+type];
        for(var i=0;i<ary.length;i++){
            if(ary[i] === fn){
//                ary.splice(i,1);
                // 数组塌陷；
                ary[i] = null;// 占位作用；防止数组塌陷；
                return;
            }
        }
    }

})()