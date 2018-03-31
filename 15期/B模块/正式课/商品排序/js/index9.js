/**
 * Created by sssxxx on 2018/1/8.
 */
var mon;
var hppt=new XMLHttpRequest();
hppt.open("get","json/product.json",false);
hppt.onreadystatechange=function () {
    if (hppt.readyState===4 && /^2\d{2}$/.test(hppt.status)){
        mon=utils.toJSON(hppt.responseText);
    }
}
hppt.send(null);
var tig=``;
for (var i = 0; i < mon.length; i++) {
    var cur=mon[i]
    tig+=`<li data-time="${cur.time}" data-hot="${cur.hot}" data-price="${cur.price}">
             <img src="${cur.img}" alt="">
             <span>${cur.title}</span>
             <span>${cur.time}</span>
             <span>${cur.hot}</span>
             <span>${cur.price}</span>
</li>`
}
var oul=document.getElementById("oul");
oul.innerHTML = tig;
var air=document.getElementsByTagName("a")
for (var f = 0; f < air.length; f++) {
    air[f].index=f;
    air[f].flag=1
    air[f].onclick=function () {
        sortList.call(this)
    }
}
function sortList() {
    var olis=document.getElementsByTagName("li");
    var ary=utils.toArray(olis);
    var that=this;
    var newAry=["data-time","data-hot","data-price"]
    ary.sort(function (a,b) {
        var fig=a.getAttribute(newAry[that.index])
        var uit=b.getAttribute(newAry[that.index])
        if (that.index===0){
            fig=fig.replace("-","").replace("-","")
            uit=uit.replace("-","").replace("-","")
        }
        return (fig-uit)*that.flag;
    })
   this.flag*=-1;
    var frg=document.createDocumentFragment();
    for (var k = 0; k < ary.length; k++) {
        frg.appendChild(ary[k])
    }
    oul.appendChild(frg);
    frg=null;
}
