import React, {useEffect, useRef, useState} from 'react';
import {PhotoCamera, CheckCircle, SentimentVerySatisfied, SentimentVeryDissatisfied} from '@mui/icons-material';
import {Box, Button, Typography} from "@mui/material";
import * as faceapi from 'face-api.js';
import FullLayout from "../../src/layouts/FullLayout";
import VerificationPrompt from '../../components/AccountComponents/VerificationPrompt'
import {useSnackbar} from "../../context/SnackbarContextProvider";
import SuccessMessage from "../../components/AccountComponents/SuccessMessage";
import {useAddress} from "@thirdweb-dev/react";
import axios from "axios";

const Verification = () => {

    const videoRef = useRef(null);
    const height = 480;
    const length = 640;
    const {show} = useSnackbar();

    const address = useAddress();
    const [isPrompt, setIsPrompt] = useState(true);

    const [isNeutral, setIsNeutral] = useState(false);
    const [isSmiling, setIsSmiling] = useState(false);
    const [isSad, setIsSad] = useState(false);
    const [isVerified, setIsVerified] = useState(false)

    const beginVerification = () => {
        setIsPrompt(false);
    }

    useEffect(() => {
        if (!isPrompt)
            startVideo();
    }, [isPrompt])

    const startVideo = () => {
        navigator.getUserMedia({
            video: {}
        }, stream => videoRef.current.srcObject = stream, error => {
            console.log(error)
        });

    }

    useEffect(() => {
        loadModels()
    }, [])

    useEffect(() => {
        if (isNeutral && isSmiling && isSad){
            setIsVerified(true);

            axios.post("/api/verifyUser", {walletAddress: address, isVerified: true})
                .then(() => console.log("User verified successfully"))
                .catch(err => console.error(err));
        }
    }, [isSmiling, isNeutral, isSad])

    const loadModels = async () => {
        await faceapi.loadTinyFaceDetectorModel('/models');
        await faceapi.loadFaceExpressionModel('/models');
    }

    const detectFace = async () => {
        try {
            const detections =
                await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions)
                    .withFaceExpressions();

            if (detections.length !== 0) {
                show("Face detected successfully!");
                const obj = detections[0]?.expressions;
                const expression = Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);
                switch (expression) {
                    case "neutral":
                        setIsNeutral(true);
                        break;
                    case "happy":
                        setIsSmiling(true);
                        break;
                    case "sad":
                        setIsSad(true);
                        break;
                    default:
                        show(`Unknown expression detected: ${expression}`, "warning");
                        break;
                }
            } else
                show("We couldn't detect your face. Please try again.", "danger")
        } catch (ex) {
            console.log("An error occurred:", ex)
        }
    }

    const renderCheckIcon = (state) => {
        return state ? (
            <CheckCircle color="success" size="small"/>
        ) : null;
    };

    return (
        <>
            <FullLayout check={"user"}>
                {
                    isVerified ?
                        <SuccessMessage/> :
                        isPrompt ?
                            <VerificationPrompt begin={beginVerification}/>
                            :
                            <Box sx={{marginTop: '-3rem'}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    textAlign: 'center'
                                }}>
                                    <Typography variant="h1">
                                        Verification
                                    </Typography>
                                    <Typography variant="h3">
                                        You can verify yourself here and earn access to a blue tick. <br/>
                                        A blue tick let's you do all kinds of cool stuff!
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{fontSize: '12px', marginTop: '0.5rem'}}>
                                        Follow and perform these simple expressions below <br/>
                                        Click "Capture" whenever you're ready!
                                    </Typography>
                                </Box>
                                <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
                                    <Box display="flex" alignItems="center"
                                         sx={expressionStyles}>
                                        {renderCheckIcon(isSmiling)}
                                        <Typography variant="h2" sx={{paddingLeft: '8px'}}>
                                            Smiling
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center"
                                         sx={expressionStyles}>
                                        {renderCheckIcon(isNeutral)}
                                        <Typography variant="h2" sx={{paddingLeft: '8px'}}>
                                            Neutral
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center"
                                         sx={expressionStyles}>
                                        {renderCheckIcon(isSad)}
                                        <Typography variant="h2" sx={{paddingLeft: '8px'}}>
                                            Sad
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
                                    <video ref={videoRef} muted autoPlay height={height} width={length}></video>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginTop: '1rem',
                                    marginBottom: '1rem'
                                }}>
                                    <Button
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        startIcon={<PhotoCamera/>}
                                        onClick={detectFace}
                                    >
                                        Capture
                                    </Button>
                                </Box>
                            </Box>

                }
            </FullLayout>
        </>
    );
};

const expressionStyles = {
    marginLeft: '2rem',
    marginRight: '2rem ',
}

export default Verification;
