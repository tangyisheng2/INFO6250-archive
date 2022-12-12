# INFO 6250 Final Project

This documentation describes the final project of INFO 6250.

## Run

change directory to `/server`, and run `npm run start`

## Goals:

This project builds an blog system to allow user to post their good memoried on the blog and share with other users.

Technical details include:

- Backend:

  - Restful API for user login, logout, register and fetch current user info
    - Log in/out and fetch current user info will require authentication
    - The API will also check if user is admin
  - Restful API for user to fetch all current post, create a new post, edit/update an existing post and delete a post
    - All of these require authentication, except for liking a post
    - User will be authenticated when:
      - They are admin
      - They are not admin but the author of the post
  - Able to comment in post

- Front end
  - Show user info/log in/register page
  - Show post list with the post body, comment section, and the action field
    - Condintional renders the `edit` and `delete` button based on the permission granted to the user
    - You can collapse the comment section

## Technical Detail for real geek

Check [Here](https://documenter.getpostman.com/view/4350306/2s8YzTUMxx#4106d530-160f-49d4-8cc3-912a5c1bdbbe) for the latest API doc.

<!-- **Doc below is deprecated**


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
- View -->
