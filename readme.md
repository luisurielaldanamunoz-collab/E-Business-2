# 🔥 PROYECTO ATHLOS SPORT CLUB – Tienda de Ropa Deportiva

Plataforma web desarrollada en **Node.js, Express y MySQL**, diseñada para gestionar una **tienda de ropa deportiva**, con:

- Panel administrativo completo  
- Gestión de productos, clientes y usuarios  
- Vista del usuario con catálogo dinámico  
- Carrito de compras totalmente funcional  
- Finalización de compra con registro de ventas  

La base de datos está modelada en **MySQL Workbench (.mwb)** y exportada como **script .sql** para su instalación inmediata.

---

## 📦 Requisitos Previos

Asegúrate de tener instalado:

✔ **XAMPP** (MySQL + Apache)  
https://www.apachefriends.org/

✔ **Node.js**  
https://nodejs.org/

✔ **MySQL Workbench** (opcional)  
https://dev.mysql.com/downloads/workbench/

✔ **Visual Studio Code**  

---

## 🗄️ Creación de la Base de Datos

### 📌 Opción 1: phpMyAdmin  
1. Abrir XAMPP → Activar MySQL  
2. Entrar a: http://localhost/phpmyadmin  
3. Ir a **Importar**  
4. Cargar el archivo:  
/db/athlos.sql

markdown
Copiar código
5. Clic en **Continuar**  

Se crearán las tablas:

- usuarios  
- clientes  
- productos  
- categorias  
- subcategorias  
- carrito  
- ventas  
- proveedores  
- envios  
- reseñas  
- inventario  
- bitacora  

---

### 📌 Opción 2: MySQL Workbench  
1. Workbench → File → **Open Model**  
2. Abrir:
/db/athlos.mwb

yaml
Copiar código
3. Database → **Forward Engineer**  
4. Ejecutar  

---

## ⚙️ Instalación del Proyecto

En la terminal dentro del proyecto:

```bash
npm init -y
npm install express mysql express-myconnection
npm install --save-dev nodemon
▶️ Ejecución del Servidor
bash
Copiar código
npx nodemon app_athlos.js
Servidor disponible en:
👉 http://localhost:8080

🔐 Usuario MySQL (opcional)
sql
Copiar código
CREATE USER 'luis'@'localhost' IDENTIFIED BY '123';
GRANT ALL PRIVILEGES ON athlos.* TO 'luis'@'localhost';
FLUSH PRIVILEGES;
📂 Estructura del Proyecto
pgsql
Copiar código
/src
 ├── views/
 │   ├── css/
 │   │     └── vista-usuario.css
 │   ├── js/
 │   │     ├── productos.js
 │   │     ├── catalogo.js
 │   │     ├── carrito.js
 │   ├── admin.html
 │   ├── dashboard.html
 │   ├── clientes.html
 │   ├── productos-crud.html
 │   ├── usuarios.html
 │   ├── login.html
 │   ├── registro.html
 │   ├── vista-usuario.html
 │
 ├── app_athlos.js
/db
 ├── athlos.sql
 ├── athlos.mwb
🚀 Funcionalidades del Proyecto
🧑‍💻 Panel de Administración
✔ Login seguro del administrador
✔ Gestión de clientes (CRUD)
✔ Gestión de usuarios (CRUD)
✔ Gestión de productos con:
Categorías

Subcategorías

Proveedores

Inventario

Imágenes

Edición y eliminación

Tabla interactiva

✔ Dashboard administrativo general
👤 Vista del Usuario
✔ Registro de usuario
✔ Inicio de sesión
✔ Perfil con:
Nombre

Correo

Fecha de registro

✔ Navegación interna
✔ Catálogo dinámico 100% conectado al backend
✔ Filtros por:
Categorías

Subcategorías

✔ Productos en tarjetas con:
Imagen

Descripción

Precio

Actualización automática si se agregan o editan productos en el panel admin.

🛒 Carrito de Compras (FUNCIONAL)
Incluye:

✔ Añadir productos al carrito
✔ Aumentar o disminuir cantidad (desde catálogo)
✔ Mostrar carrito en tiempo real
✔ Eliminar productos del carrito
✔ Total dinámico
✔ Guardado por usuario en la BD
✔ Finalizar compra
Inserta una venta real en la tabla ventas y vacía el carrito después.

🛠️ Funciones Técnicas Implementadas
⭐ Catálogo completamente dinámico
Construido con catalogo.js

Se conecta a /api/productos

Filtrado inteligente

Subcategorías incluidas

Compatible con imágenes de productos

Diseño tipo tienda real

⭐ Integración del carrito (carrito.js)
Manejo de carrito desde la BD

GET /api/carrito/:id_usuario

DELETE /api/carrito/item/:id

Finalizar compra conectada a POST /api/ventas

⭐ Optimización en la BD
Relación id_subcategoria incluida

Proveedores conectados con FK

Inventario integrado

Modelo listo para escalar

🔗 Repositorio
https://github.com/luisurielaldanamunoz-collab/E-Business-2.git