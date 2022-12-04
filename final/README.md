# INFO 6250 Final Project

This documentation describes the final project of INFO 6250.

Goals:

- Backend:

  - Log in, log out, user info
  - Able to post, edit, and delete article
  - Able to Like the post
  - Able to comment in current post

- Front end
  - Show login form
  - Show post along with Like buttom
    - Probably have a detailed post page?
  - Show comment field

## Technical Detail

- Model (in `storage.js`):
  - sessions: `{sessionId: userId}`
    - Sessions handles all the current active session. And user `userId` to store more info than just username
  - user: `{userId: {username, postId[], commentId[], isAdmin: false}}`
    - user store all the user related info, including: username, user's post, user's comment, and if user is an admin
  - post: `{postId: {postId: userId, title, content, cover}}`
    - post object stores all the post on the website: it used the postId as the key, userId to identify the author, title and content to store the body of the post
  - commentForPost: `{postId: {commentId: content, user}}`
    - commentForPost sotres the comments for a specific post, the key is postId, the commentId is the id for the post, and content is the body of the post, userId is the author of the post
- Controller
  - Post
    - getPost: Require auth, this will fetch all the post from storage.post
    - addPost: Require auth, the process is as follows
      - Generate a random `postId`
      - Get `userId` from `sid`
      - Get post `title`, `content` from JSON body
      - Update `storage.post`
      - return the updated post
    - updatePost: Require auth and need to be the author/admin to modify the post. The process as follows:
      - Front-end send the updated post `title`, `content`
      - Update `storage.post`
      - return the updated post
    - deletePost: Require auth and need to be the author/admin to delete the post. The process as follows:
      - `delete storage.post[postId]`
- View
