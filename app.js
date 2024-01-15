const express = require('express');
const errorMiddleware= require('./middlewares/errors')
const cookiePaser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cookiePaser());

// here we import all router which are in routes directory
const products = require('./routes/product');  
 //we use products in the plave of router.
const auth = require('./routes/auth'); 

app.use('/api/v1' , products);
app.use('/api/v1' , auth);

// here we use Middlware Handler to error  

app.use(errorMiddleware);

module.exports = app;