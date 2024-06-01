
function doRun(){
var nameElement = document.getElementById('name');
var genderElement = document.getElementById('gender');
var params ={
    "array_sucursales":"10-2-116,12-1-163,10-3-577,10-3-352,10-3-356,10-3-344,9-2-137,10-2-490,10-3-636,9-2-25,9-2-35,10-3-354,10-3-410,10-3-724,10-3-529,2002-1-5,12-1-58,10-3-717,9-2-2,10-3-757,10-3-329,10-3-199,10-3-307,10-3-760,10-2-118,10-3-694,10-2-381,9-1-10,10-3-355,10-3-402",
    "offset":0,
    "limit":"50",
    "sort":"-cant_sucursales_disponible"
}
var promise1 = new Promise(function(resolve, reject) {
    var search = document.getElementById('comida').value
    params.string = search
    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = "https://d3e6htiiul5ek9.cloudfront.net/prod/productos" + formatParams(params)
            // "string=queso%20crema&" +
            // "array_sucursales=10-2-116,12-1-163,10-3-577,10-3-352,10-3-356,10-3-344,9-2-137,10-2-490,10-3-636,9-2-25,9-2-35,10-3-354,10-3-410,10-3-724,10-3-529,2002-1-5,12-1-58,10-3-717,9-2-2,10-3-757,10-3-329,10-3-199,10-3-307,10-3-760,10-2-118,10-3-694,10-2-381,9-1-10,10-3-355,10-3-402" +
            // "&offset=0&limit=50&sort=-cant_sucursales_disponible";

    xhr.open(method, url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
        }
    };
    xhr.send();
});
  //   curl 'https://d3e6htiiul5ek9.cloudfront.net/prod/productos?string=queso%20crema&array_sucursales=10-2-116,12-1-163,10-3-577,10-3-352,10-3-356,10-3-344,9-2-137,10-2-490,10-3-636,9-2-25,9-2-35,10-3-354,10-3-410,10-3-724,10-3-529,2002-1-5,12-1-58,10-3-717,9-2-2,10-3-757,10-3-329,10-3-199,10-3-307,10-3-760,10-2-118,10-3-694,10-2-381,9-1-10,10-3-355,10-3-402&offset=0&limit=50&sort=-cant_sucursales_disponible' \
  // -H 'accept: application/json, text/plain, */*' \
  // -H 'accept-language: en-US,en;q=0.9,es-AR;q=0.8,es-US;q=0.7,es;q=0.6' \
  // -H 'origin: https://www.preciosclaros.gob.ar' \
  // -H 'priority: u=1, i' \
  // -H 'referer: https://www.preciosclaros.gob.ar/' \
  // -H 'sec-ch-ua: "Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"' \
  // -H 'sec-ch-ua-mobile: ?0' \
  // -H 'sec-ch-ua-platform: "macOS"' \
  // -H 'sec-fetch-dest: empty' \
  // -H 'sec-fetch-mode: cors' \
  // -H 'sec-fetch-site: cross-site' \
  // -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36' \
  // -H 'x-api-key: zIgFou7Gta7g87VFGL9dZ4BEEs19gNYS1SOQZt96'


promise1.then(function(value) {
    nameElement.textContent = value.productos[1].marca;
    genderElement.textContent = value.gender;
});
}

function formatParams( params ){
    return "?" + Object
        .keys(params)
        .map(function(key){
            return key+"="+encodeURIComponent(params[key])
        })
        .join("&")
}
