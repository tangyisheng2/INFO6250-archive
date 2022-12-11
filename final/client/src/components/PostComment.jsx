import { useState } from "react";
import { useEffect } from "react";
import { fetchCommentForPost } from "../controller/comment-controller";

function PostComment({ postId }) {
  const [commentList, setCommentList] = useState([]);
  const [commentExpanded, setCommentExpanded] = useState(false);

  function onToggleComment() {
    setCommentExpanded(!commentExpanded);
  }

  useEffect(() => {
    fetchCommentForPost(postId).then((res) => setCommentList(res));
  }, []);

  return (
    <div className="comment">
      <button onClick={onToggleComment}>
        {commentExpanded ? "Comment ✖" : "Comment ☰"}
      </button>
      {commentExpanded && (
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
        </ul>
      )}
    </div>
  );
}

export default PostComment;
