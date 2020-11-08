import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from '../static/library.png';
import { useHistory } from 'react-router-dom';
import FieldInput from '../components/fieldInput-component';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { onSignUpSubmit } from '../redux/forms/forms.action';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='#'>
        Bookmate
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    backgroundColor: '#041e42',
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function SignUp({ onSignInClick, handleSubmit, submitSucceeded, error }) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(true);
  submitSucceeded && onSignInClick();
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography className={classes.avatar} style={{ cursor: 'pointer' }} onClick={() => history.push('/')}>
          Bookmate <img src={logo} alt='' style={{ height: '30px' }} />
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FieldInput
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First Name'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FieldInput
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='lname'
              />
            </Grid>
            <Grid item xs={12}>
              <FieldInput
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <FieldInput
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value='allowExtraEmails' color='primary' />}
                label='Subscribe for updates.'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            onClick={() => setOpen(true)}
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='#' variant='body2' color='inherit' onClick={() => onSignInClick()}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      {error && (
        <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
          <Alert severity='warning'>{error}</Alert>
        </Snackbar>
      )}
    </Container>
  );
}
const mapStateToProps = (storeState) => ({
  userDb: storeState.data.userDb,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (value) => dispatch(onSignUpSubmit(value)),
});

const reduxFormComponent = reduxForm({
  form: 'SignUp',
})(SignUp);

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormComponent);
