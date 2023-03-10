import express, { request } from "express";
import { PELICULAS } from "../datos/peliculas";
import { auth_token } from "../middlewares/middlewares_perfil";

const router = express.Router();

/**
 * Método que devuelve todas las peliculas en formato json
 */
router.get("/", (req, res, next) => {
  if (PELICULAS) {
    res.status(200).json(PELICULAS);
  } else {
    res.status(401).json("Ha habido un problema para recuperar las películas");
  }
});

/**
 * Método que elimina la película que se pasa por parámetro (magic param),
 * Debe de estar autorizado
 */
router.delete("/:nombre", auth_token, async(req, res, next) => {
  
  const film = PELICULAS.find((film) => film.nombre === req.params.nombre);
  if (!film) {
  res.status(402).json("Ha habido un error al eliminar la pelicula");
  } else {
    PELICULAS.splice(
      PELICULAS.findIndex((item) => item.nombre === req.params.nombre),
      1
    );

    res.status(200).json(PELICULAS);
  }
  

});

/**
 * Método para añadir una película pasada en el body
 * Se necesita Autorización, por lo que para llamar a este método, se debe obtener el token previamente
 */
router.post("/", auth_token,async (req, res, next) => {
  const film = PELICULAS.find(
    (item) => item.nombre.toLowerCase() === req.body.nombre.toLowerCase()
  );
  if (film) {
  res.status(401).json("La pelicula ya existe");
  } else {
    PELICULAS.push(req.body);
    res.status(200).json(PELICULAS);
  }
});

/**
 * Método para modificar una película pasada por magic param(El nombre de la pelicula)
 * Como es un fichero json y no una base de datos, lo que se hace es buscar la película mediante el ID,
 * eliminarla y añadirla con los datos que se han pasado por parámetro
 */
router.put("/:nombre", auth_token, async (req, res, next) => {
  const film = PELICULAS.find((film) => film.nombre === req.params.nombre);

  if (!film) {
  res.status(404).send("No se ha encontrado la pelicula");
  } else {

     PELICULAS.splice(PELICULAS.findIndex((film) => film.nombre === req.params.nombre),1);
    PELICULAS.push(req.body);
    
    res.status(200).send(PELICULAS);
  }
});

/**
 * Método para obtener una película pasada por magic param(El nombre de la pelicula)
 */
router.get("/:nombre", (req, res, next) => {
  const film = PELICULAS.find((film) => film.nombre === req.params.nombre);

  if (!film) return res.status(404).send("No se ha encontrado la pelicula");

  return res.status(200).send(film);
});
export default router;
