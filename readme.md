#  Proyecto E-BUSINESS – Tienda de Ropa Deportiva

##  Descripción del proyecto
Este proyecto consiste en una **tienda de ropa deportiva** desarrollada en **Node.js con Express** y **MySQL** como base de datos.  
El sistema permite gestionar productos, categorías, clientes, ventas y carritos de compra.  
La base de datos fue diseñada en **MySQL Workbench (.mwb)** y exportada a un script `.sql` para su instalación.



##  Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [XAMPP](https://www.apachefriends.org/) (para usar Apache y MySQL)
- [Node.js](https://nodejs.org/)
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) (opcional, para ver el diseño visual)
- Visual Studio Code o cualquier editor de texto


##  Creación de la base de datos

### Opción 1: Desde phpMyAdmin
1. Abre **XAMPP Control Panel** y asegúrate de que **MySQL** esté iniciado (verde).
2. Entra a: [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
3. Haz clic en “Importar”.
4. Selecciona el archivo `db/dbs7a25.sql`.
5. Presiona **Continuar**.
6. Se crearán automáticamente las tablas:
   - `usuarios`
   - `clientes`
   - `productos`
   - `categorias`
   - `carrito`
   - `ventas`
   - `proveedores`
   - `envios`
   - `reseñas`
   - `inventario`
   - `bitacora`
   

### Opción 2: Desde MySQL Workbench
1. Abre **Workbench** → `File → Open Model`
2. Carga el archivo `db/dbs7a25.mwb`
3. Verifica las relaciones visuales.
4. Haz clic en **Database → Forward Engineer**
5. Selecciona tu conexión local (`root@localhost`)
6. Da clic en **Execute** para generar toda la base automáticamente.



##  Instalación de módulos necesarios

Ejecuta los siguientes comandos desde la carpeta del proyecto:

```bash
# Inicializar el proyecto (si aún no se ha hecho)
npm init -y

# Instalar dependencias principales
npm install express mysql express-myconnection

# Instalar dependencia para desarrollo (reinicia el servidor automáticamente)
npm install --save-dev nodemon

npx nodemon src/app.js


---

## Creación de la base de datos y usuario MySQL

### 1. Crear la base de datos
Abre tu consola de MySQL desde XAMPP (botón **Shell** o usando **cmd**):

```bash
mysql -u root -p

CREATE USER 'luis'@'localhost' IDENTIFIED BY '123';
GRANT ALL PRIVILEGES ON dbs7a25.* TO 'luis'@'localhost';
FLUSH PRIVILEGES;


###Link de GitHub
https://github.com/luisurielaldanamunoz-collab/E-Business-2.git