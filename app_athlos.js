// =============================
// 📦 Importar dependencias
// =============================
const express = require('express');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const path = require('path');

const app = express();

// ⭐ VARIABLE PARA GUARDAR EL USUARIO LOGUEADO
let currentUserId = null;

// =============================
// ⚙️ Middlewares
// =============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =============================
// 📁 SERVIR ARCHIVOS ESTÁTICOS (CORREGIDO)
// =============================
// Esta era la parte que causaba el error de /vista-usuario
app.use(express.static(path.join(__dirname, 'src', 'views')));
app.use('/img', express.static(path.join(__dirname, 'src', 'views', 'img')));
app.use('/js', express.static(path.join(__dirname, 'src', 'views', 'js')));
app.use('/css', express.static(path.join(__dirname, 'src', 'views', 'css')));

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
// 📦 PRODUCTOS (redirigir al CRUD)
// =============================
app.get('/productos', (req, res) => {
  res.redirect('/productos-crud');
});

// =============================
// 📦 PRODUCTOS – CRUD PAGE
// =============================
app.get('/productos-crud', (req, res) => {
  res.sendFile(path.join(__dirname, "src", "views", "productos-crud.html"));
});

// =============================
// 📁 API: IMÁGENES
// =============================
app.get("/api/imagenes", (req, res) => {
  const fs = require("fs");
  const imgPath = path.join(__dirname, "src", "views", "img");

  fs.readdir(imgPath, (err, files) => {
    if (err) return res.status(500).json({ error: "No se pudieron cargar las imágenes" });

    const imagenes = files.filter(file =>
      file.endsWith(".jpg") ||
      file.endsWith(".jpeg") ||
      file.endsWith(".png")
    );

    res.json(imagenes);
  });
});

// =============================
// 📚 API CATEGORÍAS
// =============================
app.get("/api/categorias", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.json({ error: true });

    conn.query("SELECT * FROM categorias", (err, rows) => {
      if (err) return res.json({ error: true });
      res.json(rows);
    });
  });
});

// =============================
// 🧩 API SUBCATEGORÍAS
// =============================
app.get("/api/subcategorias/:id_categoria", (req, res) => {
  const { id_categoria } = req.params;

  req.getConnection((err, conn) => {
    if (err) return res.json({ error: true });

    conn.query(
      "SELECT * FROM subcategorias WHERE id_categoria = ?",
      [id_categoria],
      (err, rows) => {
        if (err) return res.json({ error: true });
        res.json(rows);
      }
    );
  });
});

// =============================
// 🧩 API PRODUCTOS (CRUD Completo)
// =============================

app.get("/api/productos", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.json({ error: true });

    conn.query("SELECT * FROM productos", (err, rows) => {
      if (err) return res.json({ error: true });
      res.json(rows);
    });
  });
});

app.get("/api/productos/:id", (req, res) => {
  const { id } = req.params;

  req.getConnection((err, conn) => {
    if (err) return res.json({ error: true });

    conn.query("SELECT * FROM productos WHERE id = ?", [id], (err, rows) => {
      if (err || rows.length === 0) return res.json({ error: true });
      res.json(rows[0]);
    });
  });
});

app.post("/api/productos", (req, res) => {
  console.log("📦 DATOS RECIBIDOS:", req.body);

  const { nombre, descripcion, precio, stock, id_categoria, id_subcategoria, imagen } = req.body;

  const data = {
    nombre,
    descripcion,
    precio,
    stock,
    id_categoria,
    id_subcategoria,
    id_proveedor: 1,               // obligatorio
    fecha_creacion: new Date(),    // obligatorio
    imagen
  };

  req.getConnection((err, conn) => {
    if (err) return res.json({ error: true });

    conn.query("INSERT INTO productos SET ?", data, (err) => {
      if (err) {
        console.log("❌ ERROR AL INSERTAR:", err);
        return res.json({ error: true });
      }

      return res.json({ success: true });
    });
  });
});


app.put("/api/productos/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;

  req.getConnection((err, conn) => {
    if (err) return res.json({ error: true });

    conn.query("UPDATE productos SET ? WHERE id = ?", [data, id], (err) => {
      if (err) return res.json({ error: true });
      res.json({ success: true });
    });
  });
});

app.delete("/api/productos/:id", (req, res) => {
  const { id } = req.params;

  req.getConnection((err, conn) => {
    if (err) return res.json({ error: true });

    conn.query("DELETE FROM productos WHERE id = ?", [id], (err) => {
      if (err) return res.json({ error: true });
      res.json({ success: true });
    });
  });
});

// =============================
// 🧑‍🤝‍🧑 CRUD CLIENTES
// =============================
app.get('/clientes-page', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'clientes.html'));
});

app.get('/api/clientes', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.json({ error: err });

    conn.query("SELECT * FROM clientes", (err, rows) => {
      if (err) return res.json({ error: err });
      res.json(rows);
    });
  });
});

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
// 👤 LOGIN & REGISTRO USUARIOS
// =============================
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'login.html'));
});

app.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'registro.html'));
});

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

// =============================
// 🔐 LOGIN USER
// =============================
app.post('/login-user', (req, res) => {
  const { correo, password } = req.body;

  req.getConnection((err, conn) => {
    if (err) return res.json({ success: false });

    conn.query(
      "SELECT * FROM usuarios WHERE correo = ? AND password = ?",
      [correo, password],
      (err, rows) => {
        if (rows.length > 0) {

          currentUserId = rows[0].id;

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

// =============================
// 👤 API USER INFO
// =============================
app.get('/api/user-info', (req, res) => {

  if (!currentUserId)
    return res.json({ error: "No hay usuario logueado" });

  req.getConnection((err, conn) => {
    if (err) return res.json({ error: err });

    conn.query(
      "SELECT * FROM usuarios WHERE id = ?",
      [currentUserId],
      (err, rows) => {
        if (err || rows.length === 0) return res.json({ error: true });
        res.json(rows[0]);
      }
    );
  });
});

// =============================
// CRUD USUARIOS (ADMIN)
// =============================
app.get('/usuarios', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'usuarios.html'));
});

app.get('/api/usuarios', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.json({ error: err });

    conn.query("SELECT * FROM usuarios", (err, rows) => {
      if (err) return res.json({ error: err });

      res.json(rows);
    });
  });
});

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
