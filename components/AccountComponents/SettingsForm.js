import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useSnackbar} from "../../context/SnackbarContextProvider";

const SettingsForm = ({walletAddress}) => {

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("")
    const {show} = useSnackbar()

    useEffect(() => getUserData, [])

    const getUserData = async () => {
        axios.post("/api/findUser", {walletAddress: walletAddress})
            .then(res => {
                if (res.data) {
                    const user = res.data
                    // Set the local states to the retrieved user
                    setName(user.username)
                    setBio(user.bio)
                    setEmail(user.email)
                    setAddress(user.walletAddress)

                } else console.log("Cannot find user.");
            })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.post("/api/updateUser", {
            walletAddress: address,
            email: email,
            username: name,
            bio: bio,
        })
            .then(res => {
                console.log("User updated successfully", res.data);
                show("Profile updated successfully");
            })
            .catch(err => console.error(err));
    }

    return (
        <>
            <Box px={{xs: 2, md: 10}}>
                <Typography mb={6} variant="h1" color="text.primary">
                    Profile Details
                </Typography>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Grid
                        container
                        rowSpacing={5}
                        columnSpacing={{xs: 1, sm: 2, md: 14}}
                    >
                        <Grid item xs={10} md={6}>
                            <Typography variant="formlabel">Username</Typography>
                            <TextField
                                value={name || ''}
                                fullWidth
                                id="Username"
                                color="secondary"
                                placeholder="Username"
                                onChange={e => {
                                    setName(e.target.value)
                                }}
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
                                onInput={e => setBio(e.target.value)}
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
                                onInput={e => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={10} md={6}>
                            <Typography variant="formlabel">Wallet Address</Typography>
                            <TextField
                                disabled
                                inputProps={{style: {color: "white"}}}
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
