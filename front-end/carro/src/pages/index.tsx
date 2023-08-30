import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Box, Paper } from '@mui/material'
import FormLogin from '@/components/form-login'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <FormLogin />
      </Box>
    </>
  )
}
