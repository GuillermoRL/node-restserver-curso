const express = require('express');

let { verificaToken, verificaAdmin_role } = require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/categoria');

// ===============================
//  TODAS LAS CATEGORIAS
// ===============================
app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({}, 'descripcion usuario')
        // skip salta el número de registros que coloques en los paréntesis
        //.skip(desde)
        // limit sirve para traer solo una cantidad de registros
        //.limit(limite)
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            // funcion para contar los registros
            //Usuario.count({ estado: true }, (err, conteo) => {
            res.json({
                ok: true,
                categorias
            });
            //});

        });
});

// ===============================
//  CATEGORIA POR ID
// ===============================
app.get('/categoria/:id', (req, res) => {
    let id = req.params.id;
    console.log(id);
    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Id incorrecto'
                    }
                });
            }
            res.json({
                ok: true,
                categoria: categoriaDB
            });
        }
    })
});

// ===============================
//  CREAR NUEVA CATEGORIA
// ===============================
app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body;
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });
    console.log(categoria);
    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
});

// ===============================
//  ACTUALIZAR CATEGORIA
// ===============================
app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    console.log(id);
    let body = req.body;
    let descCategoria = {
        descripcion: body.descripcion
    }
    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No se actualizo la categoria'
                }
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
});

// ===============================
//  ELIMINAR CATEGORIA (LOGICO)
// ===============================
app.delete('/categoria/:id', [verificaToken, verificaAdmin_role], (req, res) => {
    let id = req.params.id
    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }
        res.json({
            ok: true,
            message: 'Categoria borrada'
        })
    })
});

module.exports = app;