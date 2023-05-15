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
export default function BuyDialog(props) {
  const { open, handleClose, Nftdata, listingdata } = props;
  const { show } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { contract } = useContract(MARKETPLACE_CONTRACT_ADDRESS, "marketplace");
  const sdk = useSDK();
  const handleBuy = async () => {
    const balance = await sdk?.wallet?.balance();
    const buyPrice = Number(
      listingdata?.buyoutCurrencyValuePerToken?.displayValue
    );

    if (Number(balance.displayValue) >= buyPrice) {
      buyNFT();
    } else {
      show("Insufficient amount to buy this NFT", "error");
    }
  };
  const buyNFT = async () => {
    setLoading(true);
    const res = await contract.buyoutListing(Number(listingdata.id), 1);
    setLoading(false);
    show("Nft bought Successfully!!");
    handleClose();
    router.push("/account");
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h1" sx={{ color: "black" }}>
            Buy Now
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
            <Typography mt={5} sx={{ color: !loading ? "red" : "green" }}>
              {!loading
                ? "Are you sure? You are going to pay the amount given for this NFT?"
                : "Nft buying process is in progress...... Hold tight, it's gonna be fun"}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={handleClose}>
            Cancel
          </Button>
          <Button disabled={loading} onClick={() => handleBuy()}>
            {!loading ? "Buy" : "Buying..."}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
