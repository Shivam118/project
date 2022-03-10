const mongoose = require('mongoose');

// const bcrypt = require('bcryptjs');

const patientDetailSchema = new mongoose.Schema({
    fullName :{
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    UID: {
        type: Number,
        required: true
    },
    PAN: {
        type: String,
        required: true
    },
    BPL: {
        type: Boolean,
        default: false
    },
    Disease: {
        type: String,
        required: true
    },
    Treatment: {
        type: String,
        required: true
    },
    HospitalID: {
        type: Number,
        required: true
    },
    EthID: {
        type: String,
        required: true
    },
    cEthID:{
        type: String,
        required: true
    },
    requestedAmount:{
        type:Number,
        required: true
    },
    date:{
        type:Date,
        required: true
    },
    AmountDonated: {
        type:Number,
        required:false
    }
});

// patientDetailSchema.pre('save', async function(next){
//     if (this.isModified('password')){
//         this.password = await bcrypt.hash(this.password, 12);
//     }
//     next();
// });


const PatientDetail = mongoose.model('PATIENTDETAIL', patientDetailSchema);

module.exports = PatientDetail;