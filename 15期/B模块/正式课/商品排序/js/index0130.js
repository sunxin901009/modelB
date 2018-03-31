//1.获取ajax数据
var data;
var xhr=new XMLHttpRequest();
xhr.open("get","json/product.json",false);
xhr.onreadystatechange=function () {
    if (xhr.readyState===4 && /^2\d{2}$/.test(xhr.status)){
        data=utils.toJSON(xhr.responseText)
    }
};
xhr.send(null);
// console.log(data);
//2.绑定数据
var str=``;
for (var i = 0; i < data.length; i++) {
    var cur = data[i];
    str+=`<li data-time="${cur.time}" data-hot="${cur.hot}" data-price="${cur.price}">
            <img src="${cur.img}" alt="">
            <span>${cur.title}</span>
            <span>${cur.time}</span>
            <span>${cur.hot}</span>
            <span>${cur.price}</span>
        </li>`
}
var oul=document.getElementById("oul");
oul.innerHTML=str;
//3.绑定点击事件
var as=document.getElementsByTagName("a");
for (var i = 0; i < as.length; i++) {
    as[i].index=i;
    as[i].flag=-1;
    as[i].onclick=function () {
        this.flag*=-1;
        sortList.call(this)
    }
}
var olis=document.getElementsByTagName("li");
var ary=utils.toArray(olis);
var newAry=["data-time","data-hot","data-price"]
function sortList() {
    var that=this;
    ary.sort(function (a,b) {
        var cur=a.getAttribute(newAry[that.index])
        var nex=b.getAttribute(newAry[that.index])
        var reg=/-/g;
        if (that.index===0){
            cur=cur.replace(reg,"")
            nex=nex.replace(reg,"")
        }
        return (cur-nex)*that.flag;
    })
    var frg=document.createDocumentFragment();
    for (var i = 0; i < ary.length; i++) {
        frg.appendChild(ary[i])
    }
    oul.appendChild(frg);
    frg=null;
}
