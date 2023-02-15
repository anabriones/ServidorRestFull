import express, { request } from "express";
import mocks from "../../Datos/mocks";
import { auth_token } from "../middlewares/middlewares_perfil";

const router = express.Router();

/**
 * Método que devuelve todas las peliculas en formato json
 */
router.get("/", (req, res, next) => {
  res.status(200).json(mocks);
});

/**
 * Método que elimina la película que se pasa por parámetro (magic param), 
 * Debe de estar autorizado
 */
router.delete("/:nombre",  (req, res, next) => {
  console.log(req.params.nombre);
  mocks.splice(
    mocks.findIndex((item) => item.nombre === req.params.nombre), 1 );
  res.status(200).json(mocks);
});


/**
 * Método para añadir una película pasada en el body 
 * Se necesita Autorización, por lo que para llamar a este método, se debe obtener el token previamente
 */
router.post("/",auth_token, (req, res, next) => {
  mocks.push(req.body);
  res.status(200).json(mocks);
});

/**
 * Método para modificar una película pasada por magic param(El nombre de la pelicula)
 */
router.put("/:nombre",auth_token, (req, res, next) => {
  mocks.splice(
    mocks.findIndex((item) => item.nombre === req.params.nombre),
    1
  );
  mocks.push(req.body);
  res.status(200).json(req.body);
});


/**
 * Método para obtener una película pasada por magic param(El nombre de la pelicula)
 */
router.get("/:nombre", (req, res, next) => {
  const filmbyname = mocks.filter(
    (item) => item.nombre.toLowerCase() === req.params.nombre.toLowerCase()
  );

  res.status(200).json(filmbyname);
});

export default router;
