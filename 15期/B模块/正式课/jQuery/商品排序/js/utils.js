// 公共方法库
var utils = (function () {
    // 类数组转数组的方法
    function toArray(likeAry) {
        var  ary = [];
        try{
            ary = Array.prototype.slice.call(likeAry);
        }catch(e){
            for(var i=0;i<likeAry.length;i++){
                var  cur = likeAry[i];
                ary.push(cur);
            };
        }
        return  ary;
    };
    function toJSON(val) {
       return  "JSON"  in window?JSON.parse(val) : eval("("+val+")")
    }

    return {
        toArray:toArray,
        toJSON:toJSON
    }
})();
// 单例模式
// var utils= {
//     toArray: function (likeAry) {
//         var  ary = [];
//         try{
//             ary = Array.prototype.slice.call(likeAry);
//         }catch(e){
//             for(var i=0;i<likeAry.length;i++){
//                 var  cur = likeAry[i];
//                 ary.push(cur);
//             };
//         }
//         return  ary;
//      }
// }

