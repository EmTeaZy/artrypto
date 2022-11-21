import {useSnackbar} from "../context/SnackbarContextProvider";

export default function About() {

    const {show} = useSnackbar()

    return(
        <div className="text-center">
            <h1>About Page</h1>
            <button onClick={() => show("Hey there!")} className="btn btn-success"> Show message </button>
        </div>
    )
}