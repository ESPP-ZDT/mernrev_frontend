import {
  COMMENTS_LIST_REQUEST,
  COMMENTS_LIST_SUCCESS,
  COMMENTS_LIST_FAIL,
  COMMENTS_CREATE_REQUEST,
  COMMENTS_CREATE_SUCCESS,
  COMMENTS_CREATE_FAIL,
  COMMENTS_UPDATE_REQUEST,
  COMMENTS_UPDATE_SUCCESS,
  COMMENTS_UPDATE_FAIL,
  COMMENTS_DELETE_REQUEST,
  COMMENTS_DELETE_SUCCESS,
  COMMENTS_DELETE_FAIL,
} from "../constants/commentConstants";
import axios from "axios";

export const fetchComments = (noteId) => async (dispatch) => {
  try {
    dispatch({
      type: COMMENTS_LIST_REQUEST,
    });
    //console.log(noteId)
    const { data } = await axios.get(`api/comments/${noteId}`);
    console.log("Fetched comments", data);
    dispatch({
      type: COMMENTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: COMMENTS_LIST_FAIL,
      payload: message,
    });
  }
};


export const createComment =
  (content, noteId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMMENTS_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "api/comments/create",
        {
          content,
          noteId,
        },
        config
      );

      dispatch({
        type: COMMENTS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: COMMENTS_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateComment =
  (commentId, content) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMMENTS_UPDATE_REQUEST,
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
        `api/comments/${commentId}`,
        { content },
        config
      );

      dispatch({
        type: COMMENTS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: COMMENTS_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteComment = (commentId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMMENTS_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`api/comments/${commentId}`, config);

    dispatch({
      type: COMMENTS_DELETE_SUCCESS,
      payload: commentId,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: COMMENTS_DELETE_FAIL,
      payload: message,
    });
  }
};
