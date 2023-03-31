import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NFTCard from "../../components/AccountComponents/NFTCard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useContract } from "@thirdweb-dev/react";
import { MARKETPLACE_CONTRACT_ADDRESS } from "../../constants";
import { Box } from "@mui/system";
import ListingComponent from "../../components/NFTs/ListingComponent";
const listedsale = () => {
  const [NFTs, setNFTs] = useState([]);
  const [status, LoadingStatus] = useState(true);
  const { contract } = useContract(MARKETPLACE_CONTRACT_ADDRESS);
  const [buttonStatus,SetStatus]=useState(true)
  const getListings = async (e) => {
    console.log("hi");
    LoadingStatus(false);
    const listings = await contract.getActiveListings();
    LoadingStatus(true);
    SetStatus(false);
    console.log(listings);
    setNFTs(listings);
  };
  return (
    <>
      <div className="d-flex p-5">
        <Box mx="auto">
          <Box>
            {buttonStatus ? (
              <Button
                fullWidth
                onClick={(e) => {
                  getListings(e);
                }}
              >
                Get Listed Nfts
              </Button>
            ) : (
              <></>
            )}
            <Typography variant="subtitle1" color="secondary">
              {!status ? "Loading...." : <></>}
            </Typography>
          </Box>
          {NFTs ? (
            <Box sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>
              {NFTs.map((nft) => (
                <Grid item xs={5} md={3}>
                  <ListingComponent nft={nft} />
                </Grid>
              ))}
            </Box>
          ) : (
            <Typography style={{ margin: "2rem auto" }} variant="h2">
              No results found
            </Typography>
          )}
        </Box>
      </div>
    </>
  );
};

export default listedsale;
