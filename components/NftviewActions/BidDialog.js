import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import { useContract, useSDK } from "@thirdweb-dev/react";
import { useState } from "react";
import { MARKETPLACE_CONTRACT_ADDRESS } from "../../constants";
import { useSnackbar } from "../../context/SnackbarContextProvider";
import { useRouter } from "next/router";
import { set } from "mongoose";

export default function BigDialog(props) {
  const { open, handleClose, Nftdata, listingdata } = props;
  const { show } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { contract } = useContract(MARKETPLACE_CONTRACT_ADDRESS, "marketplace");
  const sdk = useSDK();

  const [offerValue, setOfferValue] = useState();
  const handleOfferChange = (event) => {
    seterror(false);
    setOfferValue(event.target.value);
  };

  const [error, seterror] = useState(false);
  const handleBuy = async () => {
    const balance = await sdk?.wallet?.balance();
    if (
      offerValue >=
      Number(listingdata?.buyoutCurrencyValuePerToken?.displayValue)
    ) {
      if (Number(balance.displayValue) >= offerValue) {
        createOffer();
      } else {
        show("Insufficient amount to make offer on this NFT", "error");
      }
    } else {
      seterror(true);
    }
  };
  const createOffer = async () => {
    setLoading(true);
    console.log(offerValue)
    try{
        const res = await contract.makeOffer(Number(listingdata.id),offerValue, 1);
        setLoading(false);
        show("Offer made succesfully");
        handleClose();
        // router.push("/account");
    }catch(error){
        console.log(error)
        handleClose()
        show("Transaction not succesfull","error")
    }
    setLoading(false)
    setOfferValue(0)
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h1" sx={{ color: "black" }}>
            Create an Offer
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "18px" }}>
            <Typography
              sx={{ fontSize: "22px", fontWeight: "600", color: "black" }}
            >
              NFT Name: <Typography>{Nftdata?.metadata.name}</Typography>
            </Typography>
            <Typography
              sx={{ fontSize: "22px", fontWeight: "600", color: "black" }}
            >
              Description:{" "}
              <Typography>{Nftdata?.metadata.description}</Typography>
            </Typography>
            <Typography
              sx={{ fontSize: "22px", fontWeight: "600", color: "black" }}
            >
              Instant Buy Price:{" "}
              <Typography>
                {" "}
                {listingdata?.buyoutCurrencyValuePerToken?.displayValue}{" "}
                {listingdata?.buyoutCurrencyValuePerToken?.name}
              </Typography>
            </Typography>
            <Typography
              sx={{
                fontSize: "22px",
                fontWeight: "600",
                color: "black",
                mt: "10px",
              }}
            >
              Your Offer:{" "}
            </Typography>
            <TextField
              label="Offer Price"
              color="primary"
              fullWidth
              inputProps={{ style: { color: "black" } }}
              value={offerValue}
              onChange={handleOfferChange}
              required
              type="number"
              margin="normal"
            />
            {error ? (
              <Typography variant="subtitle2" sx={{ color: "red" }}>
                *Error listing value is less then base price
              </Typography>
            ) : (
              <></>
            )}
            <Typography mt={5} sx={{ color: !loading ? "red" : "green" }}>
              {!loading
                ? "Are you sure? You are going to list the given amount for this NFT?"
                : "Nft Listing process is in progress...... Hold tight, it's gonna be fun"}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={handleClose}>
            Cancel
          </Button>
          <Button disabled={loading} onClick={() => handleBuy()}>
            {!loading ? "Create Listing" : "Listing..."}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
