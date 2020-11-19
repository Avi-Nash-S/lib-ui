import React from 'react';
import CardComponent from '../components/card-component';

export default function CardListComponent({ books, isLoading, history, currentTab, userData }) {
  console.log('User : ', userData);
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className='lp-container'>
        {books &&
          currentTab === 'Your Books' &&
          userData &&
          books.map(
            (book, index) =>
              book.ownerId === userData._id && (
                <CardComponent book={book} isLoading={isLoading} key={index} history={history} />
              )
          )}
        {currentTab === 'Your Books' && !userData && <span>Please Login to see/add books!</span>}
        {books &&
          currentTab === 'All Books' &&
          books.map((book, index) => <CardComponent book={book} isLoading={isLoading} key={index} history={history} />)}
        {currentTab === 'Book Request' &&
          [].map((book, index) => <CardComponent book={book} isLoading={isLoading} key={index} history={history} />)}
      </div>
    </div>
  );
}
