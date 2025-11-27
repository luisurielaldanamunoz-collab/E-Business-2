🔥PROYECTO ATHLOS SPORT CLUB – Tienda de Ropa Deportiva

Plataforma web desarrollada en Node.js, Express y MySQL, diseñada para gestionar una tienda de ropa deportiva con panel administrativo, gestión de productos y una vista de usuario con catálogo dinámico.

Incluye módulos para:

Gestión de usuarios

Gestión de clientes

Gestión de productos

Categorías y subcategorías

Proveedores

Inventario

Ventas (estructura lista)

Vista de usuario con catálogo

La base de datos está modelada en MySQL Workbench (.mwb) y exportada como script .sql para su fácil instalación.

📦 Requisitos Previos

Asegúrate de tener instalado:

✔ XAMPP (para MySQL y Apache)

https://www.apachefriends.org/

✔ Node.js

https://nodejs.org/

✔ MySQL Workbench (opcional, para visualizar el modelo ER)

https://dev.mysql.com/downloads/workbench/

✔ Visual Studio Code u otro editor
🗄️ Creación de la Base de Datos
📌 Opción 1: Desde phpMyAdmin

Abre XAMPP Control Panel y activa MySQL.

Entra a:
http://localhost/phpmyadmin

Ve a Importar.

Carga el archivo:

/db/athlos.sql


Clic en Continuar.

Se crearán las tablas:

usuarios

clientes

productos

categorias

subcategorias

carrito

ventas

proveedores

envios

reseñas

inventario

bitacora

📌 Opción 2: Desde MySQL Workbench

Abrir Workbench → File → Open Model

Cargar:

/db/athlos.mwb


Database → Forward Engineer

Seleccionar la conexión local

Ejecutar

⚙️ Instalación del Proyecto

En la terminal dentro del proyecto:

npm init -y
npm install express mysql express-myconnection
npm install --save-dev nodemon

▶️ Ejecución del Servidor
npx nodemon app_athlos.js


Servidor disponible en:
👉 http://localhost:8080

🔐 Creación del Usuario MySQL (opcional)
CREATE USER 'luis'@'localhost' IDENTIFIED BY '123';
GRANT ALL PRIVILEGES ON athlos.* TO 'luis'@'localhost';
FLUSH PRIVILEGES;

📂 Estructura del Proyecto
/src
 ├── controllers/        (no usado actualmente)
 ├── views/
 │   ├── css/
 │   │     └── vista-usuario.css
 │   ├── js/
 │   │     ├── productos.js
 │   │     └── catalogo.js   ← NUEVO
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
✔ Login del administrador
✔ Gestión de clientes (CRUD completo)
✔ Gestión de usuarios (CRUD completo)
✔ Gestión de productos

Categorías

Subcategorías

Imágenes

Proveedores

Inventario

Edición y eliminación

Vista en tabla

✔ Dashboard administrativo general
👤 Vista del Usuario
✔ Registro de usuario
✔ Inicio de sesión
✔ Perfil con:

Nombre

Correo

Fecha de registro

✔ Catálogo dinámico de productos (NUEVO)

Obtiene productos desde el backend

Filtrado por categoría

Hombre

Mujer

Accesorios

Filtrado por subcategorías

Playeras, Shorts, Pants

Blusas Deportivas, Tops

Accesorios (sin subcategorías)

Vista en tarjetas con imagen, descripción y precio

Se actualiza automáticamente cuando se agrega o edita un producto desde el panel admin

✔ Panel de usuario con navegación
🆕 Nuevas Funciones Implementadas

Estas funciones fueron agregadas en esta versión:

⭐ Catálogo de productos totalmente dinámico

Construido con catalogo.js

Se conecta a /api/productos

Filtrado inteligente por categorías

Filtrado inteligente por subcategorías

Accesorios sin subcategorías

Diseño tipo tienda real

⭐ Actualización automática

Todo producto nuevo o editado en el CRUD aparece automáticamente en:

Vista del usuario

Catálogo

Filtros

⭐ Mejoras de integridad en MySQL

id_subcategoria agregado a productos

id_proveedor con FK válida

Guardado sin errores

🔗 Repositorio

https://github.com/luisurielaldanamunoz-collab/E-Business-2.git

Si quieres, puedo también agregarte:

✨ Capturas de pantalla
✨ Diagrama ER en el README
✨ Video de funcionamiento
✨ Badges (Node.js, MySQL, Express)