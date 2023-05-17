import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const AuthenticationPrompt = ({begin}) => {

    const handleVerify = () => {
        begin();
    }

    return (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Box sx={{ width: '50%'}}>
                <Typography variant="h1" component="h1" gutterBottom>
                    Your blue tick awaits you!
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    To get started, please authenticate yourself using facial recognition. <br/>
                    Follow the instructions below:
                </Typography>
                <ol style={{ color: 'white', marginTop: '1rem'}}>
                    <li>
                        <Typography variant="subtitle1" component="span">
                            Click the "Verify Me" button.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="subtitle1" component="span">
                            Grant permission to access your webcam.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="subtitle1" component="span">
                            Perform the required gestures as instructed.
                        </Typography>
                    </li>
                </ol>
                <Typography variant="subtitle1" gutterBottom>
                    Once you are successfully verified, you will receive a blue tick badge next to your profile name, indicating that you are a verified user.
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    As a verified user, you gain access to the full functionality of the marketplace, including buying and selling NFTs.
                </Typography>
                <Box mt={2}>
                    <Button size="large" sx={{height: '3rem', width: '100%'}} variant="contained" onClick={handleVerify}>
                        Verify Me
                    </Button>
                </Box>
                <Typography sx={{fontSize: '10px', textAlign: 'center', marginTop: '1rem'}} variant="subtitle1" gutterBottom>
                    Please note that facial recognition is used solely for user verification purposes and your privacy is of utmost importance to us.
                    We do not store or share your facial data.
                </Typography>
            </Box>
        </Box>
    );
};

export default AuthenticationPrompt;
