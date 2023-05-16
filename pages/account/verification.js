import React, {useRef, useState} from 'react';
import Webcam from 'react-webcam';
import {PhotoCamera} from '@mui/icons-material';
import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import {createCanvasFromMedia} from 'face-api.js';
import FullLayout from "../../src/layouts/FullLayout";
import * as faceapi from "face-api.js";

const Verification = () => {
    const webcamRef = useRef(null);
    const [screenshot, setScreenshot] = useState(null);

    const detectFaceWithFaceJS = async () => {
        await faceapi.nets.ssdMobilenetv1.loadFromDisk('./models');
        console.log("Models: ", faceapi.nets)

        const image = await createCanvasFromMedia(screenshot);
        const detections = await faceapi.detectSingleFace(image);

        if (detections) {
            console.log('Face detected using face.js');
        } else {
            console.log('No face detected using face.js');
        }
    };

    const captureScreenshot = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setScreenshot(imageSrc);
        detectFaceWithFaceJS();
    };

    return (
        <>
            <FullLayout check={"user"}>
                <Box>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Webcam Component
                            </Typography>
                            <div style={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
                                <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg"/>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<PhotoCamera/>}
                                    onClick={captureScreenshot}
                                >
                                    Take Screenshot
                                </Button>
                            </div>
                            {screenshot && (
                                <div style={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
                                    <img src={screenshot} alt="screenshot" style={{maxWidth: '100%'}}/>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </Box>
            </FullLayout>
        </>
    );
};

export default Verification;
