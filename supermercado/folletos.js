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
        todo.innerHTML = ''
        let table = document.createElement('table');
        var tblBody = document.createElement("tbody");

        var row = document.createElement("tr");
        appendCell(row, "bandera")
        appendCell(row, "direccion")
        appendCell(row, "precios")
        tblBody.appendChild(row);

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
        var row = document.createElement("tr");
        var collapse = document.createElement('button');
        collapse.textContent = "collapse";
        collapse.addEventListener('click', () => {
            todo.innerHTML=""
        });
        appendCellComponent(row, collapse)

        tblBody.appendChild(row);

        table.appendChild(tblBody);
        todo.appendChild(table);

    });
}

function clearProducts(){
    let todo = document.getElementById("todo");
    todo.innerHTML = ''
}
function searchProducts() {
    var search = document.getElementById('comida').value
    doSearchProducts(search, "todo")
}
function doSearchProducts(search, elementToFill) {

    params = structuredClone(baseParams);
    params.string = search
    params.offset = 0
    params.sort = "-cant_sucursales_disponible"
    var listado = doRequest(params, "productos")
    listado.then(function (value) {
        // let todo = document.getElementById(idDiv);
        let todo = document.getElementById(elementToFill);
        let table = document.createElement('table');
        var tblBody = document.createElement("tbody");

        var row = document.createElement("tr");
        appendCell(row, "marca")
        appendCell(row, "nmbre")
        appendCell(row, "presentacion")
        appendCell(row, "id")
        appendCell(row, "precioMin")
        appendCell(row, "precioMax")
        appendCell(row, "")
        appendCell(row, "")
        tblBody.appendChild(row);

        value.productos.forEach((element) => {
                var newDiv = document.createElement('div');
                newDiv.id = 'block' + element.id;
                var expand = document.createElement('button');
                expand.textContent = "expand";
                expand.addEventListener('click', () => {
                    searchProduct(element.id, newDiv.id)
                });
                var row = document.createElement("tr");
                appendCell(row, element.marca)
                appendCell(row, element.nombre)
                appendCell(row, element.presentacion)
                appendCell(row, element.id)
                appendCell(row, "$"+element.precioMin)
                appendCell(row, "$"+element.precioMax)
                appendCellComponent(row, expand)
                appendCellComponent(row, newDiv)
                tblBody.appendChild(row);

            }
        )
    table.appendChild(tblBody);
    todo.appendChild(document.createTextNode(search))
    todo.appendChild(document.createElement('hr'))
    todo.appendChild(table);

    });
}

function appendCell(row, element){
    appendCellComponent(row, document.createTextNode(element));
}
function appendCellComponent(row, element){
    var cell = document.createElement("td");
    cell.appendChild(element);
    row.appendChild(cell);
}


function formatParams(params) {
    return "?" + Object
        .keys(params)
        .map(function (key) {
            return key + "=" + encodeURIComponent(params[key])
        })
        .join("&")
}


var param = /[&?]search=([^&]+)/.exec(location.search);
param = param ? param[1].replace(/"/g, '&quot;') : '';
if(param) {
    var params = decodeURIComponent(param).split(',');
    params.forEach((p)=>doSearchProducts(p, "preloaded"))

}
else
    doSearchProducts("coca cola light","preloaded")
