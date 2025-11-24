const tablaBody = document.querySelector('#tablaClientes tbody');
const form = document.querySelector('#clienteForm');

let modoEdicion = false;
let idClienteActual = null;

// Cargar clientes al iniciar
document.addEventListener('DOMContentLoaded', cargarClientes);

async function cargarClientes() {
  const res = await fetch('/api/clientes');
  const clientes = await res.json();

  tablaBody.innerHTML = '';
  clientes.forEach(c => {
    tablaBody.innerHTML += `
      <tr>
        <td>${c.id}</td>
        <td>${c.nombre}</td>
        <td>${c.correo}</td>
        <td>${c.telefono}</td>
        <td>${c.direccion}</td>
        <td>
          <button class="btn btn-warning btn-sm me-1" onclick="editarCliente(${c.id}, '${c.nombre}', '${c.correo}', '${c.telefono}', '${c.direccion}')">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="eliminarCliente(${c.id})">Eliminar</button>
        </td>
      </tr>`;
  });
}

// Agregar o editar cliente
form.addEventListener('submit', async e => {
  e.preventDefault();

  const data = {
    nombre: form.nombre.value.trim(),
    correo: form.correo.value.trim(),
    telefono: form.telefono.value.trim(),
    direccion: form.direccion.value.trim(),
  };

  const url = modoEdicion ? `/api/clientes/${idClienteActual}` : '/api/clientes';
  const method = modoEdicion ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  alert(result.message);

  modoEdicion = false;
  idClienteActual = null;
  form.reset();
  cargarClientes();
});

// Editar cliente
function editarCliente(id, nombre, correo, telefono, direccion) {
  form.nombre.value = nombre;
  form.correo.value = correo;
  form.telefono.value = telefono;
  form.direccion.value = direccion;

  modoEdicion = true;
  idClienteActual = id;
  alert('✏️ Modo edición activado — guarda para actualizar el cliente.');
}

// Eliminar cliente
async function eliminarCliente(id) {
  if (!confirm('¿Seguro que deseas eliminar este cliente?')) return;
  await fetch(`/api/clientes/${id}`, { method: 'DELETE' });
  alert('Cliente eliminado.');
  cargarClientes();
}
