
import { USERS_BBDD } from "../../Datos/bbdd.js";
import authByEmailPwd from "../helpers/auth-by-email-pwd.js";
import jwt from "jwt-simple";
import { Router } from "express";
const routerlogin = Router();



//Token para que se loguee un usuario autorizado 
routerlogin.post("/login", (req, res, next) => {

  const { email, password } = req.body; //Se obtienen el email y la contraseña del body de la cabecera

    const  {guid}  = authByEmailPwd(email, password); //Se comprueba si el usuario está en la base de datos => si el usuario existe, se almacena en guid

    //No hace falta comprobar si guid es null porque authByEmailPwd nos devuelve error en el caso de no cumplirse la validación
    const token = jwt.encode({guid}, req.app.locals.config.JWT_PRIVATE_KEY); //Se rea el token para que se pueda acceder a las rutas que lo requieran
    return res.send({ token }); //Node devuelve el token creado previenmente 
  
});


export default routerlogin;