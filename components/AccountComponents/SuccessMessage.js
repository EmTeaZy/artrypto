import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { CheckCircle } from '@mui/icons-material';

const AnimatedCheckCircle = styled(CheckCircle)`
  animation: bounce 1s infinite;

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }
`;

const SuccessMessage = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            {isLoading ? (
                <CircularProgress size={150} color="secondary" />
            ) : (
                <Box display="flex" alignItems="center" sx={{flexDirection: 'column'}}>
                    <AnimatedCheckCircle color="success" sx={{ marginTop: '3rem', marginRight: '8px', height: '12rem', width: '12rem' }} />
                    <Typography sx={{marginTop: '2rem'}} variant="h1">Verification Complete!</Typography>
                </Box>
            )}
            <Typography variant="h2" sx={{ marginTop: '2rem' }}>
                {isLoading ? 'Processing' : ''}
            </Typography>
        </Box>
    );
};

export default SuccessMessage;
