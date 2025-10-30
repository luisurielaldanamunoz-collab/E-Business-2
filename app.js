const express = require('express');
const mysql=require("mysql")
const myConnection= require("express-myconnection")


const app = express();


app.use (myConnection(mysql, {
host: localhost, 
user: 'luis', 
password: '123', 
port: 3306, 
database: 'dbs7a25'
}))

app.get('/',(req, res) => res.send('Hello World'));
app.listen(8080);