import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUrl = process.env.TEST_MONGO_URL || process.env.MONGO_URL;
const jwtSecret = process.env.TEST_JWT_SECRET || process.env.JWT_SECRET;

export const connectTestDB = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexión a MongoDB establecida");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    throw error;
  }
};

export const closeTestDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("Conexión a MongoDB cerrada");
  } catch (error) {
    console.error("Error al cerrar la conexión a MongoDB:", error);
    throw error;
  }
};

export { jwtSecret };