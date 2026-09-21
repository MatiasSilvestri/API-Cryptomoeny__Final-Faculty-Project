import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url); //Ruta completa del archivo actual

const __dirname = dirname(__filename); //Ruta de la carpeta donde está este archivo

const sesion = express();
sesion.set("port", 4000);
sesion.listen(sesion.get("port"));
console.log("servidor corriendo puerto", sesion.get("port"));

//rutas
sesion.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/sesion.html"));

});
