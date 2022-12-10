import { PostCard } from "./PostCard";

function PostList({ postInfo, dispatchPostInfo }) {
  console.log(postInfo);
  return (
    <div className="post-list">
      PostList
      <ul className="post-ul">
        {postInfo.map((postInfoItem) => (
          <PostCard
            postInfoItem={postInfoItem}
            dispatchPostInfo={dispatchPostInfo}
            key={postInfoItem.postId}
          />
        ))}
      </ul>
    </div>
  );
}

export default PostList;
