import PostFormConstant from "../constants/post-form-constant";
import { PostReducerConstant } from "../constants/post-reducer-constant";
import { deletePost, updatePost } from "../controller/post-controller";
import PostComment from "./PostComment";

function PostCard({
  postInfoItem,
  dispatchPostInfo,
  dispatchPostFormInfo,
  setErrorMessage,
}) {
  const { postId, userId, title, content, cover, likeCount, createDate } =
    postInfoItem;

  function onLikePost(e) {
    e.preventDefault();
    const body = { likeCount: likeCount + 1 };
    updatePost(postId, body).then((res) => {
      console.log(res);
      const action = {
        type: PostReducerConstant.UPDATE_POST,
        payload: {
          postId,
          updateField: {
            likeCount: res.likeCount,
          },
        },
      };
      dispatchPostInfo(action);
    });
  }

  function onDeletePost(e) {
    deletePost(postId).then((res) => {
      const action = {
        type: PostReducerConstant.DELETE_POST,
        payload: {
          postId: res.postId,
        },
      };
      dispatchPostInfo(action);
    });
  }

  function onEditPost(e) {
    const action = {
      type: PostFormConstant.UPDATE,
      payload: { postId, title, content, cover },
    };
    dispatchPostFormInfo(action);
  }

  return (
    <li className="post-list-item">
      <div className="post-list-item-body">
        <img src={cover} />
        <p>Creator: {userId}</p>
        <h2>{title}</h2>
        <p>{content}</p>
        <PostComment postId={postId} />
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
