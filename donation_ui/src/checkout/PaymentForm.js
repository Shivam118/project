import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const Input = styled("input")({
  display: "none",
});
export default function PaymentForm() {
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
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="ilaaj"
            label="Treatment Required"
            fullWidth
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
