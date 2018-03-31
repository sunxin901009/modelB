function EventFire() {

}

EventFire.prototype.on = function (type, fn) {
    if (/^self/.test(type)) {
        if (!this[type]) {
            this[type] = []
        }
        var ary = this[type];
        for (var i = 0; i < ary.length; i++) {
            if (ary[i] === fn) {
                return
            }
        }
        ary.push(fn)

    }
    return this;
}
EventFire.prototype.selfrun = function (type) {
    var ary = this[type];
    if (ary) {
        for (var i = 0; i < ary.length; i++) {
            ary[i].call(this);
        }
    }

};
Drag.prototype = new EventFire();

function Drag(ele) {
    this.ele = ele;
    this.Down = this.down.myBind(this);
    this.Move = this.move.myBind(this);
    this.Up = this.up.myBind(this);
    $event.on(this.ele, "mousedown", this.Down);
}

Drag.prototype.down = function (e) {
    e = e || window.event;
    this.mx = e.clientX;
    this.my = e.clientY;
    this.startX = this.ele.offsetLeft;
    this.startY = this.ele.offsetTop;
    $event.on(this.ele, "mousemove", this.Move);
    $event.on(this.ele, "mouseup", this.Up);
    this.selfrun("selfDragDown")
}
Drag.prototype.move = function (e) {
    e = e || window.event;
    var changL = e.clientX - this.mx,
        changT = e.clientY - this.my;
    this.ele.style.left = changL + this.startX + "px";
    this.ele.style.top = changT + this.startY + "px";
    this.selfrun("selfDragStart")
}
Drag.prototype.up = function () {
    $event.off(this.ele, "mousemove", this.Move);
    $event.off(this.ele, "mouseup", this.Up);
    this.selfrun("selfDragEnd")
};
