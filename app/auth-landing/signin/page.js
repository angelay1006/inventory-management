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
import Loading from '../../components/loading';
import {keyframes} from '@mui/system';

const defaultTheme = createTheme();

const gradientAnimation = keyframes`
0% {
    background-position: 0%;
  }
  100% {
    background-position: 100%;
  }
`;

export default function SignInSide() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/home');
    } catch (err) {
      setError('Failed to sign in. Please check your email and password.');
      console.error('Sign in error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

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
            background: 'linear-gradient(90deg, #FFFFFF, #9C9C9C, #F1EBEB)',
            backgroundSize: '300% 300%',
            animation: `${gradientAnimation} 11s alternate infinite`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
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
                <Typography variant="h6" color="black" sx={{textAlign:'center', fontSize: "1rem"}}> simplify, organize, and optimize your stock </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h2"
                color="black"
                sx={{textAlign: 'center' }}
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
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
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
              </Grid>
              <Grid container justifyContent="center" >
                <Copyright sx={{ mt: 5, position:'absolute', justifyContent: 'center', bottom:'2vh' }} />
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
