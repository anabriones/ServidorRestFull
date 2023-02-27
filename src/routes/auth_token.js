import authByEmailPwd from "../helpers/auth-by-email-pwd.js";
import jwt from "jwt-simple";
import { Router } from "express";


const routerlogin = Router();

//Token para que se loguee un usuario autorizado
routerlogin.post("/login", (req, res, next) => {
  const { email, password } = req.body; //Se obtienen el email y la contraseña del body de la cabecera

  const { user } = authByEmailPwd(email, password); //Se comprueba si el usuario está en la base de datos => si el usuario existe, se almacena en user
  
  if (`${user}` != null) {
    //En el .env todas las variables se obtienen como string, por lo que hay que convertirlo
     let tiempo = parseInt(process.env.JWT_EXPIRES_IN,10);
 
       const token= jwt.encode({ user, exp: Date.now()/1000 +tiempo},req.app.locals.config.JWT_PRIVATE_KEY );

         return res.send({ token }); //Node devuelve el token creado previenmente
  } else {
    //en el caso de no existir el usuario en la base de datos se lanza un error
    return new Error();
  }
});





export default routerlogin;
