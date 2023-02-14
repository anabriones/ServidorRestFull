import jwt from 'jwt-simple'

/**
 * +++ TOKEN PARA LAS PELICULAS +++
 * @param {*} req  cabecera
 * @param {*} res respuesta de peticion
 * @param {*} next 
 * @returns retorna un token que es creado al insertar en el body un email
 */
export const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .send({ message: 'No authenticate' })
  }

  const token = req.headers.authorization.split(' ')[1]
  const payload = jwt.decode(token, req.app.locals.config.TOKEN) //Creado en .env  (Variables de entorno)

  req.user = payload.email

  next()
}