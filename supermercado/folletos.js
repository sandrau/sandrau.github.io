var baseParams = {
    "array_sucursales": "10-2-116,12-1-163,10-3-577,10-3-352,10-3-356,10-3-344,9-2-137,10-2-490,10-3-636,9-2-25,9-2-35,10-3-354,10-3-410,10-3-724,10-3-529,2002-1-5,12-1-58,10-3-717,9-2-2,10-3-757,10-3-329,10-3-199,10-3-307,10-3-760,10-2-118,10-3-694,10-2-381,9-1-10,10-3-355,10-3-402",
    "limit": "50",
}

async function doRequest(params, path) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest(),
            method = "GET",
            url = "https://d3e6htiiul5ek9.cloudfront.net/prod/" + path + formatParams(params)
        xhr.open(method, url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            }
        };
        xhr.send();

    });
}

function searchProduct(idProducto, idDiv) {
    params = structuredClone(baseParams);
    params.id_producto = idProducto;
    var listado = doRequest(params, "producto")
    listado.then(function (value) {
        let todo = document.getElementById(idDiv);
        let table = document.createElement('table');
        var tblBody = document.createElement("tbody");

        value.sucursales.forEach((element) => {
            if (element.preciosProducto) {
                var precios = "$"+ element.preciosProducto.precioLista;
                if(element.preciosProducto.promo1.precio)
                    precios = precios + "-promo: $"+element.preciosProducto.promo1.precio;
                if(element.preciosProducto.promo2.precio)
                    precios = precios + "-promo: $"+element.preciosProducto.promo2.precio;
                var row = document.createElement("tr");
                appendCell(row, element.banderaDescripcion)
                appendCell(row, element.direccion)
                appendCell(row, precios)
                tblBody.appendChild(row);

            }
            }
        )
        table.appendChild(tblBody);
        todo.appendChild(table);

    });
}
function appendCell(row, element){
    var cell = document.createElement("td");
    var cellText = document.createTextNode(element);
    cell.appendChild(cellText);
    row.appendChild(cell);

}
function tranlaste(banderaId, sucursalTipo){
    let nombre = banderaId
    if(banderaId ===1){
        nombre = "Coto"
    }
    else if(banderaId ===2){
        nombre = "Carrefour (market)"
    }
    else if(banderaId ===3){
        nombre = "Carrefour (express)"
    }
    return nombre + "("+sucursalTipo+")"
}

function searchProducts() {
    var search = document.getElementById('comida').value
    params = structuredClone(baseParams);
    params.string = search
    params.offset = 0
    params.sort = "-cant_sucursales_disponible"

    var listado = doRequest(params, "productos")


    listado.then(function (value) {
        let todo = document.getElementById("todo");
        value.productos.forEach((element) => {
                var newDiv = document.createElement('div');
                newDiv.id = 'block' + element.id;
                var span = document.createElement('span');
                span.textContent = element.marca + "-" + element.nombre + "-" + element.presentacion + "-" + element.id + "-$" + element.precioMin + "-$" + element.precioMax;
                // <input id="clickMe" type="button" value="clickme" onClick="searchProducts();"/>
                var expand = document.createElement('button');
                expand.textContent = "expand";
                expand.addEventListener('click', () => {
                    searchProduct(element.id, newDiv.id)
                });
                span.appendChild(expand)
                newDiv.appendChild(span)
                todo.appendChild(newDiv);
            }
        )
    });
}

function formatParams(params) {
    return "?" + Object
        .keys(params)
        .map(function (key) {
            return key + "=" + encodeURIComponent(params[key])
        })
        .join("&")
}
