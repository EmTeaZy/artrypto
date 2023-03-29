import React, {useEffect, useState} from "react";
import axios from "axios";
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const createData = (event, price, from, to, date) => {
    return {event, price, from, to, date};
}

const dummyEvents = [
    createData('Sale', 1.22, 'sample name', 'sample name', '2h ago'),
    createData('Transfer', 2.37, 'sample name', 'sample name', '4h ago'),
    createData('Sale', 2.62, 'sample name', 'sample name', '1d ago'),
    createData('Transfer', 3.05, 'sample name', 'sample name', '1d ago'),
    createData('Transfer', 3.05, 'sample name', 'sample name', '1d ago'),
    createData('Transfer', 3.05, 'sample name', 'sample name', '1d ago'),
    createData('Transfer', 3.05, 'sample name', 'sample name', '1d ago'),
    createData('Transfer', 3.05, 'sample name', 'sample name', '1d ago'),
    createData('Transfer', 3.05, 'sample name', 'sample name', '1d ago'),
    createData('Transfer', 3.05, 'sample name', 'sample name', '1d ago'),
    createData('Minted', 3.56, 'sample name', 'sample name', '2d ago'),
];

const EventList = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => fetchEvents, [])

    const fetchEvents = () => {
        axios.get("/api/getUsers")
            .then(res => {
                console.log(res.data);
                setEvents(res.data)
            })
            .catch(err => console.error("Fetching users error: ", err))
    }

    return (
        <div className="event-list-container">
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Event</StyledTableCell>
                            <StyledTableCell align="right">Price</StyledTableCell>
                            <StyledTableCell align="right">From</StyledTableCell>
                            <StyledTableCell align="right">To</StyledTableCell>
                            <StyledTableCell align="right">Date</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dummyEvents.map((event) => (
                            <StyledTableRow key={event.name}>
                                <StyledTableCell component="th" scope="row">
                                    {event.event}
                                </StyledTableCell>
                                <StyledTableCell align="right">{event.price}ETH</StyledTableCell>
                                <StyledTableCell align="right">{event.from}</StyledTableCell>
                                <StyledTableCell align="right">{event.to}</StyledTableCell>
                                <StyledTableCell align="right">{event.date}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default EventList;
