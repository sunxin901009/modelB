function sum() {
    var ary=[].slice.call(arguments);
   var a= ary.reduce(function(pre,cur){
        return pre+cur;
    });
    return a
}

module.exports.sum=sum;