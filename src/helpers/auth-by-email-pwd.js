import { USERS_BBDD } from "../../Datos/bbdd";

/**
 * 
 * @param {*} email 
 * @param {*} password 
 * @returns el usuari si se ha intoducido el correo y la contraseña correctamnete, en caso contrario se lanza un Error
 */
const authByEmailPwd = (email, password) => {
  const user = USERS_BBDD.find((user) => user.email === email);
  
  if (!user) throw new Error();

  if (user.password !== password) throw new Error();

  return user;
};

export default authByEmailPwd;