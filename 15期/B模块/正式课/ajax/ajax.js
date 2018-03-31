function ajax({url = "", type = "get", dataType = "json", data = {}}) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(type, url, true);
        xhr.onload = function () {
            resolve(xhr.response)
        };
        xhr.onerror=function (err) {
            reject(err)
        };
        xhr.send();
    })
}

