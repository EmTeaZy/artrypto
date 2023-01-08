import {Box} from "@mui/material";
import React, {useEffect} from "react";
import {useAccount} from "wagmi";
import Typography from '@mui/material/Typography'
import Carousel from "../components/carousel/Carousel";

const index = () => {

    //get metamask account from wagmi hook
    const {isConnected} = useAccount();

    useEffect(() => console.log(isConnected ? "Connected" : "Not connected"), [isConnected])

    return (
        <>
            <Box sx={{textAlign: "center"}}>
                <Typography sx={{margin: "20px 0 20px 0"}} variant="h1"> Explore, buy and sell NFTs</Typography>
                <Carousel/>
            </Box>
        </>
    );
};

export default index;


