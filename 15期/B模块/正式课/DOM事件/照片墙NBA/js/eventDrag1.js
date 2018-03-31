function EventFire() {

}

EventFire.prototype.on = function (type, fn) {

    if (/^self/.test(type)) {
        if (!this[type]) {
            this[type] = []
        }
        var ary = this[type];
        if (ary) {
            for (var i = 0; i < ary.length; i++) {
                if (ary[i] === fn) return;
            }
            ary.push(fn)
        }
    }
    return this;
};
EventFire.prototype.selfrun = function (type) {
    var ary = this[type];
    if (ary) {
        for (var i = 0; i < ary.length; i++) {
            ary[i].call(this)
        }
    }
}
EventFire.prototype.off = function (type, fn) {
    var ary = this[type];
    if (ary) {
        for (var i = 0; i < ary.length; i++) {
            if (ary[i] === fn) {
                ary[i] = null;
                return;
            }
        }
    }
};
Drag.prototype = new EventFire();

function Drag(curEle) {
    this.cur=curEle;
    this.Down=this.down.myBind(this);
    this.Move=this.move.myBind(this);
    this.Up=this.up.myBind(this);
    $event.on(curEle,"mousedown",this.Down)
}
Drag.prototype.down=function (e) {
    e=e||window.event;
    this.mx=e.clientX;
    this.my=e.clientY;
    this.startX=this.cur.offsetLeft;
    this.startY=this.cur.offsetTop;
    $event.on(document,"mousemove",this.Move);
    $event.on(document,"mouseup",this.Up);
    this.selfrun("selfDragIndex")
};
Drag.prototype.move=function (e) {
    e=e||window.event;
    var changeL=e.clientX-this.mx,
        changeT=e.clientY-this.my;
    this.cur.style.left=changeL+this.startX+"px";
    this.cur.style.top=changeT+this.startY+"px";
    this.selfrun("selfDragHite",isHite)
};
Drag.prototype.up=function () {
    $event.off(document,"mousemove",this.Move);
    $event.off(document,"mouseup",this.Up);
    this.selfrun("selfDragChange",changePos);
}