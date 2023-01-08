import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/router";
import CreateButton from "./CreateButton";

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
            {user.username || " "}
          </Typography>
          <Typography mx={1} color="text.primary" variant="h5">
            {user.walletAddress || " "}
          </Typography>
        </Box>
        {check == "user" ? (
          <>
            <CreateButton />
          </>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};

export default UserDetails;
