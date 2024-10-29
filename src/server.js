import express from "express";
import morgan from "morgan";
import passport from "passport";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { __dirname } from "./utils/path.js";
import hbs from "./utils/handlebarsHbs.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { initializePassport } from "./config/passport.config.js";

import viewsRouter from './routes/views.routes.js';
import cartRouter from './routes/carts.routes.js';
import productsRouter from './routes/products.routes.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import mocksRouter from './routes/mocks.router.js';

import { initMongoDB } from './db/mongoDb.js';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { info } from './docs/info.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(morgan('dev'));
app.use(cookieParser());

initializePassport();
app.use(passport.initialize());

app.use('/api/carts', cartRouter);
app.use('/api/products', productsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use('/api/mocks', mocksRouter);
app.use('/', viewsRouter);

const swaggerSpec = swaggerJsdoc(info);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.engine('handlebars', hbs.engine);
app.set('views', `${__dirname}/../views`);
app.set('view engine', 'handlebars');

app.use(errorHandler);

initMongoDB();

if (process.env.NODE_ENV !== "test") {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor en ejecución en el puerto ${PORT}`);
        console.log(`JWT Secret: ${process.env.JWT_SECRET ? "Cargado" : "No cargado"}`);
        console.log(`MongoDB URL: ${process.env.MONGO_URL ? "Cargado" : "No cargado"}`);
    });
}

export { app };