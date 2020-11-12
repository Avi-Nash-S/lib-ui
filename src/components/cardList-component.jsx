import React from 'react';
import CardComponent from '../components/card-component';

export default function CardListComponent({ books, isLoading, history, currentTab }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className='lp-container'>
        {books &&
          currentTab === 'Your Books' &&
          books.map(
            (book, index) =>
              book.ownerId === '007' && (
                <CardComponent book={book} isLoading={isLoading} key={index} history={history} />
              )
          )}
        {books &&
          currentTab === 'All Books' &&
          books.map((book, index) => <CardComponent book={book} isLoading={isLoading} key={index} history={history} />)}
        {currentTab === 'Book Request' &&
          [].map((book, index) => <CardComponent book={book} isLoading={isLoading} key={index} history={history} />)}
      </div>
    </div>
  );
}
