import { useState } from "react";
import { useEffect } from "react";
import {
  addCommentForPost,
  fetchCommentForPost,
} from "../controller/comment-controller";

function PostComment({ postId }) {
  const [commentList, setCommentList] = useState([]);
  const [commentExpanded, setCommentExpanded] = useState(false);

  function onToggleComment() {
    setCommentExpanded(!commentExpanded);
  }

  function onSubmitComment(e) {
    e.preventDefault();
    const content = e.target["comment-new"].value;
    addCommentForPost(postId, content).then((res) =>
      setCommentList([res, ...commentList])
    );
  }

  useEffect(() => {
    fetchCommentForPost(postId).then((res) => {
      console.log(commentList, res);
      return setCommentList(res);
    });
  }, []);

  return (
    <div className="comment">
      <button onClick={onToggleComment}>
        {commentExpanded ? "Comment ✖" : "Comment ☰"}
      </button>
      {commentExpanded && (
        <>
          <ul className="comment-list">
            {commentList.map((commentItem) => (
              <li className="comment-list-item" key={commentItem.commentId}>
                <span className="comment-item-username">
                  {console.log(commentItem)}
                  {commentItem.username}
                  {": "}
                </span>
                <span className="comment-item-content">
                  {commentItem.content}
                </span>
              </li>
            ))}
          </ul>{" "}
          <form
            action=""
            className="comment-item-input"
            onSubmit={onSubmitComment}
          >
            <label>
              New comments:
              <input type="text" name="comment-new" />
            </label>
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
}

export default PostComment;
