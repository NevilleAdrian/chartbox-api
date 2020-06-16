const  mongoose  = require("mongoose");
mongoose.Promise  = require("bluebird");
const  url  =  "mongodb://localhost:27017/chat";
const uri = "mongodb+srv://neville:osaseretope@cluster0.loeg5.mongodb.net/chat?retryWrites=true&w=majority"
const  connect  =  mongoose.connect(url,  { useNewUrlParser: true ,useUnifiedTopology: true, useCreateIndex: true});
module.exports  =  connect;