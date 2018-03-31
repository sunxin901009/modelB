//1.设置li样式
var olis = document.getElementsByTagName("li");
for (var i = olis.length - 1; i >= 0; i--) {
    olis[i].style.left = olis[i].offsetLeft + "px";
    olis[i].style.top = olis[i].offsetTop + "px";
    olis[i].style.position = "absolute";
    olis[i].style.margin = 0 + "px";
    new Drag(olis[i]).on("selfDragHite",isHite).on("selfDragIndex",addIndex).on("selfDragChange",changePos)
}

function isHite() {
    var cur = this.cur;
    this.hited=[];
    for (var i = 0; i < olis.length; i++) {
        if(cur===olis[i])continue;
        if (cur.offsetLeft + cur.offsetWidth < olis[i].offsetLeft || cur.offsetTop + cur.offsetHeight < olis[i].offsetTop || cur.offsetLeft > olis[i].offsetLeft + olis[i].offsetWidth || cur.offsetTop > olis[i].offsetTop + olis[i].offsetHeight) {
            //没碰撞
            olis[i].style.opacity = 1;
        } else {
            //碰撞
            olis[i].style.opacity = 0.5;
            this.hited.push(olis[i]);
        }
    }
}
var index=0;
function addIndex() {
    this.cur.style.zIndex=++index;
}
function changePos() {
    var ary=this.hited;
    for (var i = 0; i < ary.length; i++) {
        var cur=ary[i];
        cur.distance=Math.pow(this.cur.offsetLeft-cur.offsetLeft,2)+Math.pow(cur.offsetTop-this.cur.offsetTop,2);
        cur.style.opacity=1;
    }
    ary.sort(function (a,b) {
        return a.distance-b.distance
    });
    this.cur.style.left=ary[0].style.left;
    this.cur.style.top=ary[0].style.top;
    ary[0].style.left=this.startX+"px";
    ary[0].style.top=this.startY+"px";
}