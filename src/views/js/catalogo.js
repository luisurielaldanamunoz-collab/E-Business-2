document.addEventListener("DOMContentLoaded", () => {
    cargarCategorias();
    cargarProductos();
    cargarCarrito(); // 🔥 cargar carrito al inicio

    document.getElementById("filtroCategoria").addEventListener("change", () => {
        cargarSubcategorias();
        cargarProductos();
    });

    document.getElementById("filtroSubcategoria").addEventListener("change", cargarProductos);

});

// =========================
// CARGAR CATEGORÍAS
// =========================
function cargarCategorias() {
    fetch("/api/categorias")
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById("filtroCategoria");
            select.innerHTML = `<option value="">Todas las categorías</option>`;

            data.forEach(cat => {
                select.innerHTML += `<option value="${cat.id}">${cat.nombre}</option>`;
            });
        });
}

// =========================
// CARGAR SUBCATEGORÍAS
// =========================
function cargarSubcategorias() {
    const categoria = document.getElementById("filtroCategoria").value;
    const select = document.getElementById("filtroSubcategoria");

    if (categoria === "3") {
        select.innerHTML = `<option value="">Todas las subcategorías</option>`;
        return;
    }

    if (!categoria) {
        select.innerHTML = `<option value="">Todas las subcategorías</option>`;
        return;
    }

    fetch(`/api/subcategorias/${categoria}`)
        .then(res => res.json())
        .then(data => {
            select.innerHTML = `<option value="">Todas las subcategorías</option>`;
            data.forEach(sc => {
                select.innerHTML += `<option value="${sc.id}">${sc.nombre}</option>`;
            });
        });
}

// =========================
// CARGAR PRODUCTOS
// =========================
function cargarProductos() {
    const categoria = document.getElementById("filtroCategoria").value;
    const subcategoria = document.getElementById("filtroSubcategoria").value;

    fetch("/api/productos")
        .then(res => res.json())
        .then(data => {
            let productos = data;

            if (categoria) {
                productos = productos.filter(p => p.id_categoria == categoria);
            }

            if (categoria !== "3" && subcategoria) {
                productos = productos.filter(p => p.id_subcategoria == subcategoria);
            }

            const contenedor = document.getElementById("listaProductos");
            contenedor.innerHTML = "";

            productos.forEach(p => {
                contenedor.innerHTML += `
                    <div class="card-producto">
                        <img src="/img/${p.imagen}" class="img-producto">
                        <h4>${p.nombre}</h4>
                        <p>${p.descripcion}</p>
                        <span class="precio">$${p.precio}</span>

                        <label>Cantidad:</label>
                        <input type="number" id="cantidad_${p.id}" value="1" min="1" class="cantidad-input">

                        <button class="btn-agregar" onclick="agregarAlCarrito(${p.id}, ${p.precio})">
                            Agregar al carrito
                        </button>
                    </div>
                `;
            });
        });
}

// =========================
// AGREGAR AL CARRITO
// =========================
function agregarAlCarrito(idProducto, precio) {
    const inputCantidad = document.getElementById(`cantidad_${idProducto}`);
    const cantidad = parseInt(inputCantidad.value);

    if (cantidad <= 0) {
        alert("La cantidad debe ser mayor a 0");
        return;
    }

    fetch("/api/carrito", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id_usuario: window.usuarioId,
            id_producto: idProducto,
            cantidad
        })
    })
        .then(res => res.json())
        .then(data => {
            cargarCarrito();
        });
}

// =========================
// MOSTRAR CARRITO EN LA VISTA
// ⚠️ RENOMBRADO PARA EVITAR CONFLICTO
// =========================
function cargarCarritoCatalogo() {
    fetch(`/api/carrito/${window.usuarioId}`)
        .then(res => res.json())
        .then(items => {
            let html = "";
            let total = 0;

            items.forEach(i => {
                const subtotal = i.cantidad * i.precio;
                total += subtotal;

                html += `
                    <p>${i.nombre} (x${i.cantidad}) $${subtotal}</p>
                `;
            });

            if (document.getElementById("carritoItems")) {
                document.getElementById("carritoItems").innerHTML = html || "Carrito vacío";
            }
            if (document.getElementById("totalCarrito")) {
                document.getElementById("totalCarrito").innerText = "$" + total;
            }
        });
}


// =========================
// FINALIZAR COMPRA
// =========================
function finalizarCompra() {

    fetch(`/api/carrito/${window.usuarioId}`)
        .then(res => res.json())
        .then(items => {

            if (items.length === 0) {
                alert("Carrito vacío");
                return;
            }

            let total = 0;
            items.forEach(i => {
                total += i.cantidad * i.precio;
            });

            // Insertar venta
            fetch("/api/ventas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_usuario: window.usuarioId,
                    id_cliente: window.usuarioId,
                    total
                })
            })
            .then(res => res.json())
            .then(() => {

                alert("Compra realizada con éxito");

                // Vaciar carrito
                fetch(`/api/carrito/${window.usuarioId}`, { method: "DELETE" })
                    .then(() => cargarCarrito());
            });
        });
}

