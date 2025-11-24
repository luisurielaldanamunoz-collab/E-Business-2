Proyecto Athlos Sport Club – Tienda de Ropa Deportiva
Descripción del proyecto

Este proyecto consiste en una tienda de ropa deportiva desarrollada en Node.js con Express y MySQL como base de datos.
Incluye módulos para gestión de usuarios, clientes, productos, categorías, subcategorías, ventas y panel administrativo.
La base de datos fue modelada en MySQL Workbench (.mwb) y exportada como script .sql.

Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

XAMPP (para Apache y MySQL)
https://www.apachefriends.org/

Node.js
https://nodejs.org/

MySQL Workbench (opcional, para visualizar el modelo ER)
https://dev.mysql.com/downloads/workbench/

Editor de código como Visual Studio Code

Creación de la base de datos
Opción 1: Desde phpMyAdmin

Abre XAMPP Control Panel y asegúrate de que MySQL esté iniciado.

Accede a:
http://localhost/phpmyadmin

Selecciona la pestaña "Importar".

Carga el archivo:
db/athlos.sql

Haz clic en "Continuar".

Se crearán automáticamente las tablas:

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

Opción 2: Desde MySQL Workbench

Abre MySQL Workbench → File → Open Model.

Selecciona el archivo:
db/athlos.mwb

Verifica el diagrama ER.

Selecciona Database → Forward Engineer.

Elige tu conexión local.

Haz clic en "Execute".

Instalación del proyecto

Ejecuta los siguientes comandos en la terminal dentro de la carpeta del proyecto:

npm init -y
npm install express mysql express-myconnection
npm install --save-dev nodemon

Ejecución del servidor
npx nodemon src/app_athlos.js


El servidor iniciará en:

http://localhost:8080

Creación del usuario MySQL (opcional)

Ejecutar en la consola de MySQL:

CREATE USER 'luis'@'localhost' IDENTIFIED BY '123';
GRANT ALL PRIVILEGES ON athlos.* TO 'luis'@'localhost';
FLUSH PRIVILEGES;

Estructura del proyecto
/src
 ├── controllers/
 ├── views/
 │   ├── css/
 │   ├── js/
 │   ├── admin.html
 │   ├── dashboard.html
 │   ├── clientes.html
 │   ├── productos.html
 │   ├── usuarios.html
 │   ├── login.html
 │   ├── registro.html
 │   ├── vista-usuario.html
 │
 ├── app_athlos.js

/db
 ├── athlos.sql
 ├── athlos.mwb

Funcionalidades incluidas
Panel de administración

Login del administrador

Gestión de clientes (CRUD)

Gestión de usuarios (CRUD)

Gestión de productos por categoría y subcategoría

Vista general de administración

Vista del usuario

Registro de usuario

Inicio de sesión

Perfil de usuario

Vista básica del panel de usuario

Enlace al repositorio

https://github.com/luisurielaldanamunoz-collab/E-Business-2.git