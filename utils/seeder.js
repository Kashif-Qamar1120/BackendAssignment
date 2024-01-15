const Product = require('../models/products');
const dotenv = require('dotenv');
const connectdatabase = require('../config/database');

const products = require('../data/product');

dotenv.config({path:'backend/config/config1.env'});

connectdatabase();

const seedProducts = async () => {
    try{
     
        await Product.deleteMany();
        console.log('Products are Deleted');
        await Product.insertMany(products)
        console.log ('All Products have been added')
        process.exit()

    } catch(error){
        console.log(error.message);
        process.exit();
    }
} 

seedProducts();