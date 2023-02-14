import { USERS_BBDD } from "../../Datos/bbdd.js";

import { Router } from "express";
import { auth_token } from "../middlewares/middlewares_perfil";

const router = Router();

/**
 * Solicitud autenticada con token para obtener el perfil del usuario
 * Se obtiene el usuario consultado por su email
 * previamente se debe haber creado el token y añadirlo a la cabecera
 */
router.get("/:email", auth_token, (req, res) => {
  const user = USERS_BBDD.find((user) => user.email === req.params.email);

  if (!user) return res.sendStatus(401);
  delete user.password;

  return res.send(user);
});

/**
 * Se obtienen todos los usuarios de la base de datos
 */
router.get("/", auth_token, (req, res) => {
  res.status(200).json(USERS_BBDD);
});

/**
 * Se añade un nuevo usario a la base de datos
 */

router.post("/", auth_token, (req, res) => {
  USERS_BBDD.push(req.body);
  res.status(200).json(USERS_BBDD);
});

/**
 * Se añade elimina un usario de la base de datos
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
