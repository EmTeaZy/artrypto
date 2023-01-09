import React from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Box, Typography } from "@mui/material";
const NFTCard = ({nft}) => {
  return (
    <>
        <Card sx={{ maxWidth: 300 }}>
        <CardActionArea>
        <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
          <CardMedia
            component="img"
            sx={{ width: 170 }}
            image={nft.image_preview_url}
            alt="Live from space album cover"
          />
          <CardContent>
            <Typography variant="h5" color="text.tertiary" gutterBottom  component="div">
              {nft.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
             {nft.description}
            </Typography>
          </CardContent>
        </Box>
        </CardActionArea>
      </Card>
    </>
  )
}

export default NFTCard