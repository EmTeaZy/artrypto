import React from "react";
import {Link, Typography} from "@mui/material";
import Image from "next/image";
import logo from '../../../public/logo.png'

const LogoIcon = ({toLink}) => {
  return (
    <Link href={toLink} className="d-flex align-items-center justify-content-center">
      <Image src={logo} height={20} width={20} alt={logo} className="me-2"/>
        <Typography variant="h3">
            Artrypto
        </Typography>
    </Link>
  );
};

export default LogoIcon;
