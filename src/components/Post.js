import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editPost } from "../actions/post.action";
import CommentPost from "./CommentPost";
import Delete from "./Delete";

const Post = ({ post, user }) => {
  const [edit, setEdit] = useState(false);
  const [editMessage, setEditMessage] = useState();
  const dispatch = useDispatch();

  const dateFormater = (date) => {
    let days = Math.floor((new Date() - new Date(date)) / (1000 * 3600 * 24));
    if (days === 0) {
      return "aujourd'hui";
    } else if (days === 1) {
      return "il y a 1 jour";
    } else {
      return "il y a " + days + " jours";
    }
  };

  const handleEdit = () => {
    setEdit(false);

    if (editMessage) {
      dispatch(
        editPost({
          id: post.id,
          message: editMessage,
        })
      );
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="left-part">
          <div className="title">
            <span>{post.author[0]}</span>
            <h2>{post.author}</h2>
          </div>
          <h5>Posté {dateFormater(post.date)}</h5>
        </div>
        {post.authorId === user?.uid && (
          <div className="right-part">
            <span onClick={() => setEdit(!edit)}>
              <i className="fa-solid fa-pen-to-square"></i>
            </span>
            <Delete postId={post.id} />
          </div>
        )}
      </div>
      {edit ? (
        <>
          <textarea
            autoFocus
            defaultValue={editMessage ? editMessage : post.message}
            onChange={(e) => setEditMessage(e.target.value)}
          ></textarea>
          <button className="edit-btn" onClick={() => handleEdit()}>
            Edit
          </button>
        </>
      ) : (
        <p>{editMessage ? editMessage : post.message}</p>
      )}
      <CommentPost post={post} />
    </div>
  );
};

export default Post;
