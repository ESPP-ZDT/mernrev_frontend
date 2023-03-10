import {
  NOTES_CREATE_FAIL,
  NOTES_CREATE_REQUEST,
  NOTES_CREATE_SUCCESS,
  NOTES_DELETE_FAIL,
  NOTES_DELETE_REQUEST,
  NOTES_DELETE_SUCCESS,
  NOTES_LIST_FAIL,
  NOTES_LIST_REQUEST,
  NOTES_LIST_SUCCESS,
  NOTES_UPDATE_FAIL,
  NOTES_UPDATE_REQUEST,
  NOTES_UPDATE_SUCCESS,
  LIKE_NOTE_SUCCESS,
  LIKE_NOTE_REQUEST,
  LIKE_NOTE_FAIL,
} from "../constants/noteConstants";
import axios from "axios";
import uri from '../uri';

export const listUserNotes = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: NOTES_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(uri+`/api/notes/usernotes`, config);

    dispatch({
      type: NOTES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: NOTES_LIST_FAIL,
      payload: message,
    });
  }
};

export const listAllNotes = () => async (dispatch) => {
  try {
    console.log("##start: ", );
    // const uri = "https://mernrev-api.onrender.com";
    dispatch({
      type: NOTES_LIST_REQUEST,
    });
    console.log("##URI: ", uri);

    const { data } = await axios.get(uri+"/api/notes");
    console.log("##data: ", data)
    dispatch({
      type: NOTES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("##error: ", error);
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: NOTES_LIST_FAIL,
      payload: message,
    });
  }
};

export const createNoteAction =
  (title, content, category, pic) => async (dispatch, getState) => {
    try {
      dispatch({
        type: NOTES_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        uri+`/api/notes/create`,
        { title, content, category, pic},
        config
      );

      dispatch({
        type: NOTES_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: NOTES_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateNoteAction =
  (id, title, content, category, pic) => async (dispatch, getState) => {
    try {
      dispatch({
        type: NOTES_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        uri+`/api/notes/${id}`,
        { title, content, category, pic },
        config
      );

      dispatch({
        type: NOTES_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: NOTES_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteNoteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NOTES_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(uri+`/api/notes/${id}`, config);

    dispatch({
      type: NOTES_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: NOTES_DELETE_FAIL,
      payload: message,
    });
  }
};

export const likeNote = (noteId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIKE_NOTE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const data = localStorage.getItem("userInfo");

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Send a PUT request to the backend to update the likes of the specific note
    const res = await axios.patch(
      uri+`/api/notes/${noteId}/like`,
      { userId: data._id },
      config
    );
    dispatch({ type: LIKE_NOTE_SUCCESS, payload: res.data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: LIKE_NOTE_FAIL,
      payload: message,
    });
  }
};
