import React, { Fragment } from 'react';

const BookInfo = ({ bookInfo, loggedIn }) => {
  return (
    <Fragment>
      <h2>Book Details</h2>
      {(bookInfo && loggedIn) ?
      <div className='mt-4'>
        <p className='font-weight-bold'>Title: {bookInfo?.title}</p>
        <p className='font-weight-light'>Description: {bookInfo?.description}</p>
        <p className='font-italic'>Price: {bookInfo?.price}</p>
      </div>
      :
      <div className='alert alert-secondary' role='alert'>
        There is no post selected yet. Please select!
      </div>
    }
    </Fragment>
  );
};

export default BookInfo;
