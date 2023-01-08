import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const GetArtworkDetails = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <Box px={12} maxWidth={"500px"}>
        <Box mt={1} sx={{display:"flex"}}>
        <Typography variant="subtitle2" color={"text.danger"}>
        *
        </Typography>
        <Typography mx={1} variant="subtitle3" color={"text.info"}>
        required
        </Typography>
        </Box>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Box>
            {selectedImage && (
              <div>
                <img
                  alt="not found"
                  width={"250px"}
                  src={URL.createObjectURL(selectedImage)}
                />
                <br />
                <Button onClick={() => setSelectedImage(null)}>Remove</Button>
              </div>
            )}
    
            <input
              type="file"
              name="myImage"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
              }}
            >  </input>
          </Box>
          <Box>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 2 }}
            >
              <Grid item xs={10} md={10}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography my={1} variant="formlabel">Name</Typography>
                  <TextField
                    required
                    id="Name"
                    color="secondary"
                    placeholder="Name"
                    //    onChange={(e) => {changeName(e.target.value)}}
                  />
                </Box>
              </Grid>
              <Grid item xs={10} md={10}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography my={1} variant="formlabel">Details</Typography>
                  <TextField
                    required
                    multiline
                    maxRows={4}
                    id="Details"
                    color="secondary"
                    placeholder="Bio"
                    //    onInput={(e) => changeBio(e.target.value)}
                  />
                </Box>
              </Grid>
              <Grid item xs={10} md={10}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography my={1} variant="formlabel">Email</Typography>
                  <TextField
                    id="Email"
                    color="secondary"
                    placeholder="Email"
                    type={"email"}
                    // onInput={(e) => changeEmail(e.target.value)}
                  />
                </Box>
              </Grid>
              <Grid item xs={10} md={7}>
                <Button type="submit" variant="outlined" color="secondary">
                  Mint NFT
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default GetArtworkDetails;
