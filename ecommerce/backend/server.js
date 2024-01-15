
const app = require('./app');
const connectdatabase = require('./config/database')

const dotenv = require('dotenv');

process.on('uncaughtException' , err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shuting down the Server due to uncaught expection')
    process.exit(1);

})

// Setting up config file config.env for port
dotenv.config({path: 'config/config.env'})

// connect to database it will connect to DB and show a message
 connectdatabase();

app.get('/', (req, res) => {
    res.send("WELCOME to My E-Commerce WebSite...");
});
//when the server connected there willlbe apear a message
const server = app.listen(process.env.PORT , () => {
    console.log(`Server is running on http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

// handle uncatached error  promise regection
process.on('unhandledRejection' , err => {
    console.log(`EEROR: ${err.message}`)
    console.log('Shutting DOWN the Server due to unhandled ERROR Promise ');
    server.close(() => {
        process.exit(1);
    })
});

