import React from "react";
import {Typography} from "@mui/material";

const NFTCard = ({item}) => {
  return (
    <div key={item.id} className="card">
      <div className="card-top">
        <img src={item.linkImg} alt={item.title} />
      </div>
      <div className="text-start">
        <Typography sx={{ margin: "10px 0 0 10px" }} variant="h3">
          {item.title}
        </Typography>
        <Typography sx={{ marginLeft: "10px" }} variant="subtitle1">
          {item.price}ETH
        </Typography>
      </div>
    </div>
  );
};

export default NFTCard;
