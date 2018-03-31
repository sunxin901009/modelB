function EventFire() {}
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
EventFire.prototype.on = function (type,fn) {
    // 把要订阅的方法，放到this上；
    if(/^self/.test(type)){
        if(!this[type]){
            this[type] = [];
        }
        var a = this[type];
        if(a){
            for(var i=0;i<a.length;i++){
                if(a[i] === fn){
                    return;
                }
            }
            a.push(fn);
        }
    }
    return this;// 把函数调整跑哪个thisreturn出去，可以继续调用on方法；

}
EventFire.prototype.selfrun = function (type) {
    var  ary = this[type];
    if(ary){
        for(var i=0;i<ary.length;i++){
            ary[i].call(this);
        }
    }
}
EventFire.prototype.off = function (type,fn) {
    var  ary = this[type];
    if(ary){
        for(var i=0;i<ary.length;i++){
            if(ary[i] === fn){
                ary[i] = null;
            }
        }
    }
}
Drag.prototype = new EventFire();
function Drag(ele){
    //this -->当前实例
    this.ele = ele;
    var  Down = this.down.myBind(this);
    this.MOVE= this.move.myBind(this);
    this.UP= this.up.myBind(this);
    $event.on(ele,'mousedown',Down);
}

Drag.prototype.down = function (e) {
    // this  ---> 实例；
    // 记录初始位置【鼠标两个、盒子两个】
    e = e || window.event;
    this.mx = e.clientX;
    this.my = e.clientY;
    this.startX = this.ele.offsetLeft;
    this.startY = this.ele.offsetTop;
    // 绑定move up;
    $event.on(document,'mousemove',this.MOVE)
    $event.on(document,'mouseup',this.UP)
    this.selfrun("selfdragdown")
}
Drag.prototype.move = function (e) {
    //this -- document

    var  changeL = e.clientX - this.mx;
    var  changeT = e.clientY - this.my;
    this.ele.style.left = changeL + this.startX + "px";
    this.ele.style.top = changeT + this.startY + "px";
    this.selfrun("selfdragStart")
}
Drag.prototype.up = function () {
    $event.off(document,'mousemove',this.MOVE);
    $event.off(document,'mouseup',this.UP);
    this.selfrun("selfdragend");
};
