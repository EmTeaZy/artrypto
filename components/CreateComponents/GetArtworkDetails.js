import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { NFTStorage } from "nft.storage";
import { NFT_STORAGE_KEY } from "../../config/Nftstorage";
import { abi, NFT_MINTING_CONTRACT_ADDRESS } from "../../constants";
import { useSnackbar } from "../../context/SnackbarContextProvider";
import { useRouter } from "next/router";
import {
  useAddress,
  useSigner,
  useMintNFT,
  useContract,
  Web3Button,
} from "@thirdweb-dev/react";
const GetArtworkDetails = () => {
  const [image, setSelectedImage] = useState(null);
  const [name, changeName] = useState("");
  const [description, changeDetails] = useState("");
  const address = useAddress();
  const { show } = useSnackbar();
  const router = useRouter();
  const [setLoading, changeLoading] = useState();
  const signer = useSigner();
  const contractAddress = NFT_MINTING_CONTRACT_ADDRESS;
  const { contract } = useContract(contractAddress);
  //generate metadata to mint NFT
  const generateMetaData = async () => {
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
    // call client.store, passing in the image & metadata
    return nftstorage.store({
      image,
      name,
      description,
    });
  };

  //mint NFT
  const callMintNFT = async (metadata) => {
    try
    {
      const tx = await contract.erc721.mint(metadata);
      show("NFT minted succesfully");
    }
    catch(error)
    {
      show("NFT not minted","error")
    }
  };

  //store nft in ipfs and generate metadata
  const storeNFT = async () => {
    const metadata = await generateMetaData();
    show("Metadata created successfully");
    console.log(metadata.url);
    await callMintNFT(metadata.url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !image) {
      show("All fields must be provided.", "error");
      return;
    }

    if (address) {
      changeLoading(true);
      await storeNFT();
      changeLoading(false);
      router.push("/")
    } else console.log("wallet not connected");
  };

  return (
    <>
      <Box px={12} maxWidth={"500px"}>
        <Box mt={1} sx={{ display: "flex" }}>
          <Typography variant="subtitle2" color={"text.danger"}>
            *
          </Typography>
          <Typography mx={1} variant="subtitle3" color={"text.info"}>
            required
          </Typography>
        </Box>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Box>
            {image && (
              <div>
                <img
                  alt="not found"
                  width={"250px"}
                  src={URL.createObjectURL(image)}
                />
                <br />
                <Button onClick={() => setSelectedImage(null)}>Remove</Button>
              </div>
            )}

            <input
              type="file"
              name="myImage"
              accept="image/*"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
              }}
            />
          </Box>
          <Box>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 2 }}
            >
              <Grid item xs={10} md={10}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box mt={1} sx={{ display: "flex", alignItems: "center" }}>
                    <Typography my={1} variant="formlabel">
                      Name
                    </Typography>
                    <Typography variant="subtitle2" color={"text.danger"}>
                      *
                    </Typography>
                    <Typography mx={1} variant="subtitle3" color={"text.info"}>
                      required
                    </Typography>
                  </Box>
                  <TextField
                    id="Name"
                    color="secondary"
                    placeholder="Name"
                    onChange={(e) => {
                      changeName(e.target.value);
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={10} md={10}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box mt={1} sx={{ display: "flex", alignItems: "center" }}>
                    <Typography my={1} variant="formlabel">
                      Details
                    </Typography>
                    <Typography variant="subtitle2" color={"text.danger"}>
                      *
                    </Typography>
                    <Typography mx={1} variant="subtitle3" color={"text.info"}>
                      required
                    </Typography>
                  </Box>
                  <TextField
                    multiline
                    maxRows={6}
                    id="Details"
                    color="secondary"
                    placeholder="Details"
                    onInput={(e) => changeDetails(e.target.value)}
                  />
                </Box>
              </Grid>
              <Grid item xs={10} md={7}>
                <Button
                  disabled={setLoading}
                  type="submit"
                  variant="outlined"
                  color="secondary"
                >
                  {setLoading ? "Minting...." : "Mint NFT"}
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
