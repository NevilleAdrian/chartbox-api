const  mongoose  = require("mongoose");
mongoose.Promise  = require("bluebird");
const  url  =  "mongodb://localhost:27017/chat";
const uri = "mongodb+srv://neville:osaseretope@cluster0.loeg5.mongodb.net/test?retryWrites=true&w=majority"
const  connect  =  mongoose.connect(uri,  { useNewUrlParser: true ,useUnifiedTopology: true, useCreateIndex: true});
module.exports  =  connect;