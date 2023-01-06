import {
    NOTES_RATE_FAIL,
    NOTES_RATE_REQUEST,
    NOTES_RATE_SUCCESS,
  } from "../constants/noteConstants";
  import axios from "axios";
  
  export const rateNote = (noteId, rating) => async (dispatch, getState) => {
    try {
      dispatch({
        type: NOTES_RATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.put(
        `api/rating/${noteId}/rating`,
        {
          userId: userInfo._id,
          rating,
        },
        config
      );
  
      dispatch({
        type: NOTES_RATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: NOTES_RATE_FAIL,
        payload: message,
      });
    }
  };
  

  