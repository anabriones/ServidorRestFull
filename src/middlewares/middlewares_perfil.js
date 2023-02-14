import jwt from 'jwt-simple'
/**
++++ TOKEN PARA LOS USUARIOS +++
 * @param {*} req  cabecera
 * @param {*} res respuesta de peticion
 * @param {*} next 
 * @returns retorna un token que es creado al insertar en el body un email
 */
export const auth_token = (reqU, resU, next) => {
  if (!reqU.headers.authorization) {
    return resU
      .status(401)
      .send({ message: 'No authenticate' })
  }

  const token = reqU.headers.authorization.split(' ')[1]
  const payload = jwt.decode(token, reqU.app.locals.config.JWT_PRIVATE_KEY)   //Creado en .env  (Variables de entorno)

  reqU.user = payload.email

  next()
}