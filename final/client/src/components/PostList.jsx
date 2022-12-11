import { PostCard } from "./PostCard";

function PostList({ postInfo, dispatchPostInfo, setErrorMessage }) {
  return (
    <div className="post-list">
      PostList
      <ul className="post-ul">
        {postInfo.map((postInfoItem) => (
          <PostCard
            postInfoItem={postInfoItem}
            dispatchPostInfo={dispatchPostInfo}
            setErrorMessage={setErrorMessage}
            key={postInfoItem.postId}
          />
        ))}
      </ul>
    </div>
  );
}

export default PostList;
