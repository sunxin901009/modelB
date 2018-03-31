/**
 * Created by sssxxx on 2018/1/19.
 */
var utils=(function () {
    function toArray(like) {
        var ary=[];
        try {
            ary=Array.prototype.slice.call(like)
        }catch (k){
            for (var i = 0; i < like.length; i++) {
                var cur = like[i];
                ary.push(cur)
            }
        }
        return ary;
    }
    function toJSON(curEle) {
       return "JSON" in window?JSON.parse(curEle):eval("("+curEle+")")
    }
    return{
        toArray:toArray,
        toJSON:toJSON
    }
})();