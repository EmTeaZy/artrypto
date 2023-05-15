import React from "react";
import { useRouter } from "next/router";
import { Box, CardMedia, Typography } from "@mui/material";
import EventList from "../../../../components/NFTs/EventList";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useContract, useNFT } from "@thirdweb-dev/react";
import NftviewActions from "../../../../components/NftviewActions/NftviewActions";

const NFTDisplay = () => {
  const router = useRouter();
  const { id, contractAddress, useraddress } = router.query;
  const { contract } = useContract(contractAddress);
  const { data } = useNFT(contract, id);
  return (
    <div className="d-flex flex-column">
      <div className="d-flex w-full m-auto">
        <Box sx={{ pr: 15, ml: 3, textAlign: "left", mt: 5 }}>
          <div className="left-container">
            <CardMedia
              component="img"
              sx={{ width: 320, borderRadius: "20px" }}
              image={data?.metadata.image || ""}
              alt="Live from space album cover"
            />
            <div className="mt-3">
              <Typography variant="h1">Description</Typography>
              <Typography variant="subtitle1">
                {data?.metadata.description || ""}
              </Typography>
            </div>
          </div>
        </Box>
        <div className="right-container">
          <div className="mt-5">
            <div>
              <Typography variant="h1">{data?.metadata.name || ""}</Typography>
              <Typography variant="subtitle1">
                Owned by{" "}
                <Typography color="secondary">{data?.owner || ""}</Typography>
              </Typography>
            </div>
            <div className="d-flex flex-row mt-2">
              <Typography variant="subtitle2"># 12, 123</Typography>
              <Typography className="ms-2" variant="subtitle2">
                <VisibilityIcon color="light" fontSize="small" /> 123 views
              </Typography>
              <Typography
                className="ms-2"
                variant="subtitle2"
                sx={{ cursor: "pointer" }}
              >
                <FavoriteBorderIcon color="light" fontSize="small" /> 3
                favorites
              </Typography>
            </div>
            {data ? (
              <NftviewActions Nftdata={data} useraddress={useraddress} />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="m-5">
        <Typography variant="h1">Item Activity</Typography>
        <EventList />
      </div>
    </div>
  );
};

export default NFTDisplay;
