(function () {
    Function.prototype.myBind = function () {
        // arguments
        var  trueThis = arguments[0];
        // bind 中参数；
        var a = [].slice.call(arguments,1);
        // this --> fn
        var _this = this;
        return function () {
            var  b = [].slice.call(arguments);
            _this.apply(trueThis,a.concat(b));
        }
    };
    function on(curEle,type,fn) {
        if(/^self/.test(type)){
            if(!curEle[type]){
                curEle[type] = [];
            }
            var a = curEle[type];
            if(a){
                for(var i=0;i<a.length;i++){
                    if(a[i] === fn){
                        return;
                    }
                }
                a.push(fn);
            }
            return;// 中止不让下面代码不再执行
        }
        // curEle: 元素  type: 事件类型  fn ： 方法
        // 解决IE678 DOM2事件绑定问题，把方法放入自定义的事件池中
        if(curEle.addEventListener){
            curEle.addEventListener(type,fn,false);
            return;
        };
        // IE 678
        if(!curEle['pool'+type]){// 获取当前对象属性名对应的属性值
            curEle['pool'+type] = [];
            curEle.attachEvent("on"+type,run.myBind(curEle));
        }
        var  ary = curEle['pool'+type];
        // for 循环解决重复绑定问题；
        for(var i=0;i<ary.length;i++){
            if(ary[i] === fn){
                return;
            }
        }
        ary.push(fn);
    }
    // 把自定义事件池中方法挨个执行
    function run(e) {
        // this --> curEle
        e = window.event;
        e.target = e.srcElement;
        var ary = this["pool"+e.type];
        if(ary){
            for (var i = 0; i < ary.length; i++) {
                // 真正的移出在执行run时；
                if(ary[i] === null){
                    ary.splice(i,1);
                    i--;
                    continue;
                }
                ary[i].call(this,e);
            }
        }
    }
    // 把要移出的方法从自定义事件池中删除
    function off(curEle,type,fn) {
        if(/^self/.test(type)){
            var  ary = curEle[type];
            if(ary){
                for(var i=0;i<ary.length;i++){
                    if(ary[i] === fn){
                        ary[i] = null;
                    }
                }
            };
            return;
        }
        if(curEle.removeEventListener){
            curEle.removeEventListener(type,fn,false);
            return;
        }
        var ary = curEle['pool'+type];
        for(var i=0;i<ary.length;i++){
            if(fn === ary[i]){
                //ary.splice(i,1)  数组塌陷
                ary[i] = null;
            }
        }
    }
    function selfRun(type) {// 把自定义事件池中方法挨个执行；  发布
        //this-->happy

        var  ary = this[type];
        if(ary){
            for(var i=0;i<ary.length;i++){
                if(ary[i] === null){
                    ary.splice(i,1);
                    i--;
                    continue;
                }
                ary[i].call(this);
            }
        }
    }
    window.$event = {
        on:on,
        off:off,
        selfRun: selfRun
    }
})();
