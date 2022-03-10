const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signPatientSchema = new mongoose.Schema({
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
    }
});

signPatientSchema.pre('save', async function(next){
    if (this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

const SignPatient = mongoose.model('SIGNPATIENT', signPatientSchema);

module.exports = SignPatient;

// {
//     "firstName": "shivam",
//     "lastName" : "sharma",
//     "address": "khoda",
//     "city": "khoda" ,
//     "state": "U.P.",
//     "zipCode": 201301 ,
//     "country": "India" ,
//     "email": "sharma@xyz.com",
//     "phone": 923283293,
//     "uid": "123123",
//     "pan": "121232",
//     "EthID": "123212321312", 
//     "cEthID": "1312312312312",
//     "amountRequested": 100, 
//     "amountDonated": 10,
//     "Date": "16-10-2021"
// }