//promise处理异步
//请求数据：ajax  JSONP  link  src  浏览器  form表单
function ajax({url="",type="get",dataType="json"},data={}) {
    return new Promise(function (res,rej) {
        let xhr=new XMLHttpRequest();
        xhr.open(type,url,true);
        xhr.onload=function () {
            if (xhr.status===200){
                res(xhr.response)
            }
        };
        xhr.onerror=function (err) {
            rej(err)
        };
        xhr.send(data);
    })
}