import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NFTsData } from "../../utils/data";
import NFTCard from "../../components/carousel/NFTCard";
import { Typography, Grid } from "@mui/material";

const Search = () => {
  const router = useRouter();
  const [NFTs, setNFTs] = useState([]);

  useEffect(() => {
    let nfts = NFTsData.filter((nft) =>
      nft.title.toLowerCase().includes(router.query.keyword.toLowerCase())
    );
    setNFTs(nfts);
  }, [router.query.keyword]);

  useEffect(() => console.log(NFTs), []);

  return (
    <div className="d-flex">
      {NFTs.length > 0 ? (
        <Grid className="mt-3 ms-3" container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
          {NFTs.map((nft) => (
            <Grid item xs={5} md={3}>
              <NFTCard item={nft} />
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
