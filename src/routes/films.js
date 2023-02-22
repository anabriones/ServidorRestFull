import express, { request } from "express";
import peliculas from "../datos/peliculas";
import { auth_token } from "../middlewares/middlewares_perfil";

const router = express.Router();


/**
 * Método que devuelve todas las peliculas en formato json
 */
router.get("/", (req, res, next) => {
  res.status(200).json(peliculas);
});

/**
 * Método que elimina la película que se pasa por parámetro (magic param), 
 * Debe de estar autorizado
 */
router.delete("/:nombre", auth_token, (req, res, next) => {

  peliculas.splice(
    peliculas.findIndex((item) => item.nombre === req.params.nombre), 1 );
      res.status(200).json(peliculas);
    
});


/**
 * Método para añadir una película pasada en el body 
 * Se necesita Autorización, por lo que para llamar a este método, se debe obtener el token previamente
 */
router.post("/",auth_token, (req, res, next) => {
  if(!peliculas.push(req.body)){
    res.status(401).json(req.body);
  }
  res.status(200).json(req.body);
});

/**
 * Método para modificar una película pasada por magic param(El nombre de la pelicula)
 */
router.put("/:nombre",auth_token, async  (req, res, next) => {
  peliculas.splice(
    peliculas.findIndex((item) => item.nombre === req.params.nombre),
    1
  );
  peliculas.push(req.body);
 await res.status(200).json(req.body);
});


/**
 * Método para obtener una película pasada por magic param(El nombre de la pelicula)
 */
router.get("/:nombre", async (req, res, next) => {
  const filmbyname = peliculas.filter(
    (item) => item.nombre.toLowerCase() === req.params.nombre.toLowerCase()
  );

  await res.status(200).json(filmbyname);
});

export default router;
