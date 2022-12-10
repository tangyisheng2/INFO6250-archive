import { PostReducerConstant } from "../constants/post-reducer-constant";

function PostCard({ postInfoItem, dispatchPostInfo }) {
  console.log(postInfoItem);
  const { postId, userId, title, content, cover, likeCount, createDate } =
    postInfoItem;

  function onLikePost(e) {
    const action = {
      type: PostReducerConstant.UPDATE_POST,
      payload: {
        postId,
        updateField: { likeCount: likeCount + 1 },
      },
    };
    dispatchPostInfo(action);
  }

  function onDeletePost(e) {
    const action = {
      type: PostReducerConstant.DELETE_POST,
      payload: {
        postId,
      },
    };
    dispatchPostInfo(action);
  }

  function onEditPost(e) {
    const action = {
      type: PostReducerConstant.UPDATE_POST,
      payload: {
        postId,
        updateField: { title: `${title}-edited` },
      },
    };
    dispatchPostInfo(action);
  }

  return (
    <li className="post-list-item">
      <div className="post-list-item-body">
        <img src={cover} />
        <p>Creator: {userId}</p>
        <h2>{title}</h2>
        <p>{content}</p>
        <div className="action-field">
          <span className="like-count">
            <button className="like-button" onClick={onLikePost}>
              Like
            </button>
            {likeCount}
          </span>
          <button className="delete-button" onClick={onDeletePost}>
            Delete
          </button>
          <button className="edit-button" onClick={onEditPost}>
            Edit
          </button>
        </div>
      </div>
    </li>
  );
}

export { PostCard };
