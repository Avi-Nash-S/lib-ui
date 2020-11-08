import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isbn: '',
      available: false,
    };
  }
  handleSbnChange = (event) => {
    console.log('sbn : ', event.target.value);
    this.setState({
      isbn: event.target.value,
    });
  };
  handleAvailabilityChange = (event) => {
    let temp = event.target.value === 'Yes' ? true : false;
    console.log('avaialble : ', temp);
    this.setState({
      available: temp,
    });
  };
  handleAddBook = () => {
    const { isbn, available } = this.state;
    this.props.handleAddBook({ isbn: isbn, available: available, ownerId: '007' });
  };
  render() {
    const { openAddBook, handleClose } = this.props;
    return (
      <div>
        <Dialog
          open={openAddBook}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{'Add Book'}</DialogTitle>
          <DialogContent>
            <TextField
              id='outlined-basic'
              label='ISBN'
              variant='outlined'
              helperText='Required'
              value={this.state.isbn}
              onChange={this.handleSbnChange}
            />
            <br />
            <TextField
              id='outlined-select-currency'
              select
              label='Available'
              //   value={this.state.available}
              onChange={this.handleAvailabilityChange}
              helperText='Please select availability'
              variant='outlined'
            >
              {['Yes', 'No'].map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
            <br />
            {/* <TextField id='outlined-basic' label='ISBN' variant='outlined' /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleAddBook} color='primary' autoFocus>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddBook;
