document.addEventListener("DOMContentLoaded", () => {
    cargarClientes();
    cargarUsuarios();
    cargarVentas();

    document.getElementById("formVenta").addEventListener("submit", guardarVenta);
    document.getElementById("btnLimpiar").addEventListener("click", limpiarFormulario);
});

// ===============================
// CARGAR CLIENTES
// ===============================
function cargarClientes() {
    fetch("/api/clientes")
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById("id_cliente");
            select.innerHTML = `<option value="">Seleccionar...</option>`;

            data.forEach(c => {
                select.innerHTML += `<option value="${c.id}">${c.nombre}</option>`;
            });
        });
}

// ===============================
// CARGAR USUARIOS
// ===============================
function cargarUsuarios() {
    fetch("/api/usuarios")
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById("id_usuario");
            select.innerHTML = `<option value="">Seleccionar...</option>`;

            data.forEach(u => {
                select.innerHTML += `<option value="${u.id}">${u.nombre}</option>`;
            });
        });
}

// ===============================
// CARGAR VENTAS
// ===============================
function cargarVentas() {
    fetch("/api/ventas")
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector("#tablaVentas tbody");
            tbody.innerHTML = "";

            data.forEach(v => {
                tbody.innerHTML += `
                    <tr>
                        <td>${v.id}</td>
                        <td>${v.cliente}</td>
                        <td>${v.usuario}</td>
                        <td>${v.fecha_venta}</td>
                        <td>$${v.total}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editarVenta(${v.id})">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarVenta(${v.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        });
}

// ===============================
// GUARDAR VENTA
// ===============================
function guardarVenta(e) {
    e.preventDefault();

    const id = document.getElementById("ventaId").value;

    const datos = {
        id_cliente: document.getElementById("id_cliente").value,
        id_usuario: document.getElementById("id_usuario").value,
        total: document.getElementById("total").value
    };

    const url = id ? `/api/ventas/${id}` : "/api/ventas";
    const method = id ? "PUT" : "POST";

    fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    })
        .then(res => res.json())
        .then(() => {
            alert("Venta guardada");
            limpiarFormulario();
            cargarVentas();
        });
}

// ===============================
// EDITAR VENTA
// ===============================
function editarVenta(id) {
    fetch(`/api/ventas/${id}`)
        .then(res => res.json())
        .then(v => {
            document.getElementById("ventaId").value = v.id;
            document.getElementById("id_cliente").value = v.id_cliente;
            document.getElementById("id_usuario").value = v.id_usuario;
            document.getElementById("total").value = v.total;
        });
}

// ===============================
// ELIMINAR VENTA
// ===============================
function eliminarVenta(id) {
    if (!confirm("¿Eliminar venta?")) return;

    fetch(`/api/ventas/${id}`, { method: "DELETE" })
        .then(() => cargarVentas());
}

// ===============================
// LIMPIAR FORMULARIO
// ===============================
function limpiarFormulario() {
    document.getElementById("formVenta").reset();
    document.getElementById("ventaId").value = "";
}
