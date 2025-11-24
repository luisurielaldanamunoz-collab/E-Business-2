const form = document.querySelector('#adminForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const usuario = document.querySelector('#usuario').value;
  const password = document.querySelector('#password').value;

  const res = await fetch('/admin-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, password })
  });

  const data = await res.json();

  if (data.success) {
    alert('✅ Bienvenido Administrador');
    window.location.href = '/dashboard';
  } else {
    alert('❌ Credenciales incorrectas');
  }
});
