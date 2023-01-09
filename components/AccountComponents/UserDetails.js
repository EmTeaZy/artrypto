import { Avatar, Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/router";
import CreateButton from "./CreateButton";

const UserDetails = ({ user, check }) => {
  const router = useRouter();
  const imgsrc="/profiles/"+user.imgid+".png";
  return (
    <>
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
        <Avatar
          alt={user?.username}
          src={imgsrc}
          sx={{ width: 150, height: 150 }}
        />
        <Typography mt={1} color="text.primary" variant="h1">
          {user?.username || " "}
        </Typography>
        <Typography variant="subtitle1" color="text.info" mb={1}>{user?.bio}</Typography>
      </Box>
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
              {user?.walletAddress || " "}
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
      </Box>
    </>
  );
};

export default UserDetails;
