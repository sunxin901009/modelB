(function () {
    //1.当前位置计算公式
    function liner(time,duration,change,begin) {
        return time/duration*change+begin;
    };
    //2.导入utils库
    var utils=(function () {
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
        return{
            css:css
        }
    })();
    //3.获得time duration change begin
    function animate(curEle,target,duration,callBack) {
        var t=0,
            d=duration||1000,
            c={},
            b={};
        for (var key in target) {
            b[key]=utils.css(curEle,key);
            c[key]=target[key]-b[key];
        }
        //4.让元素动起来
        clearInterval(curEle.animateTimer)
        curEle.animateTimer=setInterval(function () {
            t+=17;
            if (t>=d){
                utils.css(curEle,target);
                clearInterval(curEle.animateTimer);
                callBack && callBack()
                return;
            }
            var cur={};
            for (var key in target) {
                cur[key]=liner(t,d,c[key],b[key])
            }
            utils.css(curEle,cur)
        },17)
    }
    window.animate=animate;
})()