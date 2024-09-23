import UserDao from "../Daos/user.dao.js";
import { userModel } from '../Daos/models/user.model.js';
import bcrypt from 'bcrypt'; // Encriptar la contraseña
const userDao = new UserDao();


export const getUsers = async () => {    
   try {
    return await userDao.getUsers();
   } catch (error) {
    console.log (error);
   }
};

export const createUser = async (user) => {
  try {
    return await userDao.createUser(user);
  } catch (error) {
    console.log(error);
  }
};

export const getUserByEmail = async (email) => {
  try {
    return await userDao.getUserByEmail(email);
  } catch (error) {
    console.log(error);
  }
}



// Crear usuarios de forma ficticia
export const createUsersMock = async (cant = 50) => {
  try {
      const usersArray = [];
      const passwordHash = await bcrypt.hash('coder123', 10); // Encriptar la contraseña

      for (let i = 0; i < cant; i++) {
          usersArray.push({
              first_name: `User${i + 1}`, 
              last_name: `LastName${i + 1}`,
              email: `user${i + 1}_${Date.now()}@example.com`, // Correo único con timestamp
              age: Math.floor(Math.random() * 60) + 18, 
              password: passwordHash, 
              role: i % 2 === 0 ? 'admin' : 'user', 
              cart: null 
          });
      }

      // Insertar usuarios en la base de datos
      const users = await userModel.insertMany(usersArray);
      return users; 
  } catch (error) {
      console.log(error);
      throw new Error('Error generando usuarios');
  }
};

