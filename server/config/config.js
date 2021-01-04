// ===============================
// PUERTO
// ===============================

process.env.PORT = process.env.PORT || 3000;

// ===============================
// ENTORNO
// ===============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===============================
// VENCIMIENTO TOKEN
// ===============================
// 60 SEGUNDOS
// 60 MINUTOS
// 24 HORAS
// 30 DIAS
process.env.CADUCIDAD_TOKEN = '48h';

// ===============================
// SEMILLA
// ===============================
process.env.SEED = process.env.SEED || 'secret'

// ===============================
// BASE DE DATOS
// ===============================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = process.env.MONGO_URI
}

// ===============================
// GOOGLE CLIENT ID
// ===============================

process.env.CLIENT_ID = process.env.CLIENT_ID || '1078976816406-5bvt0b79bjvbov483snoa1055unocm03.apps.googleusercontent.com'

process.env.urlDB = urlDB;