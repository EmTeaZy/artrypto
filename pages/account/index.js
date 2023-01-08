import {Box} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useAccount} from "wagmi";
import UserDetails from "../../components/AccountComponents/UserDetails";
import axios from "axios";

const Account = () => {
    const {address} = useAccount();
    const [user, setUser] = useState({});

    useEffect(() => getUserData, []);
    const getUserData = () => {
        axios.post("/api/findOne", {walletAddress: address})
            .then(res => {
                if (res.data) {
                    setUser(res.data);
                } else {
                    axios.post("/api/addUser", {
                        username: "unnamed",
                        walletAddress: address,
                    })
                        .then(res => {
                            if (res.data) {
                                setUser(res.data.user);
                            } else {
                                console.log("mongo error");
                            }
                        });
                }
            })
    };

    return (
        <>
            <Box bgcolor={"primary.main"} px={8} py={4}>
                <UserDetails user={user} check={"user"}/>
            </Box>
        </>
    );
}


export default Account;
