import express from "express";
import jwt from "jwt-simple";

const router = express.Router();

//Token para autorizar el registro de peliculas
router.post("/", (requ, rese, next) => {
  const payload = {
    email: requ.params.email,
  };
  const token = jwt.encode(payload, requ.app.locals.config.TOKEN);
  rese.status(201).send({ token });
});

export default router;
