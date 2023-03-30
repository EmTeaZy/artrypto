import React, { useEffect, useState } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import FullLayout from "../../src/layouts/FullLayout";
import BaseCard from "../../src/components/baseCard/BaseCard";
import { NFT_MINTING_CONTRACT_ADDRESS } from "../../constants";
import { useContract, useNFTs } from "@thirdweb-dev/react";
import OwnershipTable from "../../components/AdminComponents/OwnershipTable";

const ViewOwnerships = () => {
  const [totalNfts, setTotalNfts] = useState(0);
  return (
    <>
     <OwnershipTable />
    </>
  );
};

export default ViewOwnerships;
