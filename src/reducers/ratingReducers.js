import {
    r,
    NOTES_RATE_SUCCESS,
    NOTES_RATE_FAIL,
    NOTES_RATE_REQUEST,
  } from "../constants/noteConstants";


const initialState = {};

export const rateNoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTES_RATE_REQUEST:
      return { loading: true };
    case NOTES_RATE_SUCCESS:
      return { loading: false, success: true, rating: action.payload.meanRating };
    case NOTES_RATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
