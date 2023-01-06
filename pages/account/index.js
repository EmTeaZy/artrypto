import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const Account = () => {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  return (
    <>
      <Box bgcolor={"primary.main"} px={8} py={4}>
        {
          //coverimage and profile picture
          //Name
        }
        <Box sx={{ display: "flex", alignItems:"center",justifyContent:"space-between" }}>
          <Box sx={{ display: "flex" }}>
            <Image src="/eth.png" width={20} height={20}></Image>
            <Typography mx={1} color="text.primary" variant="h5">
              {address}
            </Typography>
          </Box>
          <Button variant="contained" sx={{borderRadius:"100px",width:"10px"}} onClick={()=>{router.push("/account/settings")}}>
          <MoreVertIcon color="white" />
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Account;
