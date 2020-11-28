import React from 'react';
import CardComponent from '../components/card-component';

export default function CardListComponent({
  books,
  isLoading,
  history,
  currentTab,
  userData,
  onBookImageClick,
  requestedBooks,
}) {
  return (
    <div>
      <div className='lp-container'>
        {books &&
          currentTab === 'Your Books' &&
          userData &&
          books.map(
            (book, index) =>
              book.ownerId === userData._id && (
                <CardComponent
                  book={book}
                  isLoading={isLoading}
                  key={index}
                  history={history}
                  onBookImageClick={onBookImageClick}
                  currentTab={'Your Books'}
                />
              )
          )}
        {currentTab === 'Your Books' && !userData && <h3>Please Login to see/add books!</h3>}
        {books &&
          currentTab === 'All Books' &&
          books.map((book, index) => (
            <CardComponent
              book={book}
              isLoading={isLoading}
              key={index}
              history={history}
              currentTab={'All Books'}
              onBookImageClick={onBookImageClick}
            />
          ))}
        <div style={{ display: 'block' }}>
          {currentTab === 'Book Request' && !userData && <h3>Please Login to see book requests!</h3>}
          <div>
            {currentTab === 'Book Request' && userData && <h3>Requested books</h3>}
            <div style={{ display: 'flex' }}>
              {currentTab === 'Book Request' &&
                userData &&
                requestedBooks.map(
                  (book, index) =>
                    book.requestedBy._id === userData._id && (
                      <CardComponent
                        book={book.book}
                        isLoading={isLoading}
                        key={index}
                        history={history}
                        currentTab={'Book Request'}
                        onBookImageClick={onBookImageClick}
                        RequestedBook={true}
                      />
                    )
                )}
            </div>
          </div>
          <div>
            {currentTab === 'Book Request' && userData && <h3>Pending Approval</h3>}
            <div style={{ display: 'flex' }}>
              {currentTab === 'Book Request' &&
                userData &&
                requestedBooks.map(
                  (book, index) =>
                    book.book.ownerId === userData._id && (
                      <CardComponent
                        book={book.book}
                        isLoading={isLoading}
                        key={index}
                        history={history}
                        currentTab={'Book Request'}
                        onBookImageClick={onBookImageClick}
                      />
                    )
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
