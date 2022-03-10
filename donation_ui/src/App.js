import React from 'react';
import HomePage from './HomePage';
// import Web3 from "web3";
import {Route} from 'react-router-dom';
import PatientSignUp  from './Patient/SignUp';
import PatientSignIn  from './Patient/SignIn';
import DonorSignUp  from './Donor/SignUp';
import DonorSignIn  from './Donor/SignIn';
import Album  from './Album';
import Checkout from './checkout/Checkout';
import hospitalVerify from './Hospital/hospitalVerifying';

const App = () => {
    
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
    }

    return(
        <div>
                <Route exact path="/">
                    <HomePage />
                </Route>

                <Route path="/LoginPatient">
                    <PatientSignIn />
                </Route>
                
                <Route path="/RegisterPatient">
                    <PatientSignUp />
                </Route>
                
                <Route path="/LoginDonor">
                    <DonorSignIn />
                </Route>

                <Route path="/RegisterDonor">
                    <DonorSignUp />
                </Route>
                
                <Route path="/DonationBlogs">
                    <Album />
                </Route>
                
                <Route path="/PatientDetails">
                    <Checkout />
                </Route>

                <Route path="/HospitalVerify">
                    <hospitalVerify />
                </Route>
        </div>
    );
}
export default App;