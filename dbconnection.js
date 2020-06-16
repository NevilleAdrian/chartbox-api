const  mongoose  = require("mongoose");
mongoose.Promise  = require("bluebird");
const config = require('config')

 // const uri = "mongodb+srv://neville:osaseretope@cluster0.loeg5.mongodb.net/test?retryWrites=true&w=majority"

    const db = config.get('db')
     const connect = mongoose.connect( db ,  { useNewUrlParser: true ,useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log(`Connected to ${db}`))
    .catch(err => console.error('Could not connect to MongoDB...'));


module.exports  =  connect;
