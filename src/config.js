import bodyParser from 'body-parser'
import logger from 'morgan'
import cors from 'cors'

//Esta libreria nos permite cargar datos 
import { config } from 'dotenv'


const SETTINGS = config()
//console.log(SETTINGS)

export default app => {
  app.disable('x-powered-by')
  app.disable('etag')
  app.set('env', SETTINGS.parsed.ENV)

  app.set('config', SETTINGS.parsed)
  app.locals.env = app.get('env')
  app.locals.config = app.get('config')

  if (process.env.NODE_ENV !== 'test') {
    app.use(logger('combined'))
  }

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  //gestiona automaticamente las cabeceras de la API 
  app.use(cors())

  
}