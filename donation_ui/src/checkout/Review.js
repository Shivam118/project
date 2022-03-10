import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function AddressForm() {
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
            name="hospname"
            label="*Hospital ID"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="wallet id"
            name="walletname"
            label="*Ethereum Wallet ID"
            fullWidth
            variant="standard"
          />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="walletid2"
              name="walletconfirmname"
              label="*Confirm Ethereum Wallet ID"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="amount"
              name="amountrequested"
              label="*Requested amount"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="Date"
              name="date"
              label="Due Date"
              fullWidth
              variant="standard"
            />
          </Grid>
        </Grid>
      
    </React.Fragment>
  );
}
