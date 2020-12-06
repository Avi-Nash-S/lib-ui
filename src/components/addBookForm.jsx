import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../view-styles/addBookForm.scss';

class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isbn: '',
      title: '',
      author: '',
      publisher: '',
      subject: '',
    };
  }
  // when entering values in add new book form
  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  // when adding a new book
  handleAddBook = () => {
    const { isbn, title, author, publisher, subject } = this.state;
    if (!isbn || !title || !author || !publisher || !subject) {
      alert('Please provide all the input');
    } else {
      this.props.handleAddBook({
        isbn: isbn,
        available: true,
        title: title,
        author: author,
        publisher: publisher,
        subject: subject,
      });
    }
  };
  render() {
    const { openAddBook, handleClose, loading } = this.props;
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
            <FormControl>
              <TextField
                id='outlined-basic'
                name='isbn'
                label='ISBN'
                variant='outlined'
                value={this.state.isbn}
                required
                onChange={this.handleInputChange}
              />
              <br />
              <TextField
                id='outlined-basic'
                name='title'
                label='Title'
                variant='outlined'
                value={this.state.title}
                required
                onChange={this.handleInputChange}
              />
              <br />
              <TextField
                id='outlined-basic'
                name='author'
                label='Author'
                variant='outlined'
                value={this.state.author}
                required
                onChange={this.handleInputChange}
              />
              <br />
              <TextField
                id='outlined-basic'
                name='publisher'
                label='Publisher'
                variant='outlined'
                value={this.state.publisher}
                required
                onChange={this.handleInputChange}
              />
              <br />
              <TextField
                id='outlined-basic'
                name='subject'
                label='Subject'
                variant='outlined'
                value={this.state.subject}
                required
                onChange={this.handleInputChange}
              />
              {/* <br />
              <TextField
                id='outlined-select-currency'
                select
                label='Available'
                //   value={this.state.available}
                required
                onChange={this.handleAvailabilityChange}
                variant='outlined'
              >
                {['Yes', 'No'].map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </TextField> */}
            </FormControl>
            <br />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleAddBook} color='primary' autoFocus>
              {loading ? <CircularProgress style={{ color: '#fff' }} /> : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddBook;
