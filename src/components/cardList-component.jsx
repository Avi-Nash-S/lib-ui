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
  showfilteredBooks,
  filteredBookData,
}) {
  console.log('filtered books', filteredBookData);
  console.log('show filtered data : ', showfilteredBooks);
  console.log('current Tab : ', currentTab);
  return (
    <div>
      <div className='lp-container'>
        {books &&
          currentTab === 'All Books' &&
          !showfilteredBooks &&
          books.map((book, index) => (
            <CardComponent
              book={book}
              isLoading={isLoading}
              key={index}
              history={history}
              onBookImageClick={onBookImageClick}
              currentTab={'All Books'}
            />
          ))}
        {showfilteredBooks &&
          currentTab === 'All Books' &&
          filteredBookData.lenght &&
          filteredBookData.map((book, index) => (
            <CardComponent
              book={book}
              isLoading={isLoading}
              key={index}
              history={history}
              onBookImageClick={onBookImageClick}
              currentTab={'All Books'}
            />
          ))}{' '}
        {currentTab === 'All Books' && showfilteredBooks && filteredBookData.lenght === 0 && (
          <span>No results found!</span>
        )}
        {/* Your book section */}
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
        <div style={{ display: 'block' }}>
          {currentTab === 'Book Request' && !userData && <h3>Please Login to see book requests!</h3>}
          <div>
            {currentTab === 'Book Request' && userData && <h3>Requested books</h3>}
            <div style={{ display: 'flex' }}>
              {currentTab === 'Book Request' &&
                userData &&
                requestedBooks.map(
                  (book, index) =>
                    book.requestedBy._id === userData._id &&
                    (book.requestStatus === 'requested' || book.requestStatus === 'rejected') && (
                      <CardComponent
                        book={book.book}
                        isLoading={isLoading}
                        key={index}
                        history={history}
                        currentTab={'Book Request'}
                        onBookImageClick={onBookImageClick}
                        RequestedBook={true}
                        RequestId={book._id}
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
                    book.book.ownerId === userData._id &&
                    book.requestStatus === 'requested' && (
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
        {currentTab === 'Loaned Books' && !userData && <h3>Please Login to see loaned books!</h3>}
        <div>
          {/* {currentTab === 'Loaned Books' && userData && <h3>Requested books</h3>} */}
          <div style={{ display: 'flex' }}>
            {currentTab === 'Loaned Books' &&
              userData &&
              requestedBooks.map(
                (book, index) =>
                  book.requestedBy._id === userData._id &&
                  book.requestStatus === 'approved' && (
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
      </div>
    </div>
  );
}
