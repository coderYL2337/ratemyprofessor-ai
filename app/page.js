"use client"

import { Box, Button, Container, Stack, Typography } from '@mui/material'
import React from 'react'

export default function LandingPg() {
    return (
        <Box width="100vw" height="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={2}>
            <Stack
                direction="column"
                alignItems="center"
                spacing={5}
                maxWidth="lg"  
                flexGrow={1} 
                overflow={'auto'}
            >
                <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                p={8}
                >
                    <Stack
                        direction="column"
                        alignItems="center"
                        spacing={2}
                    >
                        <Typography variant="h1" component="h1" align="center" p={4} sx={{ color: '#fff050' }}>
                            Profspector AI
                        </Typography>
                        <Typography variant="h3" component="h3" align="center">
                            Uncover Your Path to the Perfect Professor
                        </Typography>
                        <Typography variant="h5" component="h5" align="center" sx={{ color: '#fff050' }}>
                            Find the best professors for your courses through informed insights
                        </Typography>
                    </Stack>
                </Box>

                <Button href="/profspector"
                variant="contained"
                color="inherit" 
                sx={{ backgroundColor: "#fff050", color:"#000000" }}
                >
                    Discover Your Ideal Professor
                </Button>
            </Stack>
            <Box
                position="absolute"
                bottom={0}
                width="100%"
                textAlign="center"
                bgcolor="#000000"
                p={2}
            >
                <Typography variant="body1" color='#ffffff' component="p">
                &copy; {new Date().getFullYear()} Profspector AI. All rights reserved.
                </Typography>
            </Box>
        </Box>

    )
}
