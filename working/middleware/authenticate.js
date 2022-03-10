// const jwt = require("jsonwebtoken");
// const donor = require("../model/SignDonor");

// const authenticateDonor = async (req,res,next) => {
//     try{
//         const token = req.cookies.jwtoken;
//         const verifyToken = jwt.verify(token,process.env.SECRET_KEY);
//         const rootDonor = await donor.findOne({_id:verifyToken._id, "tokens.token":token });

//         if(!rootDonor){
//             throw new Error('Donor Not Found');
//         }

//         req.token = token;
//         req.rootDonor = rootDonor;
//         req.DonorID = rootDonor._id;
//         next();

//     }
//     catch(err){
//         res.status(401).send("Unauthorized: No token Provided");
//     }
// }
// module.exports = authenticateDonor;