require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//CONFIGURACION GLOBAL DE RUTAS
app.use(require('./routes/index'));

// HABILITAR CARPETA PUBLIC
app.use(express.static(path.resolve(__dirname, '../public')));

mongoose.connect(process.env.urlDB, { useNewUrlParser: true, useCreateIndex: true },
    (err, res) => {
        if (err) throw err;

        console.log('Base de datos Online');
    });
app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto ${process.env.PORT}`);
})