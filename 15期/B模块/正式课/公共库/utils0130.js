var utils = (function () {
//1.checkType检测数据类型
    var obj = {
        isNumber: "Number",
        isString: "String",
        isBoolean: "Boolean",
        isUndefined: "Undefined",
        isNull: "Null",
        isObject: "Object",
        isRegExp: "RegExp",
        isFunction: "Function",
        isArray: "Array"
    };
    var checkType = {};
    for (var key in obj) {
        checkType[key] = (function () {
            var name = obj[key];
            return function (n) {
                var reg = new RegExp("\\[object " + name + "\\]");
                return reg.test(Object.prototype.toString.call(n))
            }
        })()
    }

//2.getCss获取css属性
    function getCss(curEle, attr) {
        var val;
        if ("getComputedStyle" in window) {
            val = getComputedStyle(curEle)[attr]
        } else {
            if (attr === "opacity") {
                var value = curEle.currentStyle["filter"];
                if (!value) {
                    val = 1
                } else {
                    var reg = /^alpha\(opacity=(\d+)(\.\d+)?$\)/;
                    val = reg.exec(value)[1] / 100;
                }
            }
            val = curEle.currentStyle[attr];
        }
        val = parseFloat(val)
        return val;
    }

//3.setCss设置css属性
    function setCss(curEle, attr, value) {
        if (attr === "opacity") {
            curEle.style["opacity"] = value;
            curEle.style["filter"] = "alpha(opacity=" + value * 100 + ")";
            return;
        }
        var reg = /^(width|height|((margin|padding)?(top|right|bottom|left)?))$/i;
        if (reg.test(attr) && !isNaN(value)) {
            value = value + "px"
        }
        curEle.style[attr] = value;
    }

//4.setGroupCss 批量设置css属性
    function setGroupCss(curEle, obj) {
        if (obj instanceof Object) {
            for (var key in obj) {
                setCss(curEle, key, obj[key])
            }
        }
    }

//5.css 获取、设置css属性
    function css() {
        var len=arguments.length;
        var a=arguments[0];
        var b=arguments[1];
        var c=arguments[2];
        if (len===3){
            setCss(a,b,c)
        }else {
            if (len===2 && b instanceof Object){
                setGroupCss(a,b)
            }
            getCss(a,b)
        }
    }
//6.offset 获取元素上、左偏移量
    function offset(curEle,attr) {
        var t=curEle.offsetTop;
        var l=curEle.offsetLeft;
        var p=curEle.offsetParent;
        while (p.nodeName!=="BODY"){
        var reg=/MSIE 8.0/;
        if (!reg.test(navigator.userAgent)){
            t+=p.clientTop;
            l+=p.clientLeft;
        }
            t+=p.offsetTop;
            l+=p.offsetLeft;
            p=p.offsetParent;
        }
        return {
            top:t,
            left:l
        }
    }
//7.win
    function win(attr,value) {
        if (value===undefined){
            return document.documentElement[attr]||document.body[attr];
        }
        document.documentElement[attr]=value;
        document.body[attr]=value;
    }

    return {
        checkType: checkType,
        getCss: getCss,
        setCss: setCss,
        setGroupCss: setGroupCss,
        css: css,
        offset:offset,
        win:win,
        // toArray:toArray,
        // toJSON:toJSON
    }
})();