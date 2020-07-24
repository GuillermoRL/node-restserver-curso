require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const urlencoded = require('body-parser');

const app = express();

app.use(bodyParser, urlencoded({extended: false}));

app.use(bodyParser.json());

app.get('/usuario', (req, res) => {
    res.json('get Usuario');
});

app.post('/usuario', (req, res) => {
    let body = req.body;
    if(body.nombre === undefined){
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    }else{
        res.json({
            persona: body
        });
    }
});

app.put('/usuario', (req, res) => {
    res.json('put Usuario');
});

app.delete('/usuario', (req, res) => {
    res.json('delete Usuario');
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto ${process.env.PORT}`);
})