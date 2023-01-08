import React, {useState} from 'react'
import {useAuth} from "../../context/AuthContext";
import {useSnackbar} from "../../context/SnackbarContextProvider";
import {Button, Grid, Stack, TextField, Typography,} from "@mui/material";
import FullLayout from "../../src/layouts/FullLayout";


const AddAdmin = () => {

    const {signUp} = useAuth()
    const {show} = useSnackbar()

    const [data, setData] = useState({
        email: '',
        password: '',
        username: '',
    })

    const handleSignup = e => {
        e.preventDefault()

        if (data.username === '' || data.email === '' || data.password === '') {
            show("Please fill all the fields.", "error");
            return;
        }

        signUp(data.email, data.password, data.username)
            .then(res => {
                show("Admin added successfully");
                setData({
                    email: '',
                    password: '',
                    username: '',
                });
            })
            .catch(err => {
                switch (err.code) {
                    case "auth/email-already-in-use":
                        show("ERROR: Email is already in use", "error");
                        break;
                    case "auth/invalid-email":
                        show("ERROR: Invalid email", "error");
                        break;
                    default:
                        console.log("Error creating user:", err);
                }
            })
    }

    return (
        <>
            <FullLayout check={"admin"}>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <Typography variant='h1' color="text.primary">Add an admin</Typography>
                            <Stack spacing={3}>
                                <TextField
                                    id="name-basic"
                                    label="Name"
                                    variant="outlined"
                                    placeholder="Enter username"
                                    onChange={e =>
                                        setData({
                                            ...data,
                                            username: e.target.value,
                                        })
                                    }
                                    value={data.username}
                                />
                                <TextField id="email-basic"
                                           label="Email"
                                           variant="outlined"
                                           type="email"
                                           placeholder="Enter email"
                                           onChange={e =>
                                               setData({
                                                   ...data,
                                                   email: e.target.value,
                                               })
                                           }
                                           value={data.email}
                                />
                                <TextField
                                    id="pass-basic"
                                    label="Enter Password"
                                    type="password"
                                    variant="filled"
                                    placeholder="Enter Password"
                                    onChange={e =>
                                        setData({
                                            ...data,
                                            password: e.target.value,
                                        })
                                    }
                                    value={data.password}
                                />
                            </Stack>
                            <br/>
                            <Button variant="contained" mt={2} onClick={handleSignup}>
                                Submit
                            </Button>
                        
                    </Grid>
                </Grid>
            </FullLayout>
        </>
    )
}

export default AddAdmin