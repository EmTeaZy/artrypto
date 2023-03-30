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

const OwnershipTable = () => {
  const { contract } = useContract(NFT_MINTING_CONTRACT_ADDRESS);
  const { data, isLoading, error } = useNFTs(contract, { start: 0, count: 100 });
  useEffect(()=>{
    console.log(data)
  })
  return <>
     <FullLayout check={"admin"}>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <BaseCard title="Ownerships">
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
                       Display
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="primary" variant="h6">
                       NFT Name
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
                  {data?.map((o) => (
                    <TableRow key={o.id}>
                    <TableCell>
                    <CardMedia
              component="img"
              sx={{ width: 70 }}
              image={o.metadata.image || ""}
              alt="Live from space album cover"
            />
                      </TableCell>
                      <TableCell>
                        <Typography color="primary" variant="subtitle2">
                          {o.metadata.name || "N/A"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="primary" variant="subtitle2">
                          {o.owner || "N/A"}
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

export default OwnershipTable;
