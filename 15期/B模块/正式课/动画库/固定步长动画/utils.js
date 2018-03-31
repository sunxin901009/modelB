/**
 * Created by sssxxx on 2018/1/15.
 */
var utils=(function () {
    //1.检测当前数据是否属于某个数据类型
    var obj={
        isNumber:"Number",
        isString:"String",
        isBoolean:"Boolean",
        isNull:"Null",
        isUndefined:"Undefined",
        isFunction:"Function",
        isObject:"Object",
        isArray:"Array",
        isRegExp:"RegExp"
    };
    var checkType={};
    for (var key in obj){
        checkType[key]=(function () {
            var name=obj[key];
            return function (air) {
                var reg=new RegExp("/\\[object "+name+"\\]/g");
                return reg.test(Object.prototype.toString.call(air));
            }
        })()
    }
    //2.getCss
    function getCss(curEle,attr) {
        var val;
        if ("getComputedStyle" in window){
            val=getComputedStyle(curEle)[attr];
        }else {
            if (attr==="opacity"){
                var val=curEle.currentStyle["filter"];
                var reg=/^alpha\(opacity=(\d+(\.\d+)?)\)$/g;
                val=reg.exec(val)[0]/100;
            }
            val=curEle.currentStyle[attr];
        }
        val=parseFloat(val);
        return val;
    }
    //3.setCss
    function setCss(curEle,attr,value) {
        if (attr==="opacity"){
            curEle.style["filter"]="alpha(opacity="+value*100+")";
            curEle.style["opacity"]=value;
            return;
        }else {
            var reg=/^((width|height)|((margin|padding)?(top|right|bottom|left)?))$/i;
            if (reg.test(attr) && !isNaN(value)){
                value=value+"px";
            }
            curEle.style[attr]=value;
        }
    }
    //4.setGroupCss
    function setGroupCss(curEle,opation) {
        if (typeof opation==="object"){
            for (var key in opation){
                setCss(curEle,key,opation[key])
            }
        }
    }
    //5.css
    function css(curEle,attr,value) {
        curEle=arguments[0];
        if (arguments.length===3){
            attr=arguments[1];
            value=arguments[2]
            setCss(curEle,attr,value)
        }else {

            if (arguments.length===2 && typeof attr==="object"){
                attr=arguments[1]
                setGroupCss(curEle,attr)
            }
            attr=arguments[1]
            return getCss(curEle,attr)
        }
    }
    //6.offset
    function offset(curEle) {
        var l=curEle.offsetLeft;
        var t=curEle.offsetTop;
        var p=curEle.offsetParent;
        var reg=/MSIE 8.0/;
        while(p.nodeName!=="BODY"){
            if (!reg.test(navigator.userAgent)){
                l+=p.clientLeft;
                t+=p.clientTop;
            }
            l+=p.offsetLeft;
            t+=p.offsetTop;
            p=p.offsetParent;
        }
        return{left:l,top:t}
    }
    //7.win
    function win(curEle,attr) {
        if (typeof attr==="undefined"){
            return document.documentElement[curEle]||document.body[curEle];
        }
        document.documentElement[curEle]=attr;
        document.body[curEle]=attr;
    }
    //8.toArray
    function toArray(like) {
        var ary=[];
        try {
            ary=Array.prototype.slice.call(like);
        }catch(e){
            for (var i = 0; i < like.length; i++) {
                ary.push(like[i]);
            }
        }
        return ary;
    }
    //9.toJSON
    function toJSON(val) {
        return "JSON" in window?JSON.parse(val):eval("("+val+")")
    }
    return{
        checkType:checkType,
        getCss:getCss,
        setCss:setCss,
        setGroupCss:setGroupCss,
        css:css,
        offset:offset,
        win:win,
        toArray:toArray,
        toJSON:toJSON
    }
})();