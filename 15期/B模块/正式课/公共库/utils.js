/**
 * Created by sssxxx on 2018/1/15.
 */
var utils = (function () {
    //1.检测当前数据是否属于某个数据类型
    var obj = {
        isNumber: "Number",
        isString: "String",
        isBoolean: "Boolean",
        isNull: "Null",
        isUndefined: "Undefined",
        isFunction: "Function",
        isObject: "Object",
        isArray: "Array",
        isRegExp: "RegExp"
    };
    var checkType = {};
    for (var key in obj) {
        checkType[key] = (function () {
            var name = obj[key];
            return function (air) {
                var reg = new RegExp("/\\[object " + name + "\\]/g");
                return reg.test(Object.prototype.toString.call(air));
            }
        })()
    }

    //2.getCss
    function getCss(curEle, attr) {
        if ("getComputedStyle" in window) {
            return getComputedStyle(curEle)[attr];
        } else {
            if (attr === "opacity") {
                var val = curEle.currentStyle["filter"];
                var reg = /^alpha\(opacity=(\d+(\.\d+)?)\)$/g;
                return reg.exec(val)[0] / 100;
            }
            return curEle.currentStyle[attr];
        }
    }

    //3.setCss
    function setCss(curEle, attr, value) {
        if (attr === "opacity") {
            curEle.style["filter"] = "alpha(opacity=" + value * 100 + ")";
            curEle.style["opacity"] = value;
            return;
        } else {
            var reg = /^((width|height)|((margin|padding)?(top|right|bottom|left)?))$/i;
            if (reg.test(attr) && !isNaN(value)) {
                value = value + "px";
            }
            curEle.style[attr] = value;
        }
    }

    //4.setGroupCss
    function setGroupCss(curEle, opation) {
        if (typeof opation === "object") {
            for (var key in opation) {
                setCss(curEle, key, opation[key])
            }
        }
    }

    //5.css
    function css(curEle, attr, value) {
        curEle = arguments[0];
        attr = arguments[1];
        value = arguments[2];
        if (arguments.length === 3) {
            setCss(curEle, attr, value)
        } else {
            if (arguments.length === 2 && typeof attr === "object") {
                setGroupCss(curEle, attr)
            }
            getCss(curEle, attr)
        }
    }

    //6.offset
    function offset(curEle) {
        var l = curEle.offsetLeft;
        var t = curEle.offsetTop;
        var p = curEle.offsetParent;
        var reg = /MSIE 8.0/;
        while (p.nodeName !== "BODY") {
            if (!reg.test(navigator.userAgent)) {
                l += p.clientLeft;
                t += p.clientTop;
            }
            l += p.offsetLeft;
            t += p.offsetTop;
            p = p.offsetParent;
        }
        return {left: l, top: t}
    }

    //7.win
    function win(curEle, attr) {
        if (typeof attr === "undefined") {
            return document.documentElement[curEle] || document.body[curEle];
        }
        document.documentElement[curEle] = attr;
        document.body[curEle] = attr;
    }

    //8.toArray
    function toArray(like) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(like);
        } catch (e) {
            for (var i = 0; i < like.length; i++) {
                ary.push(like[i]);
            }
        }
        return ary;
    }

    //9.toJSON
    function toJSON(val) {
        return "JSON" in window ? JSON.parse(val) : eval("(" + val + ")")
    }

    //10.获取上一个哥哥元素节点
    function getBro(curEle) {
        if ("previousElementSibling" in curEle) {
            return curEle.previousElementSibling
        } else {
            var pre = curEle.previousSibling;
            while (pre) {
                if (pre.nodeType === 1) {
                    return pre;
                }
                pre = pre.previousSibling;
            }
        }
    }

    //11.获取所有哥哥元素节点
    function getBroAll(curEle) {
        var ary = [];
        var pre = curEle.previousSibling;
        while (pre) {
            if (pre.nodeType === 1) {
                ary.push(pre)
            }
            pre = pre.previousSibling;
        }
        if (ary.length === 0) ary = null;

        return ary;
    }

    //12.下一个弟弟元素节点
    function getNex(curEle) {
        if ("nextElementSibling" in curEle) {
            return curEle.nextElementSibling;
        } else {
            var next = curEle.nextSibling;
            while (pre) {
                if (pre.nodeType === 1) {
                    return pre;
                }
                pre = pre.nextSibling;
            }
        }
    }

    //13.所有的弟弟元素节点
    function getNexAll(curEle) {
        var ary = [];
        var pre = curEle.nextSibling;
        while (pre) {
            if (pre.nodeType === 1) {
                ary.push(pre)
            }
            pre = pre.nextSibling;
        }
        if (ary.length === 0) ary = null;

        return ary;
    }

    //14.兄弟元素节点
    function siblings(curEle) {
        return getBroAll(curEle).concat(getNexAll(curEle))
    }

    //15.children 子元素节点 children(curEle,div)
    function children(curEle, tag) {
        var ary = [];
        var son = curEle.childNodes;
        for (var i = 0; i < son.length; i++) {
            var cur = son[i];
            if (tag === undefined && cur.nodeType === 1) {
                ary.push(cur)
            } else {
                if (cur.nodeType === 1 && cur.nodeName === tag.toUpperCase()) {
                    ary.push(cur)
                }
            }
        }
        if (ary.length === 0) ary = null;
        return ary;
    }

    //16.当前元素的祖先
    function ancestor(curEle) {
        var ary = [];
        var ance = curEle.parentNode;
        while (ance) {
            ary.push(ance);
            ance = ance.parentNode;
        }
        if (ary.length === 0) ary = null;
        return ary;
    }

    //17.getElementByClassName
    function getElementsByClassName(className, context) {
        context = context || document;
        if ("getComputedStyle" in window) {
            return context.getElementsByClassName(className)
        }
        var elements = context.getElementsByTagName("*");
        elements = toArray(elements);
        //去首尾空格及以一个或多个空格进行分割，得到一个数组；
        className = className.replace(/^ +| +$/g, "").split(/ +/);
        for (var i = 0; i < className.length; i++) {
            var reg = new RegExp("(^| +)" + className[i] + "( +|$)");
            for (var j = 0; j < elements.length; j++) {
                var cur = elements[j];
                if (!reg.test(cur.className)) {
                    elements.splice(j, 1);
                    j--;
                }
            }
        }
        return elements;
    }

    //18.addClass
    function addClass(curEle, name) {
        curEle.className === "" ? curEle.className = name : (hasClass(curEle,name) ? null:curEle.className += " " + name);
    }

    //19.hasClass
    function hasClass(curEle, className) {
        var reg = new RegExp("(^| +)" + className + "( +|$)");
        return reg.test(curEle.className)
    }

    //20.removeClass
    function removeClass(curEle, clName) {
        clName=clName.replace(/^ +| +$/g,"");
        var ary=clName.split(/ +/g);
        for (var i = 0; i < ary.length; i++) {
            var reg=new RegExp("(^| +)"+ary[i]+"($| +)");
            if (hasClass(curEle,ary[i])){
                curEle.className=curEle.className.replace(reg," ")
            }
        }
    }

    return {
        checkType: checkType,
        getCss: getCss,
        setCss: setCss,
        setGroupCss: setGroupCss,
        css: css,
        offset: offset,
        win: win,
        toArray: toArray,
        toJSON: toJSON,
        getBro: getBro,
        getBroAll: getBroAll,
        getNex: getNex,
        getNexAll: getNexAll,
        siblings: siblings,
        children: children,
        ancestor: ancestor,
        getElementsByClassName:getElementsByClassName,
        addClass: addClass,
        hasClass: hasClass,
        removeClass:removeClass
    }
})();