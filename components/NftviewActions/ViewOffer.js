import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { MARKETPLACE_CONTRACT_ADDRESS } from "../../constants";
import {
  useAcceptDirectListingOffer,
  useAddress,
  useContract,
  useOffers,
} from "@thirdweb-dev/react-core";
import { useRouter } from "next/router";
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSnackbar } from "../../context/SnackbarContextProvider";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ViewOffer = ({ listingdata, nftdata, user }) => {
  const router = useRouter();
  const [myoffers, setOffers] = useState([]);
  const { contract } = useContract(MARKETPLACE_CONTRACT_ADDRESS, "marketplace");
  const address = useAddress();
  const { show } = useSnackbar();
  const { id, contractAddress } = router.query;
  const { data: offers, isLoading } = useOffers(contract, listingdata.id);
  const { mutateAsync: acceptDirectOffer } =
    useAcceptDirectListingOffer(contract);
  useEffect(() => {
    if (offers) {
      if (offers.length === 0) {
        setOffers("N/A");
      } else {
        setOffers(offers);
        console.log(offers[0]);
      }
    }
  }, [isLoading]);

  const handleAcceptOffer = (offer) => {
    if (user?.isVerified) {
      acceptOffer(offer.offeror);
    } else {
      show("user is not verified.", "error");
      router.push("/account");
    }
  };
  const acceptOffer = async (offeror) => {
    try {
      const tx = await acceptDirectOffer(
        listingdata?.id,
        offeror
      );
      show("offer accepted successfully");
      router.push("/");
    } catch (error) {
      console.log(error);
      show("Offer not accepted", "error");
      // router.push("/")
    }
  };
  return (
    <>
      {myoffers === "N/A" ? (
        <Typography sx={{ color: "red" }}>
          {listingdata?.type === 0
            ? "No Offers Available"
            : "No Bids Available"}
        </Typography>
      ) : (
        <>
          <div className="event-list-container">
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table
                stickyHeader
                sx={{ minWidth: 700 }}
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell>
                      {listingdata?.type === 0 ? "Offeror" : "Bidder"}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {listingdata?.type === 0
                        ? "Offered Amount"
                        : "Bid Amount"}
                    </StyledTableCell>
                    {/* {listingdata?.sellerAddress === address &&
                    listingdata.type === 0 ? (
                      <StyledTableCell align="left">Actions</StyledTableCell>
                    ) : (
                      <></>
                    )} */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {myoffers.map((offer, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {offer?.offeror}
                      </StyledTableCell>
                      <StyledTableCell scope="row">
                        {Number(offer?.totalOfferAmount?._hex) / 1e18}
                      </StyledTableCell>
                      {listingdata?.sellerAddress === address &&
                      listingdata.type === 0 ? (
                        <StyledTableCell scope="row">
                          <Button onClick={() => handleAcceptOffer(offer)}>
                            Accept Offer
                          </Button>
                        </StyledTableCell>
                      ) : (
                        <></>
                      )}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      )}
    </>
  );
};

export default ViewOffer;
