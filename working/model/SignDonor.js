const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signDonorSchema = new mongoose.Schema({
    firstName :{
        type: String,
        required: true
    },
    lastName :{
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true
    },
    password :{
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            } 
        }
    ]
});

signDonorSchema.pre('save', async function(next){
    if (this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

signDonorSchema.methods.generateAuthToken = async function () {
    try{
        let donorSchemaToken = jwt.sign({ _id:this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: donorSchemaToken });
        await this.save();
        return donorSchemaToken;
    } catch(err){
        console.log(err);
    }
}


const SignDonor = mongoose.model('SIGNDONOR', signDonorSchema);

module.exports = SignDonor;