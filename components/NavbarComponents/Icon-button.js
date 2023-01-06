import { IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import LogoIcon from '../../src/layouts/logo/LogoIcon'

const Iconbutton = () => {
 const router=useRouter()
  return (
   <>
    <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => {
                router.push("/");
              }}
            >
              <LogoIcon />
            </IconButton>
   </>
  )
}

export default Iconbutton