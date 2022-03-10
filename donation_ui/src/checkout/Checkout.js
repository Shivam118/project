import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// import AddressForm from './AddressForm';
// import PaymentForm from './PaymentForm';
// import Review from './Review';

const steps = ['Personal Details','Patient Details','Identification Details'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return AddressForm();
    case 1:
      return PaymentForm();
    case 2:
      return Review();
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

const Input = styled("input")({
  display: "none",
});

function Review() {

  const history = useHistory();

  const [patientDetail,setPatientDetail] = useState({
    HospitalID:"", 
    EthID:"", 
    cEthID:"", 
    requestedAmount:0, 
    date: Date.now()
  });

  let name,value;
  const handlePatientDetail = (e) => {
    name = e.target.name;
    value = e.target.value;
    setPatientDetail({ ...patientDetail, [name]:value });
  }

  const PostData = async (e) =>{
    e.preventDefault();
    
    const { HospitalID, EthID, cEthID, requestedAmount, date } = patientDetail;

    
    const res = await fetch("/PatientDetail",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        HospitalID, EthID, cEthID, requestedAmount, date
      })
    });
    
    const data = res.json();

    if(res.status===422 || !data){
      window.alert("Patient's PAN Already Exists");
      console.log("Patient's PAN Already Exists");
    }
    else{
      window.alert("Details Saved Sucessful");
      console.log("Details Saved Successful");
      history.push("/");
    }
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Identification Details
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="hospid"
            name={patientDetail.HospitalID}
            onChange={handlePatientDetail}
            label="*Hospital ID"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="wallet id"
            name={patientDetail.EthID}
            onChange={handlePatientDetail}
            label="*Ethereum Wallet ID"
            fullWidth
            variant="standard"
          />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="walletid2"
              name={patientDetail.cEthID}
              onChange={handlePatientDetail}
              label="*Confirm Ethereum Wallet ID"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="amount"
              name={patientDetail.requestedAmount}
              onChange={handlePatientDetail}
              label="*Requested amount"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="Date"
              name={patientDetail.date}
              onChange={handlePatientDetail}
              label="Due Date"
              fullWidth
              variant="standard"
            />
          </Grid>
        </Grid>
      
    </React.Fragment>
  );
}


function AddressForm() {

  const history = useHistory();

  const [patientDetail,setPatientDetail] = useState({
    fullName:"", 
    email:"", 
    number:0, 
    UID:0, 
    PAN:"", 
    BPL:false,
  });

  let name,value;
  const handlePatientDetail = (e) => {
    name = e.target.name;
    value = e.target.value;
    setPatientDetail({ ...patientDetail, [name]:value });
  }

  const PostAddress = async (e) =>{
    e.preventDefault();
    
    const { fullName, email, number, UID, PAN, BPL } = patientDetail;

    
    const res = await fetch("/PatientDetail",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullName, email, number, UID, PAN, BPL
      })
    });
    
    const data = res.json();

    if(res.status===422 || !data){
      window.alert("Patient's PAN Already Exists");
      console.log("Patient's PAN Already Exists");
    }
    else{
      window.alert("Details Saved Sucessful");
      console.log("Details Saved Successful");
      history.push("/");
    }
  }


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="fullName"
            label="Full name"
            fullWidth
            name={patientDetail.fullName}
            onChange={handlePatientDetail}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            email="email"
            label="E-mail"
            fullWidth
            name={patientDetail.email}
            onChange={handlePatientDetail}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="number"
            number="number"
            label="Contact Number"
            fullWidth
            name={patientDetail.number}
            onChange={handlePatientDetail}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="adhaar"
            number="number"
            label="UID Aadhaar Number"
            fullWidth
            name={patientDetail.UID}
            onChange={handlePatientDetail}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="pan"
            label="PAN Number"
            fullWidth
            name={patientDetail.PAN}
            onChange={handlePatientDetail}
            variant="standard"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name={patientDetail.BPL} onChange={handlePatientDetail} value="no" />
            }
            label="Are you below poverty line"
          />
        </Grid>
        <Grid>
          &nbsp; &nbsp; * Upload Documents for verification &nbsp;&nbsp;&nbsp;
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
            />
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>
          <label htmlFor="icon-button-file">
            <Input accept="image/*" id="icon-button-file" type="file" />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

function PaymentForm() {

  const history = useHistory();

  const [patientDetail,setPatientDetail] = useState({
    Disease:"", 
    Treatment:""
  });

  let name,value;
  const handlePatientDetail = (e) => {
    name = e.target.name;
    value = e.target.value;
    setPatientDetail({ ...patientDetail, [name]:value });
  }

  const PostData = async (e) =>{
    e.preventDefault();
    
    const { Disease, Treatment } = patientDetail;

    const res = await fetch("/PatientDetail",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Disease, Treatment
      })
    });
    
    const data = res.json();

    if(res.status===422 || !data){
      window.alert("Patient's PAN Already Exists");
      console.log("Patient's PAN Already Exists");
    }
    else{
      window.alert("Details Saved Sucessful");
      console.log("Details Saved Successful");
      history.push("/");
    }
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Patient's Details:
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="bimari"
            label="Disease"
            fullWidth
            name={patientDetail.Disease}
            onChange={handlePatientDetail}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="ilaaj"
            label="Treatment Required"
            fullWidth
            name={patientDetail.Treatment}
            onChange={handlePatientDetail}
            variant="standard"
          />
        </Grid>
        <br />
        <Typography display="block"></Typography>
        <br />
        <Grid>
          &nbsp; &nbsp; * Upload Your Passport-sized Photograph &nbsp;&nbsp;&nbsp;
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
            />
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>
          <label htmlFor="icon-button-file">
            <Input accept="image/*" id="icon-button-file" type="file" />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}



export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
 
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Patients for verification
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Submit Form' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}