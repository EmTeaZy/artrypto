import React, { useEffect, useState } from "react";
import {
  CardMedia,
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
import { useContract, useNFTs } from "@thirdweb-dev/react";
import { NFT_MINTING_CONTRACT_ADDRESS } from "../../constants";

const dummy = [
    {id: 1, event: "Sell", address: "some address here..."},
    {id: 2, event: "Buy", address: "some address here..."},
    {id: 3, event: "Listed For Sale", address: "some address here..."},
    {id: 4, event: "Minted", address: "some address here..."},
    {id: 5, event: "Sell", address: "some address here..."},
    {id: 6, event: "Buy", address: "some address here..."},
]

const TransactionTable = () => {
//   const { contract } = useContract(NFT_MINTING_CONTRACT_ADDRESS);
//   const { data, isLoading, error } = useNFTs(contract, { start: 0, count: 100 });
//   useEffect(()=>{
//     console.log(data)
//   })
  return <>
     <FullLayout check={"admin"}>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <BaseCard title="Transactions">
              <Table
                aria-label="simple table"
                sx={{
                  mt: 3,
                  whiteSpace: "nowrap",
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography color="primary" variant="h6">
                       Event
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="primary" variant="h6">
                        Owner Address
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dummy.map((o) => (
                    <TableRow key={o.id}>
                      <TableCell>
                        <Typography color="primary" variant="subtitle2">
                          {o.event|| "N/A"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="primary" variant="subtitle2">
                          {o.address || "N/A"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </BaseCard>
          </Grid>
        </Grid>
      </FullLayout>
  </>;
};

export default TransactionTable;
