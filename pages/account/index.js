import {Box} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useAccount} from "wagmi";
import UserDetails from "../../components/AccountComponents/UserDetails";
import axios from "axios";
import CreatedNFTs from "../../components/AccountComponents/CreatedNFTs";

const Account = () => {
    const {address} = useAccount();
    const [user, setUser] = useState({});
    useEffect(() => getUserData, []);
    const getUserData = async () => {
        axios.post("/api/findUser", {walletAddress: address})
            .then(res =>  {
                if (res.data) {
                    setUser(res.data);
                } else {
                    let img = Math.floor(Math.random() * (7 - 1 + 1) + 1).toString()
                    axios.post("/api/addUser", {
                        username: "unnamed",
                        walletAddress: address,
                        imgid:img,
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
                <hr style={{borderColor:"white"}}/>
                <CreatedNFTs address={user.walletAddress} />
            </Box>
        </>
    );
}


export default Account;
