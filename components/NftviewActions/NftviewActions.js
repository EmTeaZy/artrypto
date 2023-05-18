import { AddCircleTwoTone } from "@mui/icons-material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import {
  useAddress,
  useActiveListings,
  useContract,
} from "@thirdweb-dev/react-core";
import { useRouter } from "next/router";
import { MARKETPLACE_CONTRACT_ADDRESS } from "../../constants";
import { ethers } from "ethers";
import BuyTimer from "./BuyTimer";
import BuyDialog from "./BuyDialog";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BigDialog from "./BidDialog";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { useSnackbar } from "../../context/SnackbarContextProvider";

const NftviewActions = ({ Nftdata, listingdata, setlistingdata, user }) => {
  const [rate, setRate] = useState(0);
  const router = useRouter();
  const { id, contractAddress } = router.query;
  const address = useAddress();
  const API_KEY =
    "acabd80096c3a92b83f2523c7d5aa44b532a877084b7090857640444f3f39e07";

  const { contract } = useContract(MARKETPLACE_CONTRACT_ADDRESS, "marketplace");
  const { data, isLoading, error } = useActiveListings(contract, {
    tokenContract: contractAddress, // Filter by token contract
    tokenId: id, // Filter by token ID
    count: 1, // Limit the number of results
    start: 0, // Start from the nth result (useful for pagination)
  });
  const show = useSnackbar();
  useEffect(() => {
    axios
      .get(
        `https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,JPY,EUR?api_key=${API_KEY}`
      )
      .then((r) => {
        setRate(r?.data?.USD);
      })
      .catch((err) => console.log(err));
  }, []);

  const [saleData, setSale] = useState(undefined);
  const [timeLeft, settimeLeft] = useState(0);
  useEffect(() => {
    if (data) {
      if (data.length === 0) {
        setSale("N/A");
        setlistingdata("N/A");
      } else {
        setlistingdata(data[0]);
        setSale(data[0]);
        console.log(data[0]);
      }
    }
  }, [data, saleData]);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    if (user?.isVerified) {
      if (Nftdata.owner === address) {
        router.push(`/nfts/${contractAddress}/${id}/sell`);
      } else {
        setOpen(true);
      }
    } else {
      show("User not verified!", "error");
      router.push("/account");
    }
  };

  const handleClickExchange = () => {
    if (user?.isVerified) {
      router.push(`/nfts/${contractAddress}/${id}/exchange`);
    } else {
      show("User not verified!", "error");
      router.push("/account");
    }
  };

  const [openBid, setOpenBid] = React.useState(false);

  const handleCloseBid = () => {
    setOpenBid(false);
  };
  const handleOpenBid = () => {
    if (user?.isVerified) {
      setOpenBid(true);
    } else {
      show("User not verified!", "error");
      router.push("/account");
    }
  };

  return (
    <>
      {saleData ? (
        <>
          <Box>
            {saleData === "N/A" ? (
              <>
                <Typography variant="subtitle1" my={5} color="red">
                  Nft not listed for sale
                </Typography>
                {Nftdata.owner != address ? (
                  <Button
                    size="large"
                    variant="contained"
                    style={{ mt: "20px", width: "20rem", height: "4rem" }}
                    startIcon={<CurrencyExchangeIcon />}
                    onClick={() => handleClickExchange()}
                  >
                    Exchange NFT
                  </Button>
                ) : (
                  <></>
                )}
                {Nftdata.owner === address ? (
                  <Button
                    size="large"
                    variant="contained"
                    style={{ width: "20rem", height: "4rem" }}
                    startIcon={<AddCircleTwoTone />}
                    onClick={() => {
                      router.push(`/nfts/${contractAddress}/${id}/sell`);
                    }}
                  >
                    list for sale
                  </Button>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  <div className="me-5 mt-5">
                    <Typography variant="h2">
                      Current Price <br />
                    </Typography>
                    <Typography variant="h1">
                      {saleData?.buyoutCurrencyValuePerToken?.displayValue ||
                        " "}{" "}
                      {saleData?.buyoutCurrencyValuePerToken?.name || " "}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: "gray" }}>
                      $
                      {(
                        Number(
                          saleData?.buyoutCurrencyValuePerToken?.displayValue
                        ) * rate || 0
                      ).toFixed(2)}
                    </Typography>
                  </div>
                  {saleData?.type === 1 ? (
                    <>
                      <div className="mt-5">
                        <Typography variant="h2">
                          Minimum Bid <br />
                        </Typography>
                        <Typography variant="h1">
                          {saleData?.reservePriceCurrencyValuePerToken
                            ?.displayValue || " "}{" "}
                          {saleData?.reservePriceCurrencyValuePerToken?.name ||
                            " "}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: "gray" }}>
                          $
                          {(
                            Number(
                              saleData?.reservePriceCurrencyValuePerToken
                                ?.displayValue
                            ) * rate || 0
                          ).toFixed(2)}
                        </Typography>
                        <Box sx={{ mt: "15px" }}>
                          <Typography variant="h2">
                            Bidding Time Remaining <br />
                          </Typography>
                          <BuyTimer
                            startTime={saleData?.startTimeInEpochSeconds?._hex}
                            endTime={saleData?.endTimeInEpochSeconds?._hex}
                          />
                        </Box>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </Box>
                {saleData?.sellerAddress === address ? (
                  <Typography variant="h3" sx={{ mt: "10px", color: "green" }}>
                    Nft Already listed for sale
                  </Typography>
                ) : (
                  <>
                    <Box
                      sx={{
                        mt: "30px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        size="large"
                        variant="contained"
                        mt={10}
                        style={{ width: "20rem", height: "4rem", mb: "10px" }}
                        startIcon={
                          saleData?.sellerAddress === address ? (
                            <AddCircleTwoTone />
                          ) : (
                            <ShoppingBasketIcon />
                          )
                        }
                        onClick={() => {
                          handleClick();
                        }}
                      >
                        {saleData?.sellerAddress === address
                          ? "list for sale"
                          : "Buy Now"}
                      </Button>
                      <Box sx={{ mt: "10px" }}>
                        <Button
                          size="large"
                          variant="contained"
                          style={{ mt: "20px", width: "20rem", height: "4rem" }}
                          startIcon={<LocalOfferIcon />}
                          onClick={() => handleOpenBid()}
                        >
                          {saleData?.type === 0
                            ? "Make an Offer"
                            : "Bid on NFT"}
                        </Button>
                      </Box>
                    </Box>
                  </>
                )}
                <BuyDialog
                  open={open}
                  handleClose={handleClose}
                  Nftdata={Nftdata}
                  listingdata={saleData}
                />
                <BigDialog
                  open={openBid}
                  handleClose={handleCloseBid}
                  Nftdata={Nftdata}
                  listingdata={saleData}
                />
                {saleData?.sellerAddress != address ? (
                  <Box
                    mt={"10px"}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      size="large"
                      variant="contained"
                      style={{ mt: "20px", width: "20rem", height: "4rem" }}
                      startIcon={<CurrencyExchangeIcon />}
                      onClick={() => handleClickExchange()}
                    >
                      Exchange NFT
                    </Button>
                  </Box>
                ) : (
                  <></>
                )}
              </>
            )}
          </Box>
        </>
      ) : (
        <Typography variant="subtitle1" sx={{ color: "green" }}>
          Loading...
        </Typography>
      )}
    </>
  );
};
export default NftviewActions;
