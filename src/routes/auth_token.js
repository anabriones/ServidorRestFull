import authByEmailPwd from "../helpers/auth-by-email-pwd.js";
import jwt from "jwt-simple";
import { Router } from "express";


const routerlogin = Router();

//Token para que se loguee un usuario autorizado
routerlogin.post("/login", (req, res, next) => {
  const { email, password } = req.body; //Se obtienen el email y la contraseña del body de la cabecera

  const { user } = authByEmailPwd(email, password); //Se comprueba si el usuario está en la base de datos => si el usuario existe, se almacena en user
  
  if (`${user}` != null) {
    //No hace falta comprobar si guid es null porque authByEmailPwd nos devuelve error en el caso de no cumplirse la validación
    //const token = jwt.encode( {user} , req.app.locals.config.JWT_PRIVATE_KEY, "HS256", {iat: moment().unix(), exp: moment().add(5, 'hours').unix()}); //Se rea el token para que se pueda acceder a las rutas que lo requieran
 
    const token= jwt.encode({ user, exp: Date.now()/1000 
    + process.env.JWT_EXPIRES_IN},req.app.locals.config.JWT_PRIVATE_KEY );
console.log(token);
    return res.send({ token }); //Node devuelve el token creado previenmente
  } else {
    //en el caso de no existir el usuario en la base de datos se lanza un error
    return new Error();
  }
});





export default routerlogin;
