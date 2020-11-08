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
import { onSignInSubmit } from '../redux/forms/forms.action';
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#041e42',
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function SignIn({ onSignUpClick, handleSubmit, submitting, submitSucceeded, error }) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(true);
  submitSucceeded && !error && history.push('/');
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography className={classes.avatar} style={{ cursor: 'pointer' }} onClick={() => history.push('/')}>
          Bookmate <img src={logo} alt='' style={{ height: '30px' }} />
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <FieldInput
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
          />
          <FieldInput
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
          <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={() => setOpen(true)}
            disabled={submitting}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link variant='body2' color='inherit'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='#' variant='body2' color='inherit' onClick={() => onSignUpClick()}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
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
  onSubmit: (value) => dispatch(onSignInSubmit(value)),
});

const reduxFormComponent = reduxForm({
  form: 'signInForm',
})(SignIn);

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormComponent);
