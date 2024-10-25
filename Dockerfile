# Usa la imagen oficial de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Expone el puerto en el que corre la aplicación
EXPOSE 8080

# Establece la variable de entorno para producción
ENV NODE_ENV=production

# Comando que ejecuta el servidor
CMD ["npm", "start"]
