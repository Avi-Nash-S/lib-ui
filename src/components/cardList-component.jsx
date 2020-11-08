import React from 'react';
import CardComponent from '../components/card-component';

export default function CardListComponent({ books, isLoading, history, onFormEdit }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className='lp-container'>
        {books &&
          books.map((book, index) => <CardComponent book={book} isLoading={isLoading} key={index} history={history} />)}
      </div>
    </div>
  );
}
