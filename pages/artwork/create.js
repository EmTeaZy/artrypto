import { Box, Typography } from "@mui/material";
import React from "react";
import GetArtworkDetails from "../../components/CreateComponents/GetArtworkDetails";

const Create = () => {
   const [user, setUser] = useState({});
   useEffect(() => getUserData, []);
   const getUserData = async () => {
     if (address) {
       await axios
         .post("/api/findUser", { walletAddress: address })
         .then((res) => {
           if (res.data) {
             setUser(res.data);
           } else {
             let img = Math.floor(Math.random() * (7 - 1 + 1) + 1).toString();
             axios
               .post("/api/addUser", {
                 username: "unnamed",
                 walletAddress: address,
                 imgid: img,
               })
               .then((res) => {
                 if (res.data) {
                   setUser(res.data.user);
                 } else {
                   console.log("mongo error");
                 }
               });
           }
         });
     }
   };
  return (
    <>
      <Box px={45}>
        <Box px={25}>
          <Typography variant="h1" color="text.primary" mt={3}>
            Create NFT
          </Typography>
          <Typography variant="subtitle2" color={"text.info"}>
            Upload your artwork, fill out the fields and make it an NFT.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <GetArtworkDetails user={user} />
        </Box>
      </Box>
    </>
  );
};

export default Create;
