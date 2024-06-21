import express from 'express';
import { __dirname } from './path.js'; // Asumiendo que `__dirname` está definido en el archivo `path.js`
import hbs from './handlebarsHbs.js'; // Asumiendo que `hbs` es el motor de plantillas Handlebars configurado en `handlebarsHbs.js`

import viewsRouter from './routes/views.routes.js';
import cartRouter from './routes/cart.router.js';
import productsRouter from './routes/products.router.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { initMongoDB } from './db/mongoDb.js'; // Importamos la función de inicialización de MongoDB desde el archivo correspondiente

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`)); // Middleware para servir archivos estáticos desde la carpeta `public`

app.use('/api/carts', cartRouter); // Ruta para el manejo de carritos
app.use('/api/products', productsRouter); // Ruta para el manejo de productos

app.engine('handlebars', hbs.engine); // Configuración del motor de plantillas Handlebars
app.set('views', `${__dirname}/views`); // Establecer la carpeta de vistas
app.set('view engine', 'handlebars'); // Establecer el motor de plantillas predeterminado

app.use('/', viewsRouter); // Rutas para las vistas HTML

app.use(errorHandler); // Middleware para manejo de errores

initMongoDB(); // Inicialización de la conexión a MongoDB

const PORT = 8080; // Puerto en el cual se va a ejecutar el servidor

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
