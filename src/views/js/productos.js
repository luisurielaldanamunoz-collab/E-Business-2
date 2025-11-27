// =========================================
// 🚀 ESPERAR A QUE EL DOM CARGUE
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    console.log("Productos.js cargado correctamente");

    cargarCategorias();
    cargarImagenes();
    cargarProductos();

    // Evento cuando cambia categoría
    const categoriaSelect = document.getElementById("categoria");
    if (categoriaSelect) {
        categoriaSelect.addEventListener("change", cargarSubcategorias);
    }

    // Evento cuando cambia imagen
    const imagenSelect = document.getElementById("imagen");
    if (imagenSelect) {
        imagenSelect.addEventListener("change", actualizarPreview);
    }

    // Evento guardar producto
    const form = document.getElementById("formProducto");
    if (form) {
        form.addEventListener("submit", guardarProducto);
    }
});

// =========================================
// 📌 CARGAR CATEGORÍAS
// =========================================
function cargarCategorias() {
    fetch("/api/categorias")
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById("categoria");
            if (!select) return;

            select.innerHTML = `<option value="">Seleccionar...</option>`;

            data.forEach(c => {
                select.innerHTML += `<option value="${c.id}">${c.nombre}</option>`;
            });
        })
        .catch(err => console.error("Error cargando categorías:", err));
}

// =========================================
// 📌 CARGAR SUBCATEGORÍAS SEGÚN CATEGORÍA
// =========================================
function cargarSubcategorias() {
    const categoria = document.getElementById("categoria").value;
    const select = document.getElementById("subcategoria");

    if (!select) return;

    if (!categoria) {
        select.innerHTML = `<option value="">Sin subcategoría</option>`;
        return;
    }

    fetch(`/api/subcategorias/${categoria}`)
        .then(res => res.json())
        .then(data => {
            select.innerHTML = `<option value="">Sin subcategoría</option>`;

            data.forEach(sc => {
                select.innerHTML += `<option value="${sc.id}">${sc.nombre}</option>`;
            });
        })
        .catch(err => console.error("Error cargando subcategorías:", err));
}

// =========================================
// 📌 CARGAR LISTA DE IMÁGENES
// =========================================
function cargarImagenes() {
    fetch("/api/imagenes")
        .then(res => res.json())
        .then(lista => {
            const select = document.getElementById("imagen");
            if (!select) return;

            select.innerHTML = `<option value="">Seleccionar imagen...</option>`;

            lista.forEach(nombre => {
                select.innerHTML += `<option value="${nombre}">${nombre}</option>`;
            });
        })
        .catch(err => console.error("Error cargando imágenes:", err));
}

// =========================================
// 🖼 ACTUALIZAR PREVIEW
// =========================================
function actualizarPreview() {
    const imagenSelect = document.getElementById("imagen");
    const preview = document.getElementById("preview");

    if (!imagenSelect || !preview) return;

    const archivo = imagenSelect.value;
    preview.src = archivo ? `/img/${archivo}` : "";
}

// =========================================
// 📌 GUARDAR PRODUCTO (POST O PUT AUTOMÁTICO)
// =========================================
function guardarProducto(e) {
    e.preventDefault();

    const id = document.getElementById("productoId").value || "";

    // 🔥🔥🔥 CORREGIDO: ahora enviamos id_categoria e id_subcategoria
    const datos = {
        nombre: document.getElementById("nombre").value,
        precio: document.getElementById("precio").value,
        stock: document.getElementById("stock").value,
        descripcion: document.getElementById("descripcion").value,
        imagen: document.getElementById("imagen").value,
        id_categoria: document.getElementById("categoria").value,
        id_subcategoria: document.getElementById("subcategoria").value || null
    };

    const metodo = id ? "PUT" : "POST";
    const url = id ? `/api/productos/${id}` : "/api/productos";

    fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    })
    .then(res => res.json())
    .then(() => {
        alert(id ? "Producto actualizado" : "Producto guardado");
        limpiarFormulario();
        cargarProductos();
    })
    .catch(err => console.error("Error guardando producto:", err));
}

// =========================================
// 📌 CARGAR PRODUCTOS EN LA TABLA
// =========================================
function cargarProductos() {
    fetch("/api/productos")
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector("#tablaProductos tbody");
            if (!tbody) return;

            tbody.innerHTML = "";

            data.forEach(p => {
                tbody.innerHTML += `
                    <tr>
                        <td><img src="/img/${p.imagen}" class="preview-img"></td>
                        <td>${p.nombre}</td>
                        <td>${p.precio}</td>
                        <td>${p.stock}</td>
                        <td>${p.id_categoria}</td>
                        <td>${p.id_subcategoria || "-"}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editarProducto(${p.id})">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${p.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        });
}

// =========================================
// ✏ EDITAR PRODUCTO
// =========================================
function editarProducto(id) {
    fetch(`/api/productos/${id}`)
        .then(res => res.json())
        .then(p => {
            document.getElementById("productoId").value = p.id;
            document.getElementById("nombre").value = p.nombre;
            document.getElementById("precio").value = p.precio;
            document.getElementById("stock").value = p.stock;
            document.getElementById("descripcion").value = p.descripcion;

            document.getElementById("categoria").value = p.id_categoria;
            cargarSubcategorias();

            setTimeout(() => {
                document.getElementById("subcategoria").value = p.id_subcategoria;
            }, 300);

            document.getElementById("imagen").value = p.imagen;
            actualizarPreview();
        });
}

// =========================================
// ❌ ELIMINAR PRODUCTO
// =========================================
function eliminarProducto(id) {
    if (!confirm("¿Eliminar producto?")) return;

    fetch(`/api/productos/${id}`, { method: "DELETE" })
        .then(res => res.json())
        .then(() => cargarProductos());
}

// =========================================
// 🧹 LIMPIAR FORMULARIO
// =========================================
function limpiarFormulario() {
    document.getElementById("formProducto").reset();
    document.getElementById("productoId").value = "";

    const preview = document.getElementById("preview");
    if (preview) preview.src = "";
}
