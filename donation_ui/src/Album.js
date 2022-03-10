import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
// import FloatingActionButtons from '@mui/material/Button';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const cards = [1,2,3];

const theme = createTheme();

export default function Album() {
  
  const history = useHistory();

  const callDonationBlogs = async () => {
    try{
      const res = await fetch('/DonationBlogs',{
        method:"GET",
        headers:{
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials:"include"
      });

      const data = await res.json();
      if(!res.status===200){
        const error = new Error(res.error);
        throw error;
      }

    }catch(err){
      console.log(err);
      // history.push('/LoginDonor');
    }
    
  }

  useEffect(()=>{
    callDonationBlogs();
  }, []);

  let receiver_account = '0x99E1E2fE9abE84a6a41F5D5b04F84d566bCD4Cc6';
  let receiver_account2 = '0xdd35cc1e1C51726CF37bD205Fc8b9f0088411bbC';

  async function sendEth(){
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  window.ethereum
      .request({
      method: 'eth_sendTransaction',
      params: [
          {
              from: accounts[0],
              to: receiver_account,
              // to: '0x2f318C334780961FB129D2a6c30D0763d9a5C970',
              value: '0x52663CCAB1E1C0000',
              gasPrice: '0x1C6BF52634000',
              gas: '0x2710',
          },
          {
              from: accounts[0],
              to: receiver_account2,
              // to: '0x2f318C334780961FB129D2a6c30D0763d9a5C970',
              value: '0xD02AB486CEDC0000',
              gasPrice: '0x1C6BF52634000',
              gas: '0x2710',
              },
      ],
      })
      .then((txHash) => console.log(txHash))
      .catch((error) => console.error);
  }


  async function getAccount() {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      // showAccount.innerHTML = account;
      document.querySelector('.showAccount').value = account;
      document.querySelector('.showAccount').innerHTML = account;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <AccountBalanceWalletIcon sx={{ mr: 3 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Donation Portal
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Donation Portal
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Just choose any post you like, and <br/>
              Keep Donating.<br/>
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >            
              <Button variant="contained" onClick={getAccount}>Show Connected Account</Button>
              <Alert variant="filled" className="showAccount" severity="success"></Alert>
              </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '0',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>            
                    <Button size="large" className="enableEthereumButton btn">Enable Ethereum</Button>
                    <Button size="large" className="sendEthButton btn" onClick={sendEth}>Send Eth</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}