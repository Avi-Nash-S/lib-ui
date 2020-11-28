import React from 'react';
import CardComponent from '../components/card-component';

export default function CardListComponent({ books, isLoading, history, currentTab, userData, onBookImageClick }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
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
        {currentTab === 'Book Request' &&
          [].map((book, index) => (
            <CardComponent
              book={book}
              isLoading={isLoading}
              key={index}
              history={history}
              currentTab={'Book Request'}
              onBookImageClick={onBookImageClick}
            />
          ))}
      </div>
    </div>
  );
}
