// =============================
// 📦 Importar dependencias
// =============================
const express = require('express');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const path = require('path');

const app = express();

// =============================
// ⚙️ Middlewares
// =============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'src', 'views')));

// =============================
// 💾 Conexión con MySQL
// =============================
app.use(
  myConnection(
    mysql,
    {
      host: 'localhost',
      user: 'luis',
      password: '123',
      port: 3306,
      database: 'athlos',
    },
    'single'
  )
);

// =============================
// 🔐 LOGIN ADMIN
// =============================
app.get('/', (req, res) => res.redirect('/admin'));

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'admin.html'));
});

app.post('/admin-login', (req, res) => {
  const { usuario, password } = req.body;

  if (usuario === 'admin' && password === '123') {
    return res.json({ success: true, redirect: '/dashboard' });
  }

  return res.json({ success: false, message: '❌ Credenciales inválidas' });
});

// =============================
// 🌐 DASHBOARD ADMIN
// =============================
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'dashboard.html'));
});

// =============================
// 🆕 📦 RUTA NUEVA: PRODUCTOS
// =============================
app.get('/productos', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'productos.html'));
});

// =============================
// 🧩 CRUD CLIENTES (FUNCIONANDO)
// =============================

// Vista principal
app.get('/clientes-page', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'clientes.html'));
});

// Obtener todos
app.get('/api/clientes', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.json({ error: err });

    conn.query("SELECT * FROM clientes", (err, rows) => {
      if (err) return res.json({ error: err });

      res.json(rows);
    });
  });
});

// Crear
app.post('/api/clientes', (req, res) => {
  const { nombre, correo, telefono, direccion } = req.body;

  req.getConnection((err, conn) => {
    if (err) return res.json({ error: err });

    conn.query(
      "INSERT INTO clientes SET ?",
      { nombre, correo, telefono, direccion },
      (err) => {
        if (err) return res.json({ error: err });

        res.json({ message: "Cliente agregado correctamente" });
      }
    );
  });
});

// Editar
app.put('/api/clientes/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, correo, telefono, direccion } = req.body;

  req.getConnection((err, conn) => {
    if (err) return res.json({ error: err });

    conn.query(
      "UPDATE clientes SET ? WHERE id = ?",
      [{ nombre, correo, telefono, direccion }, id],
      (err) => {
        if (err) return res.json({ error: err });

        res.json({ message: "Cliente actualizado correctamente" });
      }
    );
  });
});

// Eliminar
app.delete('/api/clientes/:id', (req, res) => {
  const { id } = req.params;

  req.getConnection((err, conn) => {
    if (err) return res.json({ error: err });

    conn.query("DELETE FROM clientes WHERE id = ?", [id], (err) => {
      if (err) return res.json({ error: err });

      res.json({ message: "Cliente eliminado correctamente" });
    });
  });
});

// =============================
// 👤 LOGIN Y REGISTRO USUARIOS
// =============================
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'login.html'));
});

app.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'registro.html'));
});

// Registrar usuario
app.post('/register-user', (req, res) => {
  const { nombre, correo, password } = req.body;

  req.getConnection((err, conn) => {
    if (err) return res.json({ success: false });

    conn.query(
      "INSERT INTO usuarios SET ?",
      { nombre, correo, password },
      (err) => {
        if (err) return res.json({ success: false });
        res.json({ success: true });
      }
    );
  });
});

// Login usuario
app.post('/login-user', (req, res) => {
  const { correo, password } = req.body;

  req.getConnection((err, conn) => {
    if (err) return res.json({ success: false });

    conn.query(
      "SELECT * FROM usuarios WHERE correo = ? AND password = ?",
      [correo, password],
      (err, rows) => {
        if (rows.length > 0) {
          return res.json({ success: true, redirect: "/vista-usuario" });
        }
        return res.json({ success: false });
      }
    );
  });
});

// =============================
// 👤 VISTA DE USUARIO
// =============================
app.get('/vista-usuario', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'vista-usuario.html'));
});

app.get('/api/user-info', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.json({ error: err });

    conn.query("SELECT * FROM usuarios ORDER BY id DESC LIMIT 1", (err, rows) => {
      if (err || rows.length === 0) return res.json({ error: true });

      res.json(rows[0]);
    });
  });
});

// =============================
// 👥 CRUD USUARIOS (ADMIN)
// =============================
app.get('/usuarios', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'usuarios.html'));
});

// Listar
app.get('/api/usuarios', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.json({ error: err });

    conn.query("SELECT * FROM usuarios", (err, rows) => {
      if (err) return res.json({ error: err });

      res.json(rows);
    });
  });
});

// Editar
app.put('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, correo } = req.body;

  req.getConnection((err, conn) => {
    if (err) return res.json({ error: err });

    conn.query(
      "UPDATE usuarios SET ? WHERE id = ?",
      [{ nombre, correo }, id],
      (err) => {
        if (err) return res.json({ error: err });

        res.json({ message: "Usuario actualizado" });
      }
    );
  });
});

// Eliminar
app.delete('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;

  req.getConnection((err, conn) => {
    if (err) return res.json({ error: err });

    conn.query("DELETE FROM usuarios WHERE id = ?", [id], (err) => {
      if (err) return res.json({ error: err });

      res.json({ message: "Usuario eliminado" });
    });
  });
});

// =============================
// 🚀 Servidor
// =============================
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`🔥 Servidor activo en http://localhost:${PORT}`);
});
