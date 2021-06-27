const Mongoose = require("mongoose");

const uri = "mongodb://127.0.0.1:27017/moviewheeldb";

Mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = Mongoose.connection;
connection.once("open", function (error) {
  if (error) {
    console.log(error + " :this is a DB error here");
  } else {
    console.log("connection established for movie list DB");
  }
});

module.exports = Mongoose;
