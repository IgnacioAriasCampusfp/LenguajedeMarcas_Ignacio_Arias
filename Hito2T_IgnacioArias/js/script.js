document.addEventListener("DOMContentLoaded", function () {
    fetch("json/tienda.json")
        .then(response => response.json())
        .then(data => {
            mostrarPedidos(data);
            mostrarClientes(data);
            generarFactura(data["2024"]["Q1"][0]); // Factura del primer pedido de 2024 Q1
            mostrarProductosTrimestres(data);
        })
        .catch(error => console.error("Error al cargar los datos:", error));
});

function mostrarPedidos(data) {
    const tbody = document.getElementById("pedidos-body");
    tbody.innerHTML = "";

    for (const año in data) {
        for (const trimestre in data[año]) {
            data[año][trimestre].forEach(pedido => {
                tbody.innerHTML += `
                    <tr>
                        <td>${pedido.numero_pedido}</td>
                        <td>${pedido.fecha_compra}</td>
                        <td>${pedido.fecha_entrega}</td>
                        <td>${pedido.total_factura}€</td>
                        <td>${pedido.cliente.nombre} ${pedido.cliente.apellidos}</td>
                    </tr>
                `;
            });
        }
    }
}

function mostrarClientes(data) {
    const tbody = document.getElementById("clientes-body");
    tbody.innerHTML = "";

    let clientes = new Set();

    for (const año in data) {
        for (const trimestre in data[año]) {
            data[año][trimestre].forEach(pedido => {
                const clienteKey = `${pedido.cliente.nombre} ${pedido.cliente.apellidos}`;
                if (!clientes.has(clienteKey)) {
                    clientes.add(clienteKey);
                    tbody.innerHTML += `
                        <tr>
                            <td>${pedido.cliente.nombre} ${pedido.cliente.apellidos}</td>
                            <td>${pedido.cliente.telefono}</td>
                            <td>${pedido.cliente.correo_electronico}</td>
                            <td>${pedido.cliente.direccion.calle}, ${pedido.cliente.direccion.ciudad}</td>
                        </tr>
                    `;
                }
            });
        }
    }
}

function generarFactura(pedido) {
    const tbody = document.getElementById("factura-body");
    tbody.innerHTML = "";

    pedido.productos.forEach(producto => {
        tbody.innerHTML += `
            <tr>
                <td>${producto.nombre_producto}</td>
                <td>${producto.referencia}</td>
                <td>${producto.precio}€</td>
                <td>${producto.unidades}</td>
                <td>${(producto.precio * producto.unidades).toFixed(2)}€</td>
            </tr>
        `;
    });
}

function mostrarProductosTrimestres(data) {
    const tbody = document.getElementById("productos-trimestres-body");
    tbody.innerHTML = "";

    let productos = {};

    const trimestres = [data["2023"]["Q1"], data["2024"]["Q3"]];

    trimestres.forEach(trimestre => {
        if (trimestre) {
            trimestre.forEach(pedido => {
                pedido.productos.forEach(producto => {
                    if (!productos[producto.referencia]) {
                        productos[producto.referencia] = { 
                            nombre: producto.nombre_producto,
                            referencia: producto.referencia,
                            precio: producto.precio,
                            unidades: 0
                        };
                    }
                    productos[producto.referencia].unidades += producto.unidades;
                });
            });
        }
    });

    for (const key in productos) {
        tbody.innerHTML += `
            <tr>
                <td>${productos[key].nombre}</td>
                <td>${productos[key].referencia}</td>
                <td>${productos[key].precio}€</td>
                <td>${productos[key].unidades}</td>
            </tr>
        `;
    }
}
