import React from "react";
import {Link, Typography} from "@mui/material";
import Image from "next/image";
import txtlogo from '../../../public/txtlogo.png'

const LogoIcon = ({toLink}) => {
  return (
    <Link href={toLink} className="d-flex align-items-center justify-content-center">
      <Image src={txtlogo} height={36} width={130} alt={txtlogo} className="me-2"/>
    </Link>
  );
};

export default LogoIcon;
