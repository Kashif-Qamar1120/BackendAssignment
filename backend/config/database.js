const mongoose = require('mongoose');

const connectdatabase = ()=>{
    mongoose.connect(process.env.DB_LOCAL_URI )
      
    .then(con =>{
        console.log(` Congratulations MongoDB DataBase Connnected Successfuly with :${con.connection.host}`)
    }).catch(err => {
        console.error(`Error while Connecting to the MongoDB: DataBase ${err.message}`);
    });
    
    
}
  
module.exports = connectdatabase;