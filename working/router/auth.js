const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require('../db/conn');
const SignPatient = require('../model/SignPatient');
const SignDonor = require('../model/SignDonor');
const SignHospital = require('../model/SignHospital');
const PatientDetail = require('../model/PatientDetail');
// const authenticateDonor = require('../middleware/authenticate');

router.get('/', (req,res)=>{
    res.send("Hello World!");
});

//Patient SIGNIN AND REGISTER Portal
router.post('/RegisterPatient', async (req,res)=>{

    const { firstName, lastName, email, password } = req.body;

    if( !firstName || !lastName || !email || !password ){
        return res.status(422).json({error: "Plz fill the required Fields"});
    }

    try{
        const patientExist = await SignPatient.findOne({ email: email });

        if(patientExist){
            return res.status(422).json({error: "Patient's Email Already Exists"});
        }
        
        const sign_Patient = new SignPatient({firstName, lastName, email, password});

        const PatientRegister = await sign_Patient.save();

        if(PatientRegister){        
            res.status(201).json( {message: "Patient Details Saved Successfully"} );
        }
        else{ 
            res.status(500).json( {error: "Failed"} );
        }
    }
    catch(err){
        console.log(err);
    }

});

router.post('/LoginPatient', async (req,res) => {
    try{
        let patientToken;
        const { email, password } = req.body;
        
        if(!email || !password){
            return res.status(400).json({error: "Please fill the required Fields"});
        }

        const patientLogin = await SignPatient.findOne({ email: email});
        
        
        
        if(patientLogin){
            const isMatchPatient = await bcrypt.compare(password, patientLogin.password);
            

            
            if(!isMatchPatient){
                res.status(400).json({error: "Invalid Credentials"});
            } else{
                res.json({ message: "Sign In Sucessful" });
            }
        }
        else{
            res.status(400).json({error: "Invalid Credentials"});
        } 

    }
    catch (err){
        console.log(err);
    }
});



//Donor SIGNIN AND REGISTER Portal
router.post('/RegisterDonor', async (req,res)=>{

    const { firstName, lastName, email, password } = req.body;

    if( !firstName || !lastName || !email || !password ){
        return res.status(422).json({error: "Plz fill the required Fields"});
    }
    
    try{
        const donorExist = await SignDonor.findOne({ email: email });
        
        if(donorExist){
            return res.status(422).json({error: "Donor's Email Already Exists"});
        }
        
        const sign_Donor = new SignDonor({firstName, lastName, email, password});

        const DonorRegister = await sign_Donor.save();
        
        if(DonorRegister){        
            res.status(201).json( {message: "Donor Details Saved Successfully"} );
        }
        else{ 
            res.status(500).json( {error: "Failed"} );
        }
    }
    catch(err){
        console.log(err);
    }

});

router.post('/LoginDonor', async (req,res) => {
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({error: "Please fill the required Fields"});
        }

        const donorLogin = await SignDonor.findOne({ email: email});

        if(donorLogin){
            const isMatchDonor = await bcrypt.compare(password, donorLogin.password);
            
            DonorToken = await donorLogin.generateAuthToken();
            res.cookie("jwtoken",DonorToken,{
                expires: new Date(Date.now() + 258920000),
                httpOnly:true
            });
            
            if(!isMatchDonor){
                res.status(400).json({error: "Invalid Credentials"});
            } else{
                res.json({ message: "Sign In Sucessful" });
            }
        }
        else{
            res.status(400).json({error: "Invalid Credentials"});
        } 
        
    }
    catch (err){
        console.log(err);
    }
});



//Hospital SIGNIN AND REGISTER Portal
router.post('/RegisterHospital', async (req,res)=>{

    const { hospitalID, password } = req.body;
    
    if( !hospitalID || !password ){
        return res.status(422).json({error: "Plz fill the required Fields"});
    }

    try{
        const hospitalExist = await SignHospital.findOne({ hospitalID: hospitalID });

        if(hospitalExist){
            return res.status(422).json({error: "Hospital Already Exists"});
        }
        
        const sign_Hospital = new SignHospital({hospitalID, password});
        
        const HospitalRegister = await sign_Hospital.save();

        if(HospitalRegister){        
            res.status(201).json( {message: "Hospital Data saved"} );
        }
        else{ 
            res.status(500).json( {error: "Failed"} );
        }
    }
    catch(err){
        console.log(err);
    }

});

router.post('/LoginHospital', async (req,res) => {
    try{
        const { hospitalID, password } = req.body;

        if(!hospitalID || !password){
            return res.status(400).json({error: "Please fill the required Fields"});
        }
        
        const hospitalLogin = await SignHospital.findOne({ hospitalID: hospitalID});

        if(hospitalLogin){
            const isMatchHospital = await bcrypt.compare(password, hospitalLogin.password);
            if(!isMatchHospital){
                res.status(400).json({error: "Invalid Credentials"});
            } else{
                res.json({ message: "Sign In Sucessful" });
            }
        }
        else{
            res.status(400).json({error: "Invalid Credentials"});
        } 

    }
    catch (err){
        console.log(err);
    }
});


router.get('/DonationBlogs', (req,res) => {
    res.send(req.rootDonor);
});


router.post('/PatientDetail', async (req,res)=>{
    
    const { fullName, email, number, UID, PAN, BPL, Disease, Treatment, HospitalID, EthID, cEthID, requestedAmount, date, AmountDonated } = req.body;
    
    if( !fullName || !email || !number || !UID || !PAN || !Disease || !Treatment || !HospitalID || !EthID || !cEthID || !requestedAmount || !date){
        return res.status(422).json({error: "Plz fill the required Fields"});
    }
    
    try{
        const patientDetailsExist = await PatientDetail.findOne({ PAN: PAN });
        
        if(patientDetailsExist){
            return res.status(422).json({error: "Patient's PAN Already Exists"});
        }
        
        const Patient_Details = new PatientDetail({ fullName, email, number, UID, PAN, BPL, Disease, Treatment, HospitalID, EthID, cEthID, requestedAmount, date, AmountDonated
        });
        
        const PatientDetailSave = await Patient_Details.save();
        
        if(PatientDetailSave){        
            res.status(201).json( {message: "Patient Details Saved Successfully"} );
        }
        else{ 
            res.status(500).json( {error: "Failed"} );
        }
    }
    catch(err){
        console.log(err);
    }
    
});

module.exports = router;