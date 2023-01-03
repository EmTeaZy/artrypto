import {useSnackbar} from "../../context/SnackbarContextProvider";
import Typography from "@mui/material/Typography";

export default function About() {

    const {show} = useSnackbar()

    return(
        <div className="text-center">
            <Typography variant="h3">About Page</Typography>
            <button onClick={() => show("Hey there!")} className="btn btn-success"> Show message </button>
        </div>
    )
}