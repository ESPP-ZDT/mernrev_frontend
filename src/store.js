import {
  createStore,
  combineReducers,
  applyMiddleware
} from "redux";
import thunk from "redux-thunk";
import {
  composeWithDevTools
} from "redux-devtools-extension";
import { rateNoteReducer } from "./reducers/ratingReducers";

import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer
} from "./reducers/userReducers";
import {
  noteCreateReducer,
  noteDeleteReducer,
  noteLikeReducer,
  noteListReducer,
  noteUpdateReducer
} from "./reducers/noteReducers";
import {
  commentListReducer,
  commentCreateReducer,
  commentUpdateReducer,
  commentDeleteReducer
} from "./reducers/commentReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  noteList: noteListReducer,
  noteCreate: noteCreateReducer,
  noteUpdate: noteUpdateReducer,
  noteDelete: noteDeleteReducer,
  userUpdate: userUpdateReducer,
  noteLike: noteLikeReducer,
  commentsList: commentListReducer,
  commentCreate: commentCreateReducer,
  commentUpdate: commentUpdateReducer,
  commentDelete: commentDeleteReducer,
  rating: rateNoteReducer,  // <-- add the rating reducer here
});


const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage
  },

};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
