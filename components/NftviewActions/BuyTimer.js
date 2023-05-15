import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const BuyTimer = ({ time }) => {
  const [remainingtime, changeTime] = useState(time);
  useEffect(() => {
    console.log(remainingtime)
    const decimalValue = parseInt(remainingtime);
    console.log(decimalValue);
    const totalSeconds = Math.floor(decimalValue / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    console.log("Formatted Time: ", formattedTime);
  }, []);
  return (
    <>
      <Box></Box>
    </>
  );
};

export default BuyTimer;
