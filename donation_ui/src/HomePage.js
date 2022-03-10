import React from 'react';
import './HomePage.css';
import Button from '@mui/material/Button';
export default function SignUp(){

    return(
        <div>
        <div className="HomePageBG">
            <div className="HomePageText"> Help the Needy </div>
            <br />
            <br />
            <div className="card">
                <div className="patientPortals">
                    <h2>Are you a Patient?</h2>
                    <a href="/RegisterPatient">
                        <Button className="btn">Sign Up</Button>
                    </a>
                    <a href="/LoginPatient">
                        <Button className="btn">Sign In</Button>
                    </a>
                </div>
                <div className="donorPortals">
                    <h2>Are you a Donor?</h2>
                    <a href="/RegisterDonor">
                        <Button className="btn">Sign Up</Button>
                    </a>
                    <a href="/LoginDonor">
                        <Button className="btn">Sign In</Button>
                    </a>
                </div>
            </div>
        </div>
        </div>
    );
}