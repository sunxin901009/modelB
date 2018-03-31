//获取ajax
var data;
var xhr=new XMLHttpRequest();
xhr.open("get","json/product.json",false);
xhr.onreadystatechange=function () {
    if (xhr.readyState===4 && /^2\d{2}$/.test(xhr.status)){
        data=utils.toJSON(xhr.responseText)
    }
};
xhr.send(null);
var str=``;
for (var i = 0; i < data.length; i++) {
    var cur= data[i];
    str+=`<li data-time="${cur.time}" data-hot="${cur.hot}" data-price="${cur.price}">
            <img src="${cur.img}" alt="">
            <span>${cur.title}</span>
            <span>${cur.time}</span>
            <span>${cur.hot}</span>
            <span>￥${cur.price}</span>
        </li>`
}
var oul=document.getElementById("list");
oul.innerHTML=str;
//2.绑定点击事件
var navs=document.getElementsByTagName("a");
for (var i = 0; i < navs.length; i++) {
    navs[i].index=i;
    navs[i].flag=-1;
   navs[i].onclick=function () {
        this.flag*=-1;
       sortList.call(this)

   }
}
function sortList() {
    var that=this;
    var olis=document.getElementsByTagName("li");
    var ary=utils.toArray(olis);
    var newAry=["data-time","data-hot","data-price"];
    ary.sort(function (a,b) {
        var reg=/-/g;
        var cur=a.getAttribute(newAry[that.index]);
        var nex=b.getAttribute(newAry[that.index]);
        if (that.index===0){
            cur=cur.replace(reg,"");
            nex=nex.replace(reg,"");
        }
        return (cur-nex)*that.flag;
    });
    var frag=document.createDocumentFragment();
    for (var i = 0; i < ary.length; i++) {
        frag.appendChild(ary[i]);
    }
    oul.appendChild(frag);
    frag=null;
}

