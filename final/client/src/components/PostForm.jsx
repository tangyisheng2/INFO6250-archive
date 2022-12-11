import PostFormConstant from "../constants/post-form-constant";
import { PostReducerConstant } from "../constants/post-reducer-constant";

function PostForm({
  postFormInfo,
  dispatchPostFormInfo,
  dispatchPostInfo,
  setErrorMessage,
}) {
  const currentState = postFormInfo.state;

  /**
   * This method take the input change on the input field and update it to the state
   * @param {Event} e Event object of the form
   */
  function onInputChange(e) {
    e.preventDefault();
    const actionObj = {
      type: PostFormConstant.CHANGE,
      payload: { [e.target.name]: e.target.value || "" },
    };
    console.log(actionObj);
    dispatchPostFormInfo(actionObj);
  }

  /**
   * This method submit the form data to the backend.
   * @param {Event} e Event object of the form
   */
  function onSubmitForm(e) {
    e.preventDefault();
    const formBody = {
      title: e.target.title.value,
      content: e.target.content.value,
      cover: e.target.cover?.value || "https://placekitten.com/1600/900",
    };
    switch (currentState) {
      case PostFormConstant.CREATE:
        createPost(formBody).then((res) => {
          console.log(res);
          dispatchPostFormInfo({
            type: postFormInfo.CREATE,
          });
          dispatchPostInfo({
            type: PostReducerConstant.CREATE_POST,
            payload: res,
          });
        });

        break;
      case PostFormConstant.UPDATE:
        const postId = postFormInfo.formInfo.postId;
        updatePost(postId, formBody).then((res) => {
          dispatchPostFormInfo({
            type: PostFormConstant.CREATE,
          });
          dispatchPostInfo({
            type: PostReducerConstant.UPDATE_POST,
            payload: {
              updateField: res,
            },
          });
          console.log({
            type: PostReducerConstant.UPDATE_POST,
            payload: {
              updateField: res,
            },
          });
        });
    }
  }

  /**
   * This function resets all the form stats,
   * including the form working mode and  all the data in input field
   */
  function onResetForm() {
    dispatchPostFormInfo({
      type: PostFormConstant.CLEAR,
    });
  }

  /**
   * This function make an HTTP PUT request to server to create a post.
   * @param {Object} body Query body
   * @returns Post body that it just created
   */
  function createPost(body) {
    return fetch("/api/v1/post", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .catch((error) => Promise.reject(error))
      .then((response) => {
        if (!response.ok) {
          response.json().then(({ error }) => {
            setErrorMessage(error);
            return Promise.reject(error);
          });
        }
        return response.json();
      });
  }

  /**
   * This function make an HTTP POST request to server to update a post.
   * @param {String} postId Post ID to be updated
   * @param {*} body Query Body
   * @returns Post body that it just updated
   */
  function updatePost(postId, body) {
    console.log({ postId, ...body });
    return fetch("/api/v1/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, ...body }),
    })
      .catch((error) => Promise.reject(error))
      .then((response) => {
        if (!response.ok) {
          response.json().then(({ error }) => {
            setErrorMessage(error);
            return Promise.reject(error);
          });
        }
        return response.json();
      });
  }

  return (
    <div className="post-form">
      <form action="" onSubmit={onSubmitForm} onReset={onResetForm}>
        <label htmlFor="">
          Title:{" "}
          <input
            type="text"
            name="title"
            value={postFormInfo.formInfo.title}
            onChange={onInputChange}
            required
          />
        </label>
        <label htmlFor="">
          Content:{" "}
          <input
            type="text"
            name="content"
            value={postFormInfo.formInfo.content}
            onChange={onInputChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </form>
    </div>
  );
}
export default PostForm;
