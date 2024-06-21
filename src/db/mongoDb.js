import mongoose from 'mongoose';

const connectionString = "mongodb+srv://Admin:lida12345@gonzalez.o2p7zms.mongodb.net/"

// Función para inicializar la conexión a MongoDB
export const initMongoDB = async() => {
    try {
      await mongoose.connect(connectionString);
      console.log('Conectado a la base de datos de MongoDB'); 
    } catch (error) {
      console.log(`ERROR => ${error}`); 
    }
}
