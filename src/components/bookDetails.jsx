import React from 'react';
import '../view-styles/bookDetails.scss';
import Button from '@material-ui/core/Button';

function BookDetails(props) {
  const {
    book,
    currentTab,
    onclose,
    userData,
    onBookRequest,
    RequestedBook,
    requestedBooks,
    onBookRequestUpdate,
  } = props;
  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='modal-header'>
          <span className='close' onClick={() => onclose()}>
            &times;
          </span>
          <h2>{book.title + ' '}</h2>
          {book.subject}
        </div>
        <div className='modal-body'>
          <div
            style={{
              width: '50%',
              height: '160px',
              boxSizing: 'initial',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '1rem',
            }}
          >
            <img
              style={{ height: '160px', width: '160px' }}
              src={`http://covers.openlibrary.org/b/isbn/${book.isbn || 9780385533225}-L.jpg`}
              alt=''
              onError={(e) => (e.target.src = `http://covers.openlibrary.org/b/isbn/9780385533225-L.jpg`)}
            />
          </div>
          <div>
            <p>
              <b>By {book.author}</b>
            </p>
            <p>
              <b>Publisher </b>
              {book.publisher}
            </p>
            <p>
              <b>Publisher </b>
              {book.publisher}
            </p>
          </div>
        </div>
        <div className='modal-footer'>
          {currentTab === 'All Books' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '15px',
                lineHeight: ' 0.67',
              }}
            >
              {book.available ? (
                <label style={{ color: 'green' }}>Available</label>
              ) : (
                <label style={{ color: 'red' }}>Unavailable</label>
              )}
              <Button
                color='primary'
                onClick={() => onBookRequest(book)}
                disabled={!userData || !book.available || book.ownerId === userData._id}
              >
                Request
              </Button>
            </div>
          )}
          {currentTab === 'Loaned Books' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '15px',
                lineHeight: ' 0.67',
              }}
            >
              <Button
                color='primary'
                onClick={() =>
                  onBookRequestUpdate(
                    requestedBooks.find((requestBook) => requestBook.book._id === book._id)._id,
                    'return'
                  )
                }
                disabled={!userData || book.ownerId === userData._id}
              >
                Return
              </Button>
            </div>
          )}
          {currentTab === 'Book Request' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '15px',
                lineHeight: ' 0.67',
              }}
            >
              {RequestedBook ? (
                <div>
                  {requestedBooks.find((requestBook) => requestBook.book._id === book._id).requestStatus}
                  <Button
                    color='secondary'
                    onClick={() => onBookRequestUpdate(book._id, 'cancel')}
                    disabled={!userData || !book.available}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    color='primary'
                    onClick={() =>
                      onBookRequestUpdate(
                        requestedBooks.find((requestBook) => requestBook.book._id === book._id)._id,
                        'approve'
                      )
                    }
                    disabled={!userData || !book.available}
                  >
                    Approve
                  </Button>
                  <Button
                    color='secondary'
                    onClick={() =>
                      onBookRequestUpdate(
                        requestedBooks.find((requestBook) => requestBook.book._id === book._id)._id,
                        'reject'
                      )
                    }
                    disabled={!userData || !book.available}
                  >
                    Reject
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default BookDetails;
