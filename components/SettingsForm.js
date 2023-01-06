import { Box, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAccount } from "wagmi";

const SettingsForm = () => {
  const [name, changeName] = useState("");
  const [bio, changeBio] = useState("");
  const [email, changeEmail] = useState("");
  const { address, isConnected } = useAccount();
  return (
    <>
      <Box px={10}>
        <Typography mb={6} variant="h1" color="text.primary">
          Profile Details
        </Typography>
        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 9 }}>
          <Grid item xs={6}>
            <TextField
              value={name}
              fullWidth
              label="Username"
              id="Username"
              color="secondary"
              placeholder="UserName"
              onInput={(e) => changeName(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={bio}
              multiline
              maxRows={4}
              fullWidth
              label="Bio"
              id="Bio"
              color="secondary"
              placeholder="Bio"
              onInput={(e) => changeBio(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={email}
              fullWidth
              label="Email"
              id="Email"
              color="secondary"
              placeholder="Email"
              onInput={(e) => changeEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              value={address}
              disabled
              label="Wallet Address"
              id="WalletAddress"
              placeholder="Wallet Address"
            />
          </Grid>
          {
            //social connections remaining
          }
        </Grid>
      </Box>
    </>
  );
};

export default SettingsForm;
