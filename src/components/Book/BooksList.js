import React from 'react';
import { deleteBooks, readBook } from '../../store/bookSlice';

const BooksList = ({ books, isLoading, dispatch, loggedIn }) => {
  const book = isLoading ? "Loading..." : books.length === 0 ? "No Books Found" : books?.map((book) => {
    return (
      <li key={book.id} className='list-group-item d-flex  justify-content-between align-items-center'>
      <div>{book.title}</div>
      <div className='btn-group' role='group'>
        <button type='button' className='btn btn-primary' disabled={!loggedIn}
        onClick={() => {
          dispatch(readBook(book)).unwrap()
          .then((originalPromiseResult) => {
            console.log(originalPromiseResult);
          })
          .catch((rejectedValueOrSerializedError) => {
            console.log(rejectedValueOrSerializedError);
          }) }} >
          Read
        </button>
        <button type='button' className='btn btn-danger' disabled={!loggedIn}
        onClick={() => { dispatch(deleteBooks(book)).unwrap()
          .then((originalPromiseResult) => {
            console.log(originalPromiseResult);
          })
          .catch((rejectedValueOrSerializedError) => {
            console.log(rejectedValueOrSerializedError);
          }) }}>
          Delete
        </button>
      </div>
    </li>
    )
  })

  return (
    <div>
      <h2>Books List</h2>
      <ul className='list-group'>
        {book}
      </ul>
    </div>
  );
};

export default BooksList;
