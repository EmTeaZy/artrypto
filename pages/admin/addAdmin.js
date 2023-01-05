import React, {useState} from 'react'
import {useAuth} from "../../context/AuthContext";
import {useSnackbar} from "../../context/SnackbarContextProvider";
import {Button, CssBaseline, Grid, Stack, TextField,} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import {ThemeProvider} from "@mui/material/styles";
import theme from "../../src/theme/theme";
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
                console.log("Sign up successful", res)
                show("Sign up successful!");
            })
            .catch(err => console.log(err))
    }

    return (

        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <FullLayout>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <BaseCard title="Add an admin">
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
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    placeholder="Enter password"
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
                        </BaseCard>
                    </Grid>
                </Grid>
            </FullLayout>
        </ThemeProvider>
    )
}

export default AddAdmin