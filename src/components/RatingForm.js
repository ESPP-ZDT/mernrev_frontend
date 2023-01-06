import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { rateNote } from '../actions/ratingActions';

const RatingForm = ({ noteId }) => {
  const [rating, setRating] = useState(null);
  const dispatch = useDispatch();

  const ratingSubmit = (e) => {
    e.preventDefault();
    if (rating) {
      dispatch(rateNote(noteId, rating));
    }
  };


  return (
    <form onSubmit={ratingSubmit}>
      <label>
        Choose rating:
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default RatingForm;
