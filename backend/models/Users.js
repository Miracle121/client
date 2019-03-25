const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  titel:{type: String,require :true},
  contet: {type:String,require:true},
  creater: { type: mongoose.Schema.Types.ObjectId, ref:"Auth", require:true}
});

module.exports = mongoose.model('User',userSchema);
