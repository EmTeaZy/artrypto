import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/router";

const UserDetails = ({ user, check }) => {
    const router = useRouter();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Image src="/eth.png" width={20} height={20} alt={"eth"}></Image>
          <Typography mx={1} color="text.primary" variant="h5">

            {user?.username||
            "null"
            }
          </Typography>
          <Typography mx={1} color="text.primary" variant="h5">
            {user?.walletAddress||
            "null"
            }
          </Typography>
        </Box>
        {check == "user" ? (
          <Button
            variant="contained"
            sx={{ borderRadius: "100px", width: "10px" }}
            onClick={() => {
              router.push("/account/settings");
            }}
          >
            <MoreVertIcon color="white" />
          </Button>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};

export default UserDetails;
