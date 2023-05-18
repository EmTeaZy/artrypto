import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import {
  EXCHANGE_CONTRACT_ADDRESS,
  NFT_MINTING_CONTRACT_ADDRESS,
  exchangeAbi,
} from "../../../../constants";
import {
  useAddress,
  useContract,
  useContractWrite,
  useNFT,
  useOwnedNFTs,
} from "@thirdweb-dev/react-core";
import { useRouter } from "next/router";
import { CurrencyExchangeRounded } from "@mui/icons-material";

const Exchange = () => {
  const { contract } = useContract(NFT_MINTING_CONTRACT_ADDRESS);
  const router = useRouter();
  const { id, contractAddress } = router.query;
  const address = useAddress();
  const { data: tonft, isLoading, error } = useNFT(contract, id);
  const { data: mynfts } = useOwnedNFTs(contract, address);

  const MyCard = ({ nft }) => {
    const { contract } = useContract(EXCHANGE_CONTRACT_ADDRESS, exchangeAbi);
    const {
      mutateAsync: requestExchangeContract,
      isLoading,
      error,
    } = useContractWrite(contract, "requestExchange");
    const handleClickExchange = () => {
      requestExchange();
    };
    const requestExchange = async () => {
      const params = {
        _to: nft.owner,
        _fromTokenId: nft.metadata.id,
        _toTokenId: id,
      };
      try {
        const tx = await requestExchangeContract([
          nft.owner,
          nft.metadata.id,
          id,
        ]);
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <>
        {" "}
        <>
          <Card
            onClick={() => handleClickExchange(nft)}
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
                  image={nft.metadata?.image || nft.asset.image}
                  alt="Live from space album cover"
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    color="text.tertiary"
                    gutterBottom
                    component="div"
                  >
                    {nft.metadata?.name || nft.asset.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {nft.metadata?.description || nft.asset.name}
                  </Typography>
                </CardContent>
              </Box>
            </CardActionArea>
          </Card>
        </>
      </>
    );
  };
  return (
    <>
      <Box p={5}>
        <Typography variant="h1" textAlign={"center"} mt={3}>
          Exchange Nfts
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            alignItems: "center",
            justifyContent: { md: "space-between", xs: "center" },
          }}
        >
          {isLoading ? (
            <></>
          ) : (
            <>
              <Box>
                <Typography variant="h2">Get In Exchange</Typography>
                <MyCard nft={tonft} />
              </Box>
              <CurrencyExchangeRounded color="secondary" fontSize="large" />
              <Box>
                <Typography variant="h2">Chose to Exchange With</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  {mynfts ? (
                    mynfts.map((nft, index) => (
                      <Box key={index} p={3}>
                        <MyCard nft={nft} />
                      </Box>
                    ))
                  ) : (
                    <></>
                  )}
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Exchange;
