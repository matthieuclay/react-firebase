import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase.config";

export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";
export const ADD_COMMENT = "ADD_COMMENT";

export const getPosts = () => {
  return (dispatch) => {
    return getDocs(collection(db, "posts"))
      .then((res) => {
        dispatch({
          type: GET_POSTS,
          payload: res.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
        });
      })
      .catch((error) => console.error(error));
  };
};

export const addPost = (data) => {
  return (dispatch) => {
    return addDoc(collection(db, "posts"), data)
      .then(() => {
        dispatch({ type: ADD_POST, payload: data });
      })
      .catch((error) => console.error(error));
  };
};

export const editPost = (data) => {
  return (dispatch) => {
    return updateDoc(doc(db, "posts", data.id), { message: data.message })
      .then(() => {
        dispatch({ type: EDIT_POST, payload: { ...data } });
      })
      .catch((error) => console.error(error));
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    return deleteDoc(doc(db, "posts", postId))
      .then(() => {
        dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((error) => console.error(error));
  };
};

export const addComment = (postId, data) => {
  return (dispatch) => {
    return updateDoc(doc(db, "posts", postId), { comments: data })
      .then(() => {
        dispatch({ type: ADD_COMMENT, payload: { postId, data } });
      })
      .catch((error) => console.error(error));
  };
};
