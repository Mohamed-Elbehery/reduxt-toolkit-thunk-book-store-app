import React, { useRef } from 'react';
import { addBooks } from '../store/bookSlice';
import { useDispatch, useSelector } from 'react-redux';

const Addform = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.auth);

  //refs
  const title = useRef(null);
  const price = useRef(null);
  const description = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addBooks({title: title.current.value, description: description.current.value, price: price.current.value}));
    title.current.value = description.current.value = price.current.value = null;
  }

  return (
    <div className='row'>
      <div className='col-6 offset-3 mt-3'>
        <h2>Insert Book</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input ref={title} type='text' className='form-control' id='title' required />
          </div>
          <div className='form-group'>
            <label htmlFor='price'>Price</label>
            <input ref={price} type='number' className='form-control' id='price' required />
          </div>
          <div className='form-group'>
            <label htmlFor='Description'>Description</label>
            <textarea
              ref={description}
              className='form-control'
              id='Description'
              rows='3'
              required
            ></textarea>
          </div>
          <button type='submit' className='btn btn-primary' disabled={!loggedIn}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addform;
