const {Schema, model, MongooseError} = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = new Schema({
    email : {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: [/@\w+\.\w+$/, 'Indvalid email address'],
        minLength: [10, 'Email should be at least 10 characters'] 
    },
    password : {
        type: String,
        match: [/^[a-zA-Z0-9]+$/, 'Password should be alphanumeric'],
        minLength:[6,'Password should be at least 6 characters long'], 
        required: true
    },
});

userSchema.pre('save', async function(){
   const hash = await bcrypt.hash(this.password, 12)
   this.password= hash;
});

userSchema.virtual('rePassword')
.set(function(value){
    if(value !== this.password){
        this.MongooseError.errors.error = 'Password missmatch'
        throw new MongooseError('invalid password!')
    }
})

const User = model('User', userSchema)

module.exports = User