var utils=(function () {
    function toArray(n) {
        var ary=[];
        try {
            ary=Array.prototype.slice.call(n)
        }catch (e){
            for (var i = 0; i < n.length; i++) {
                ary.push(n[i])
            }
        }
        return ary;
    }
    function toJSON(curEle) {
        return "JSON" in window ? JSON.parse(curEle):eval("("+curEle+")");
    }
    return {
        toArray:toArray,
        toJSON:toJSON
    }
})();