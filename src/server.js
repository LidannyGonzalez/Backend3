import express from "express";
import { __dirname } from "./path.js";
import hbs from "./handlebarsHbs.js";


import viewsRouter from './routes/views.routes.js';
import cartRouter from './routes/cart.router.js';
import productsRouter from './routes/products.router.js';
import { errorHandler } from "./middlewares/errorHandler.js";
import { initMongoDB }  from './db/mongoDb.js';




const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));


app.use('/api/carts', cartRouter);
app.use('/api/products', productsRouter);

app.engine('handlebars', hbs.engine);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);

app.use(errorHandler);

initMongoDB();

const PORT = 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

