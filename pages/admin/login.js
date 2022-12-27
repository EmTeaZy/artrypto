import React, {useState} from 'react'
import {Button, Form} from 'react-bootstrap'
import {useAuth} from "../../context/AuthContext";
import {useRouter} from "next/router";
import {useSnackbar} from "../../context/SnackbarContextProvider";

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
                router.push('/dashboard')
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
            <h1 className="text-center my-3 ">Login</h1>
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
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    )
}

export default Login