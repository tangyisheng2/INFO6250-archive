/**
 * This method fetches the comment for $postId.
 * @param {String} postId
 * @returns An array of comment item
 */
export function fetchCommentForPost(postId) {
  return fetch(`/api/v1/post/${postId}/comment`)
    .catch((error) => Promise.reject(error))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => Promise.reject(error));
      }
      return response.json();
    });
}
