import mongoose from 'mongoose'; // Importa el módulo mongoose para manejar la conexión a MongoDB

// Cadena de conexión a MongoDB Atlas, contiene las credenciales y la información necesaria para conectarse a la base de datos
const connectionString = "mongodb+srv://Admin:lida12345@gonzalez.o2p7zms.mongodb.net/"

// Función para inicializar la conexión a MongoDB
export const initMongoDB = async() => {
    try {
      // Intenta conectar a la base de datos utilizando la cadena de conexión
      await mongoose.connect(connectionString);
      console.log('Conectado a la base de datos de MongoDB'); // Muestra un mensaje en la consola si la conexión es exitosa
    } catch (error) {
      console.log(`ERROR => ${error}`); // Muestra un mensaje de error en la consola si hay un problema en la conexión
    }
}
