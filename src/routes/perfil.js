import { USERS_BBDD } from "../datos/bbdd.js";
import { Router } from "express";
import { auth_token } from "../middlewares/middlewares_perfil";
const router = Router();

/**
 * Se obtienen todos los usuarios de la base de datos
 */
router.get("/", (req, res) => {
  res.status(200).json(USERS_BBDD);
});

/**
 * Solicitud autenticada con token para obtener el perfil del usuario
 * Se obtiene el usuario consultado por su email
 * previamente se debe haber creado el token y añadirlo a la cabecera
 */
router.get("/:email", auth_token, (req, res) => {
  const user = USERS_BBDD.find((user) => user.email === req.params.email);

  if (!user){
     return res.sendStatus(401);
  }


  return res.status(200).json(user);
});

/**
 * Se añade un nuevo usario a la base de datos
 */
router.post("/register", (req, res) => {
 // const { user } = existe(req.body.email); //Se comprueba si el usuario está en la base de datos => si el usuario existe, se almacena en user
  const user = USERS_BBDD.find((user) => user.email === req.body.email);
  if(!user){
    USERS_BBDD.push(req.body);

    res.status(200).json(USERS_BBDD);
  } else {
    res.status(401).json('Usuario ya existe');
  }
});

/**
 * Se elimina un usuario de la base de datos
 */
router.delete("/:email", auth_token, (req, res) => {
  const user = USERS_BBDD.find((user) => user.email === req.params.email);

  if (user != null) {
    USERS_BBDD.splice(user, 1);

    res.status(200).json(USERS_BBDD);
  } else {
    res.status(401).json(USERS_BBDD);
  }
});

export default router;
