'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../../components/auth-landing/copyright';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase.js';

import Image from 'next/image';
import '../../globals.css';
import Logo from '../../components/auth-landing/Logo.svg';

const defaultTheme = createTheme();


export default function SignInSide() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/home');
    } catch (err) {
      setError('Failed to sign in. Please check your email and password.');
      console.error('Sign in error:', err);
    }
  };



  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        {/* landing page with title */}
        <Grid
          item
          xs={12}
          sm={6}
          md={7}
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: { xs: '65%', sm: '85%' },
            overflow: 'hidden',
            pt: { xs: 2, sm: 4 }
          }}
        >
          <Grid
            container
            direction="column"
            spacing={2}
            sx={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Grid item>
              <Box sx={{ pb: '4vh' }}>
                <Image src={Logo} alt="logo" width={100} height={100} />
              </Box>
            </Grid>
            <Grid item>
              <Typography variant="h6" color="#151439" sx={{ textAlign: 'center', fontSize: "1rem", fontFamily: "'DM Sans', sans-serif" }}> simplify, organize, and optimize your stock </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h2"
                color="#1E0E62"
                sx={{ textAlign: 'center', fontFamily: "'DM Sans', sans-serif" }}
              >
                Inventory Manager
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* sign-in side */}
        <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              overflow: 'hidden',
              px: 4,
              py: 8
            }}
          >
            
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="/auth-landing/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>


                <Grid item sx={{
                  mt: '2vh', 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  width: '100%',
                }}>
                  <Copyright sx={{paddingTop: '3vh'}} />
                </Grid>
              </Grid>

            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
