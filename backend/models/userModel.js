const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
});


const projectSchema = new mongoose.Schema({
  projectName: {
      type: String,
      required: true,
      unique: true,
  },
  
  gitRepoLink: {
      type: String,
      required: true,
      validate: {
          validator: function (v) {
              return /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(v);
          },
          message: 'Invalid GitHub repository link',
      },
      unique: true,
  },
  email: { 
    type: String,
     required: true,
    },
});


userSchema.pre('save',async function(next){
    if(!this.isModified('password'))
    {
        next();
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);

})

userSchema.methods.matchPassword = async function(enteredPassword)
{
  return await bcrypt.compare(enteredPassword,this.password);
};

const User = mongoose.model('User', userSchema);
const Project = mongoose.model('Project', projectSchema);

module.exports = {User,Project};