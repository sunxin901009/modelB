/**
 * Created by sssxxx on 2018/1/7.
 */
//1.获取ajax
var tiger;
var xsx=new XMLHttpRequest();
xsx.open("get","json/product.json",false);
xsx.onreadystatechange=function () {
    if (xsx.readyState=== 4 && /^2\d{2}$/.test(xsx.status)){
        tiger=utils.toJSON(xsx.responseText);
    }
}
xsx.send(null);
//2.绑定数据
var monk=``;
for (var i = 0; i < tiger.length; i++) {
    var cur = tiger[i];
    monk+=`<li data-time="${cur.time}" data-hot="${cur.hot}" data-price="${cur.price}">
               <img src="${cur.img}" alt="">
                <span>${cur.title}</span>
                <span>${cur.time}</span>
                <span>${cur.hot}</span>
                <span>${cur.price}</span>
</li>`
}
var oul=document.getElementById("oul");
oul.innerHTML = monk;
//3.循环绑定点击事件
var air=document.getElementsByTagName("a");
for (var j = 0; j < air.length; j++) {
    air[j].index=j;
    var flag=-1;
   air[j].onclick = function () {
       flag*=-1;
       sortList(this.index)
   }
}
function sortList(ii) {
    var olis=document.getElementsByTagName("li");
    var ary=utils.toArray(olis);
    var newAry=["data-time","data-hot","data-price"]
    ary.sort(function (a,b) {
        var cai=a.getAttribute(newAry[ii])
        var niao=b.getAttribute(newAry[ii])
        if (ii===0){
            cai=cai.replace("-","").replace("-","")
            niao=niao.replace("-","").replace("-","")
        }
        return (cai-niao)*flag;
    })

    var frg=document.createDocumentFragment();
    for (var k = 0; k < ary.length; k++) {
        frg.appendChild(ary[k]);
    }
    oul.appendChild(frg);
    frg=null;
}