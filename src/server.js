import express from "express";
import morgan from "morgan";
import passport from "passport";
import cookieParser from "cookie-parser";

import { __dirname } from "./utils/path.js";
import hbs from "./utils/handlebarsHbs.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { initializePassport } from "./config/passport.config.js";

import viewsRouter from './routes/views.routes.js';
import cartRouter from './routes/carts.routes.js';
import productsRouter from './routes/products.routes.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';

import { initMongoDB } from './db/mongoDb.js';
import mocksRouter from './routes/mocks.router.js';

// Swagger imports
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { info } from './docs/info.js'; // Importar la configuración de Swagger

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(morgan('dev'));
app.use(cookieParser());

initializePassport();
app.use(passport.initialize());

// Configuración de rutas
app.use('/api/carts', cartRouter);
app.use('/api/products', productsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use('/api/mocks', mocksRouter); 

// Configuración de Swagger
const swaggerSpec = swaggerJsdoc(info);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Configuración de handlebars
app.engine('handlebars', hbs.engine);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

// Rutas de vistas
app.use('/', viewsRouter);

// Middleware de manejo de errores
app.use(errorHandler);

// Conexión a MongoDB
initMongoDB();

const PORT = 8080;
app.listen(PORT, () => console.log(`Servidor en ejecución en el puerto ${PORT}`));
