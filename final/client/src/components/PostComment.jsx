import { useState } from "react";
import { useEffect } from "react";
import {
  addCommentForPost,
  fetchCommentForPost,
} from "../controller/comment-controller";

function PostComment({ postId }) {
  const [commentList, setCommentList] = useState([]);
  const [commentExpanded, setCommentExpanded] = useState(false);
  const [commentTextarea, setCommentTextarea] = useState("");

  function onToggleComment() {
    setCommentExpanded(!commentExpanded);
  }

  function onSubmitComment(e) {
    e.preventDefault();
    const content = e.target["comment-new"].value;
    addCommentForPost(postId, content).then((res) =>
      setCommentList([res, ...commentList])
    );
    setCommentTextarea("");
  }

  function onChangeComment(e) {
    setCommentTextarea(e.target.value);
  }

  useEffect(() => {
    fetchCommentForPost(postId).then((res) => setCommentList(res));
  }, []);

  return (
    <div className="comment">
      <button
        className={`comment-button ${commentExpanded ? "expanded" : ""}`}
        onClick={onToggleComment}
      >
        {commentExpanded ? "Comment ✖" : "Comment ☰"}
      </button>
      {commentExpanded && (
        <div className="comment-content">
          <ul className="comment-list">
            {commentList.map((commentItem) => (
              <li className="comment-list-item" key={commentItem.commentId}>
                <span className="comment-item-username">
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
              <textarea
                type="text"
                name="comment-new"
                rows={5}
                onChange={onChangeComment}
                value={commentTextarea}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PostComment;
