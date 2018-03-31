function ajax(opations) {
    let _default={
        url:"",
        type:"get",
        async:true,
        data:null,
        success:null
    };
    for (var key in opations) {
        if (opations.hasOwnProperty(key)){
            _default[key]=opations[key];
        }
    }
    let xhr=new XMLHttpRequest();
    xhr.open(_default.type,_default.url,_default.async);
    xhr.onload=function () {
        let val="";
        if (xhr.status===200){
            val=xhr.responseText;
            if (_default.dataType==="json"){
                val=JSON.parse(val)
            }
            _default.success(val)
        }
    };
    xhr.send(_default.data);
}
