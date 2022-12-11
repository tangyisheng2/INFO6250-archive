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
   * @param {Event} e Event Object triggered by input change in the input field
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
        const postId = postFormInfo.postId;
        updatePost(postId, formBody);
        dispatchPostFormInfo({
          type: postFormInfo.CREATE,
        });
    }
  }

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
  function updatePost(postId, body) {
    fetch("/api/v1/post", {
      method: "PUT",
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
      })
      .then((res) => {
        console.log(res);
      });
  }

  return (
    <div className="post-form">
      <form action="" onSubmit={onSubmitForm}>
        <label htmlFor="">
          Title:{" "}
          <input
            type="text"
            name="title"
            value={postFormInfo.title}
            onChange={onInputChange}
          />
        </label>
        <label htmlFor="">
          Content:{" "}
          <input
            type="text"
            name="content"
            value={postFormInfo.content}
            onChange={onInputChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default PostForm;
