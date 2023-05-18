import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NFTCard from "./NFTCard";
import {
  useOwnedNFTs,
  useContract,
  useListings,
  Marketplace,
  useActiveListings,
} from "@thirdweb-dev/react";
import {
  NFT_MINTING_CONTRACT_ADDRESS,
  MARKETPLACE_CONTRACT_ADDRESS,
} from "../../constants";

const CreatedNFTs = ({ address }) => {
  const [nfts, setnfts] = useState();
  const [gotNFT, setStatus] = useState(true);
  const contractAddress = NFT_MINTING_CONTRACT_ADDRESS;
  const { contract } = useContract(contractAddress);
  const myaddress = address;
  const { data, isLoading, error } = useOwnedNFTs(contract, myaddress);
  useEffect(() => {
    setnfts(data);
    console.log(nfts);
  });

  const ListedNfts = () => {
    const { contract } = useContract(
      MARKETPLACE_CONTRACT_ADDRESS,
      "marketplace"
    );
    const {
      data: listings,
      isLoading,
      error,
    } = useActiveListings(contract, {seller:address, start: 0, count: 100 });
    return (
      <>
        {listings?.map((listing) => (
          <>
            {listing?.sellerAddress === address && listing?.type === 1 ? (
              <Card
                onClick={() => {
                  router.push(`/nfts/${contractAddress}/${listing?.asset?.id}`);
                }}
                sx={{ maxWidth: 250, minWidth: 250 }}
              >
                <CardActionArea>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: 150 }}
                      image={listing?.asset?.image || nft.asset.image}
                      alt="Live from space album cover"
                    />
                    <CardContent>
                      <Typography
                        variant="h5"
                        color="text.tertiary"
                        gutterBottom
                        component="div"
                      >
                        {listing?.asset?.name || " "}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {listing?.asset?.description || " "}
                      </Typography>
                    </CardContent>
                  </Box>
                </CardActionArea>
              </Card>
            ) : (
              <></>
            )}
          </>
        ))}
      </>
    );
  };

  return (
    <>
      <Typography variant="h1">Created NFTs</Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          mx: "auto",
        }}
      >
        {!gotNFT ? (
          <Typography color={"text.danger"} variant="subtitle 1">
            No NFTs minted
          </Typography>
        ) : (
          <></>
        )}
        {data ? (
          data.map((NFT) => (
            <>
              <NFTCard nft={NFT} />
              {/* <ListedNfts /> */}
            </>
          ))
        ) : (
          <Typography variant="subtitle1" sx={{ color: "green" }}>
            Fetching Nfts...
          </Typography>
        )}
      </Box>
    </>
  );
};

export default CreatedNFTs;
