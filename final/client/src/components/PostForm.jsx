import PostFormConstant from "../constants/post-form-constant";
import { PostReducerConstant } from "../constants/post-reducer-constant";
import { updatePost, createPost } from "../controller/post-controller";
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
              postId,
              updateField: res,
            },
          });
        });
        break;
      default:
        break;
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

  function getFormTitle() {
    switch (currentState) {
      case PostFormConstant.CREATE:
        return <h2 className="post-form-header">Create New Post</h2>;
      case PostFormConstant.UPDATE:
        return <h2 className="post-form-header">Update Post</h2>;
      default:
        break;
    }
  }

  return (
    <div className="post-form">
      <form action="" onSubmit={onSubmitForm} onReset={onResetForm}>
        {getFormTitle()}
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
          <textarea
            type="text"
            name="content"
            value={postFormInfo.formInfo.content}
            onChange={onInputChange}
            rows={5}
            required
          />
        </label>
        <label htmlFor="">
          Cover Image URL:{" "}
          <input
            type="text"
            name="cover"
            value={postFormInfo.formInfo.cover}
            onChange={onInputChange}
            required
          />
        </label>
        <div className="post-form-action">
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </div>
      </form>
    </div>
  );
}
export default PostForm;
