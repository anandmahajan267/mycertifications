const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// create the schema
const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String
});



//create a model
const userModel = mongoose.model('User', userSchema);

//export the model
module.exports = userModel;

