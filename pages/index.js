import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import Typography from "@mui/material/Typography";
import Carousel from "../components/carousel/Carousel";
import UsersList from "../src/components/dashboard/UsersList";

const index = () => {
  //get metamask account from wagmi hook
  const { isConnected } = useAccount();

  useEffect(
    () => console.log(isConnected ? "Connected" : "Not connected"),
    [isConnected]
  );

  return (
    <>
      <Box sx={{ textAlign: "left" }}>
      <Typography sx={{marginLeft: "88px", my: 3}} variant="h1">
          {" "}
          Featured NFTs
        </Typography>
        <Box px={4}>
          <Carousel />
        </Box>
      </Box>

            <Box px={5} mt={3}>
            <Typography sx={{textAlign: "center"}} variant="h1">Available Users</Typography>
                <UsersList/>
            </Box>
        </>
    );
};

export default index;

