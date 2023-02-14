import React, { Fragment, useEffect } from 'react';
import BookInfo from './BookInfo';
import BooksList from './BooksList';
import { getBooks, clearBook } from '../../store/bookSlice';
import { useDispatch, useSelector } from 'react-redux';
import './book.css';

const PostContainer = () => {
  const dispatch = useDispatch();
  const { books, isLoading, bookInfo } = useSelector((state) => state.book);
  const { loggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(clearBook());
  }, [dispatch, loggedIn]);

  return (
    <Fragment>
      <hr className='my-5' />
      <div className='row'>
        <div className='col'>
          <BooksList books={books} isLoading={isLoading} dispatch={dispatch} loggedIn={loggedIn} />
        </div>
        <div className='col side-line'>
          <BookInfo bookInfo={bookInfo} loggedIn={loggedIn} />
        </div>
      </div>
    </Fragment>
  );
};

export default PostContainer;
