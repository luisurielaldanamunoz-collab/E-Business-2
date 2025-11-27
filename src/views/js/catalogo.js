document.addEventListener("DOMContentLoaded", () => {
    cargarCategorias();
    cargarProductos();

    document.getElementById("filtroCategoria").addEventListener("change", cargarSubcategorias);
    document.getElementById("filtroCategoria").addEventListener("change", cargarProductos);
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

    // ⭐ Accesorios (id_categoria = 3) NO tiene subcategorías
    if (categoria === "3") {
        select.innerHTML = `<option value="">Todas las subcategorías</option>`;
        return;
    }

    // Si no selecciona categoría → reset
    if (!categoria) {
        select.innerHTML = `<option value="">Todas las subcategorías</option>`;
        return;
    }

    // Cargar subcategorías normales
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

            // Filtrar por categoría
            if (categoria) {
                productos = productos.filter(p => p.id_categoria == categoria);
            }

            // Filtrar por subcategoría SOLO si no es Accesorios (id = 3)
            if (categoria !== "3") {
                if (subcategoria) {
                    productos = productos.filter(p => p.id_subcategoria == subcategoria);
                }
            }

            // Renderizar
            const contenedor = document.getElementById("listaProductos");
            contenedor.innerHTML = "";

            productos.forEach(p => {
                contenedor.innerHTML += `
                    <div class="card-producto">
                        <img src="/img/${p.imagen}" class="img-producto">
                        <h4>${p.nombre}</h4>
                        <p>${p.descripcion}</p>
                        <span class="precio">$${p.precio}</span>
                    </div>
                `;
            });
        });
}
