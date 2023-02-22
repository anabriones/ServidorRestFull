
import auth_token from './src/routes/auth_token'
import films from './src/routes/films'
import profile from './src/routes/perfil'


export default app=>{
    app.use('/auth-token', auth_token)//crea el token para el login de los usuarios
    app.use('/films', films)//desde esta ruta se pueden hacer GET/POST/DELETE y PUT de películas
    app.use('/profile',profile)// Desde esta ruta se puede hacer GET de todos los usuarios o de uno en particular

}

