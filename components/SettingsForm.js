import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const SettingsForm = ({user}) => {
  const [name, changeName] = useState("");
  const [bio, changeBio] = useState("");
  const [email, changeEmail] = useState("");
  const [address,changeAddress]=useState("")
  useEffect(( )=>{
   changeName(user.username)
   changeBio(user.bio)
   changeEmail(user.email)
   changeAddress(user.walletAddress)
  },[])
  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(name,bio,email);
  }
  return (
    <>
      <Box px={{xs:2,md:10}}>
        <Typography mb={6} variant="h1" color="text.primary">
          Profile Details
        </Typography>
        <form onSubmit={(e)=>handleSubmit(e)}>
          <Grid
            container
            rowSpacing={5}
            columnSpacing={{ xs: 1, sm: 2, md: 14 }}
          >
            <Grid item xs={10} md={6} >
            <Typography variant="formlabel">Username</Typography>
              <TextField
                value={name || ''}
                fullWidth
                id="Username"
                color="secondary"
                placeholder="Username"
                onChange={(e) => {changeName(e.target.value)}}
              />
            </Grid>
            <Grid item xs={10} md={6}>
            <Typography variant="formlabel">Bio</Typography>
              <TextField
                value={bio || ''}
                multiline
                maxRows={4}
                fullWidth
                id="Bio"
                color="secondary"
                placeholder="Bio"
                onInput={(e) => changeBio(e.target.value)}
              />
            </Grid>
            <Grid item xs={10} md={6}>
            <Typography variant="formlabel">Email</Typography>
              <TextField
                value={email || ''}
                fullWidth
                id="Email"
                color="secondary"
                placeholder="Email"
                type={"email"}
                onInput={(e) => changeEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={10} md={6}>
            <Typography variant="formlabel">Wallet Address</Typography>
              <TextField
                fullWidth
                value={address || ''}
                color="secondary"
                id="WalletAddress"
                placeholder="Wallet Address"
              />
            </Grid>
            {
              //social connections remaining
            }
            <Grid item xs={10} md={6}>
              <Button type="submit" variant="outlined" color="secondary">
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default SettingsForm;

export async function getStaticProps({user}) {
  console.log("user");
}
