import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from '../static/library.png';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    fontSize: '30px',
    fontWeight: '600',
    color: '#23466c',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const { loading } = props;
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography className={classes.avatar} style={{ cursor: 'pointer' }}>
          Bookmate <img src={logo} alt='' style={{ height: '30px' }} />
        </Typography>
        <Grid container spacing={2} style={{ margin: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              value={props.firstName}
              autoComplete='fname'
              name='firstName'
              variant='outlined'
              required
              fullWidth
              id='firstName'
              label='First Name'
              autoFocus
              onChange={props.onInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={props.lastName}
              variant='outlined'
              required
              fullWidth
              id='lastName'
              label='Last Name'
              name='lastName'
              autoComplete='lname'
              onChange={props.onInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={props.email}
              variant='outlined'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              onChange={props.onInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={props.userName}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='userName'
              label='Username or Email'
              name='userName'
              autoComplete='username'
              autoFocus
              onChange={props.onInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={props.password}
              onChange={props.onInputChange}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
          </Grid>
        </Grid>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
          onClick={props.onSignup}
        >
          {loading ? <CircularProgress style={{ color: '#fff' }} /> : 'Sign Up'}
        </Button>
        <Grid container justify='flex-end'>
          <Grid item>
            <Link href='#' variant='body2' onClick={() => props.onSignInClick()}>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
