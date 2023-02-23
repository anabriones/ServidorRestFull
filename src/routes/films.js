import express, { request } from "express";
import peliculas from "../datos/peliculas";
import { auth_token } from "../middlewares/middlewares_perfil";

const router = express.Router();

/**
 * Método que devuelve todas las peliculas en formato json
 */
router.get("/", (req, res, next) => {
  if(peliculas){
      res.status(200).json(peliculas);
  }
  else{
    res.status(401).json('Ha habido un problema para recuperar las películas');
  }

});

/**
 * Método que elimina la película que se pasa por parámetro (magic param),
 * Debe de estar autorizado
 */
router.delete("/:nombre", auth_token, (req, res, next) => {
 const pelicula= peliculas.findIndex((item) => item.nombre === req.params.nombre);
 if(pelicula){
 peliculas.splice(pelicula,1);
  res.status(200).json(peliculas);
 }
 else{
  res.status(401).json('No se ha encontrado la pelicula que quieres eliminar');
 }
});

/**
 * Método para añadir una película pasada en el body
 * Se necesita Autorización, por lo que para llamar a este método, se debe obtener el token previamente
 */
router.post("/", auth_token, (req, res, next) => {
  if (!peliculas.push(req.body)) {
    res.status(401).json(req.body);
  } else {
    res.status(200).json(req.body);
  }
});

/**
 * Método para modificar una película pasada por magic param(El nombre de la pelicula)
 * Como es un fichero json y no una base de datos, lo que se hace es buscar la película mediante el ID,
 * eliminarla y añadirla con los datos que se han pasado por parámetro
 */
router.put("/:nombre", auth_token, async (req, res, next) => {
  const pelicula = peliculas.findIndex(
    (item) => item.nombre === req.params.nombre
  );
  if (pelicula) {
    peliculas.splice(pelicula, 1);
    peliculas.push(req.body);

    await res.status(200).json(req.body);
  } else {
    await res.status(401).json("La pelicula no existe");
  }
});

/**
 * Método para obtener una película pasada por magic param(El nombre de la pelicula)
 */
router.get("/:nombre", async (req, res, next) => {
  const filmbyname = peliculas.filter(
    (item) => item.nombre.toLowerCase() === req.params.nombre.toLowerCase()
  );
if(filmbyname)
  await res.status(200).json(filmbyname);

  else
  await res.status(400).json('No ha sido podible encontrar la película con nombre '+ nombre);
});

export default router;
