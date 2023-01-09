import React, {useEffect, useState} from 'react'
import {Form} from 'react-bootstrap'
import {useAuth} from "../../context/AuthContext";
import {useRouter} from "next/router";
import {useSnackbar} from "../../context/SnackbarContextProvider";
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";

const Login = () => {

    const {user, login} = useAuth()
    const router = useRouter()
    const {show} = useSnackbar()

    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const handleLogin = e => {
        e.preventDefault()
        login(data.email, data.password)
            .then(() => {
                show("Login successful!");
                router.push('/admin/')
            })
            .catch(err => {
                console.log(err)
                if(err.code === "auth/wrong-password")
                    show("ERROR: Wrong credentials", "error")
            })
    }

    // If a user is logged in, redirect them to the dashboard
    useEffect(() => {
        if (user)
            router.push("/admin")
    })

    return (
        <div
            style={{
                width: '40%',
                margin: 'auto',
            }}
        >
            <Typography color="text.primary" variant="h1" className="text-center my-3 ">Login</Typography>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Typography variant="subtitle1">Email address</Typography>
                    <Form.Control
                        onChange={e =>
                            setData({
                                ...data,
                                email: e.target.value,
                            })
                        }
                        value={data.email}
                        required
                        type="email"
                        placeholder="Enter email"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Typography variant="subtitle1">Password</Typography>
                    <Form.Control
                        onChange={e =>
                            setData({
                                ...data,
                                password: e.target.value,
                            })
                        }
                        value={data.password}
                        required
                        type="password"
                        placeholder="Password"
                    />
                </Form.Group>
                <Button
                    variant="contained"
                    color="primary"
                    className="mt-2"
                    type="submit">
                    Login
                </Button>
            </Form>
        </div>
    )
}

export default Login