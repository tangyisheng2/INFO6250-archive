import PostFormConstant from "../constants/post-form-constant";
import { PostReducerConstant } from "../constants/post-reducer-constant";
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
    const body = { userId, postId, likeCount: likeCount + 1 };
    fetch("/api/v1/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .catch((error) => {
        return Promise.reject(error);
      })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(({ error }) => {
            setErrorMessage(error);
            return Promise.reject({ error });
          });
        }
        return response.json();
      })
      .then((res) => {
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
    const body = { postId };
    fetch("/api/v1/post", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .catch((error) => {
        return Promise.reject(error);
      })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(({ error }) => {
            setErrorMessage(error);
            return Promise.reject({ error });
          });
        }
        return response.json();
      })
      .then((res) => {
        const action = {
          type: PostReducerConstant.DELETE_POST,
          payload: {
            res,
          },
        };
        dispatchPostInfo(action);
      });

    const action = {
      type: PostReducerConstant.DELETE_POST,
      payload: {
        postId,
      },
    };
    dispatchPostInfo(action);
  }

  function onEditPost(e) {
    // TODO: FINISH THIS
    // const action = {
    //   type: PostReducerConstant.UPDATE_POST,
    //   payload: {
    //     postId,
    //     updateField: { title: `${title}-edited` },
    //   },
    // };
    // dispatchPostInfo(action);
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
