import React, {useState} from 'react'
import {Button, Form} from 'react-bootstrap'
import {useAuth} from "../../context/AuthContext";
import {useRouter} from "next/router";
import {useSnackbar} from "../../context/SnackbarContextProvider";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const Login = () => {

    const {login} = useAuth()
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
            .catch(err => console.log(err))
    }

    return (
        <div
            style={{
                width: '40%',
                margin: 'auto',
            }}
        >
            <Typography variant="h3" className="text-center my-3 ">Login</Typography>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
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
                    <Form.Label>Password</Form.Label>
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
                <Typography variant="p" className="text-end" > Don't have an account?
                    <Link href="/admin/signup"> Sign Up </Link>
                </Typography>
                <br/>
                <Button className="mt-2" variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    )
}

export default Login