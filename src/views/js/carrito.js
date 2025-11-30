// =====================================================
// 🛒 Cargar carrito desde la BD
// =====================================================
function cargarCarrito() {

    if (!window.usuarioId) return;

    fetch(`/api/carrito/${window.usuarioId}`)
        .then(res => res.json())
        .then(items => {
            const carritoDiv = document.getElementById("carritoLista");
            const totalSpan = document.getElementById("carritoTotal");

            carritoDiv.innerHTML = "";
            let total = 0;

            items.forEach(i => {
                const subtotal = i.cantidad * i.precio;
                total += subtotal;

                carritoDiv.innerHTML += `
                    <div class="carrito-item">
                        <h4>${i.nombre}</h4>
                        <p>Cantidad: ${i.cantidad}</p>
                        <p>Subtotal: $${subtotal}</p>

                        <button class="eliminar-btn"
                            onclick="eliminarDelCarrito(${i.id})">
                            Eliminar
                        </button>
                    </div>
                `;
            });

            totalSpan.textContent = `$${total}`;
        })
        .catch(err => console.error("Error cargando carrito:", err));
}

// =====================================================
// 🗑 Eliminar producto del carrito
// =====================================================
function eliminarDelCarrito(id_item) {

    if (!window.usuarioId) return;

    fetch(`/api/carrito/item/${id_item}`, { method: "DELETE" })
        .then(() => cargarCarrito());
}

// =====================================================
// 🛍 Finalizar compra
// =====================================================
function finalizarCompra() {

    if (!window.usuarioId) {
        alert("Error: usuario no identificado.");
        return;
    }

    fetch(`/api/carrito/${window.usuarioId}`)
        .then(res => res.json())
        .then(items => {

            if (items.length === 0) {
                alert("Carrito vacío");
                return;
            }

            let total = 0;
            items.forEach(i => total += i.cantidad * i.precio);

            fetch("/api/ventas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_usuario: window.usuarioId,
                    id_cliente: window.usuarioId,
                    total: total
                })
            })
            .then(res => res.json())
            .then(() => {
                alert("Compra realizada con éxito");

                fetch(`/api/carrito/${window.usuarioId}`, {
                    method: "DELETE"
                }).then(() => cargarCarrito());
            });
        });
}
