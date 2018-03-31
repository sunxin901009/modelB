var utilsExtend = (function () {
    //1.获取上一个哥哥元素节点
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
    //2.获取所有哥哥元素节点
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
    //3.下一个弟弟元素节点
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
    //4.所有的弟弟元素节点
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
    //5.兄弟元素节点
    function siblings(curEle) {
        return getBroAll(curEle).concat(getNexAll(curEle))
    }
    //6.children 子元素节点 children(curEle,div)
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
    //7.当前元素的祖先
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
    //8.getElementByClassName 没做！！！
    function getElementByClassName(className,context) {
        context=context||document;
        if ("getComputedStyle" in window){
            return context.getElementsByClassName(className)
        }
        var elements=context.getElementsByTagName("*");
        elements=
        //去首尾空格及以一个或多个空格进行分割，得到一个数组；
            className=className.replace(/^ +| +$/g,"").split(/ +/);
        for (var i = 0; i < className.length; i++) {
            var reg=new RegExp("(^| +)"+className[i]+"( +|$)");
            for (var j = 0; j < elements.length; j++) {
                var cur = elements[j];
                if (!reg.test(cur.className)) {
                    elements.splice(j,1);
                    j--;
                }
            }
        }
        return newAry;
    }
    //9.addClass
    function addClass(curEle, name) {
        curEle.className === "" ? curEle.className = name : (hasClass(curEle,name) ? null:curEle.className += " " + name);
    }
    //10.hasClass
    function hasClass(curEle, name) {
        var names = curEle.className.split(" ");
        var reg = new RegExp("^" + name + "$");
        for (var i = 0; i < names.length; i++) {
            var cur = names[i];
            if (reg.test(cur)) {
              return true
            }
        }
        return false
    }
    //11.removeClass
    function removeClass(curEle, name) {
        var names=curEle.className;
        var reg=new RegExp("(\\s+)?"+name+"");
        hasClass(curEle,name)?curEle.className=names.replace(reg,""):null;
    }
    return {
        getBro: getBro,
        getBroAll: getBroAll,
        getNex: getNex,
        getNexAll: getNexAll,
        siblings: siblings,
        children: children,
        ancestor: ancestor,
        getElementByClassName:getElementByClassName,
        addClass: addClass,
        hasClass: hasClass,
        removeClass:removeClass
    }
})();