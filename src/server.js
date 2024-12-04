const express = require("express");
const cors = require("cors");

// Importación de rutas
const Mercado_Pago_Router = require("./router/Mercado_Pago_Router");

const server = express();

// Middlewares
server.use(express.json());
server.use(cors());

// Rutas
server.use("/Mercado_Pago", Mercado_Pago_Router);

module.exports = server;
