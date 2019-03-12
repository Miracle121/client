const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  titel:{type: String,require :true},
  contet: {type:String,require:true}
});

module.exports = mongoose.model('User',userSchema);
