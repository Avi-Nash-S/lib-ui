import React from 'react';
import '../view-styles/bookDetails.scss';

function BookDetails(props) {
  console.log('book : ', props.book);
  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='modal-header'>
          <span className='close' onClick={() => props.onclose()}>
            &times;
          </span>
          <h2>{props.book.title + ' '}</h2>
          {props.book.subject}
        </div>
        <div className='modal-body'>
          <div
            style={{
              width: '100%',
              height: '160px',
              boxSizing: 'initial',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img
              style={{ height: '160px', width: '160px' }}
              src={`http://covers.openlibrary.org/b/isbn/${props.book.isbn || 9780385533225}-L.jpg`}
              alt=''
              onError={(e) => (e.target.src = `http://covers.openlibrary.org/b/isbn/9780385533225-L.jpg`)}
            />
          </div>
          <div>
            <p>
              <b>By {props.book.author}</b>
            </p>
            <p>
              <b>Publisher </b>
              {props.book.publisher}
            </p>
          </div>
        </div>
        <div className='modal-footer'>
          <h3>{props.book.available ? 'Available' : 'Unavailable'}</h3>
        </div>
      </div>
    </div>
  );
}
export default BookDetails;
