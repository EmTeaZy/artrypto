import { Box, Typography } from "@mui/material";
import moment from "moment/moment";
import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

const BuyTimer = ({ startTime, endTime }) => {
  const [, setSeconds] = useState(0);
  const ref = useRef();
  const duration =
    startTime && endTime
      ? moment.duration(moment.unix(Number(endTime)).diff(moment()))
      : 0;
  useEffect(() => {
    ref.current = setInterval(() => {
      if (duration.get("seconds") > 0) setSeconds(new Date());
    }, 1000);
    return () => {
      clearInterval(ref.current);
    };
  }, [ref]);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Typography variant="h1">
          {duration.get("hours")}
          {"h:"}
        </Typography>
        <Typography variant="h1">
          {duration.get("minutes")}
          {"m:"}
        </Typography>
        <Typography variant="h1">
          {duration.get("seconds")}
          {"s"}
        </Typography>
      </Box>
    </>
  );
};

export default BuyTimer;
