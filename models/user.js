const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {type: String, trim: true, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true}
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }

  next();
});

userSchema
//virtual prop not stored in db but acccessible in pre hook-check passwordConfirmation
.virtual('passwordConfirmation')
.set(function setPasswordConfirmation(passwordConfirmation){
  this._passwordConfirmation = passwordConfirmation;
});

//checjing if password modified and confirmation match if not invalidate, send message

userSchema.pre('validate', function checkPassword(next){
  if(this.isModified('password') && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'password does not match');
  next();
});

//use bcrypt to hash current password and compare to one stored in db
//instance method, applied only to the one that is used
userSchema.methods.validatePassword = function validatePassword(password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
