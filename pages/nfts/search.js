import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NFTsData } from "../../utils/data";
import { Typography, Grid } from "@mui/material";
import { useContract, useNFTs } from "@thirdweb-dev/react";
import {NFT_MINTING_CONTRACT_ADDRESS} from "../../constants"
import NFTCard  from "../../components/AccountComponents/NFTCard"
const Search = () => {
  const router = useRouter();
  const [NFTs, setNFTs] = useState([]);
  const { contract } = useContract(NFT_MINTING_CONTRACT_ADDRESS);
  const { data, isLoading, error } = useNFTs(contract, { start: 0, count: 100 });
  useEffect(() => {
    let nfts = data?.filter((nft) =>
      nft.metadata.name.toLowerCase().includes(router.query.keyword.toLowerCase())
    );
    setNFTs(nfts);
  }, [router.query.keyword,data]);
  
  useEffect(() => console.log(data));
  useEffect(() => console.log(NFTs), []);

  return (
    <div className="d-flex p-5">
      {NFTs ? (
        <Grid className="mt-3 ms-3" container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
          {NFTs.map((nft) => (
            <Grid item xs={5} md={3}>
              <NFTCard nft={nft}/>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography style={{ margin: "2rem auto" }} variant="h2">
          No results found
        </Typography>
      )}
    </div>
  );
};

export default Search;
