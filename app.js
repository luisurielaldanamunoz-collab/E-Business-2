const express = require('express');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'luis',
  password: '123',
  port: 3306,
  database: 'dbs7a25'
}, 'single'));

// Ruta de prueba para verificar la conexión
app.get('/', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      console.error(' Error de conexión:', err);
      return res.status(500).send(' Error de conexión con la base de datos.');
    }

    res.send(' Conexión exitosa con MySQL');
  });
});

app.listen(8080, () => {
  console.log('Servidor ejecutándose en http://localhost:8080');
});
