import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import GitHubIcon from '@mui/icons-material/GitHub';

function Copyright() {
  return (
    <Typography variant="body2" color="#58595C">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
        Artrypto
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',

      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 1,
          mt: 'auto',
          textAlign: "center",
          backgroundColor: "black"
        }}
      >
        <Container maxWidth="sm">

          <Link href="#">
            <a><FacebookIcon/></a>
          </Link>
          
          <Link href="#">
            <a><InstagramIcon/></a>
          </Link>

          <Link href="#">
            <a><TwitterIcon/></a>
          </Link>

          <Link href="#">
            <a><YouTubeIcon/></a>
          </Link>

          <Link href="#">
            <a><LinkedInIcon/></a>
          </Link>

          <Link href="#">
            <a><GitHubIcon/></a>
          </Link>

          <Link href="#">
            <a><RssFeedIcon/></a>
          </Link>
          
          <Copyright />
          
        </Container>
      </Box>
    </Box>
  );
}