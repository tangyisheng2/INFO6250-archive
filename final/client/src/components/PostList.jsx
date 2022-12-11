import { PostCard } from "./PostCard";

function PostList({
  userInfo,
  postInfo,
  dispatchPostInfo,
  dispatchPostFormInfo,
  setErrorMessage,
}) {
  const requestLoginView = (
    <div className="post-list">
      <p className="post-item warning">Please Log in to view the post.</p>
    </div>
  );

  const postView = (
    <div className="post-list">
      PostList
      <ul className="post-ul">
        {postInfo.map((postInfoItem) => (
          <PostCard
            userInfo={userInfo}
            postInfoItem={postInfoItem}
            dispatchPostInfo={dispatchPostInfo}
            dispatchPostFormInfo={dispatchPostFormInfo}
            setErrorMessage={setErrorMessage}
            key={postInfoItem.postId}
          />
        ))}
      </ul>
    </div>
  );

  return userInfo?.userId ? postView : requestLoginView;
}

export default PostList;
