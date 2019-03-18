const mongoose = require('mongoose');
const uniqueValidatore = require('mongoose-unique-validator');
const authSchema = mongoose.Schema({
  firstname: { type: String, require: true },
  secondname: { type: String, require: true },
  username:{type:String,require:true,unique:true},
  email: { type: String, require: true, unique:true },
  password: { type: String, require: true }
});
authSchema.plugin(uniqueValidatore);

module.exports = mongoose.model('Auth', authSchema);
