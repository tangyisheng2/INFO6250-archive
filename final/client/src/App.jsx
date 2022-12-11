import "./App.css";
import Header from "./components/Header";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import User from "./components/User";
import Footer from "./components/Footer";
import { useState } from "react";
import { useReducer } from "react";
import postReducer from "./reducer/post-reducer";
import postFormReducer from "./reducer/post-form-reducer";
import { useEffect } from "react";
import { PostReducerConstant } from "./constants/post-reducer-constant";
import PostFormConstant from "./constants/post-form-constant";

function App() {
  const [userInfo, setUserinfo] = useState({});
  const [postInfo, dispatchPostInfo] = useReducer(postReducer, []);
  const [postFormInfo, dispatchPostFormInfo] = useReducer(postFormReducer, {
    state: PostFormConstant.CREATE,
    formInfo: {
      title: "",
      content: "",
      cover: "",
    },
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch Current Session User
    fetch("/api/v1/user")
      .catch((error) => {
        // setErrorMessage(error);
        return Promise.reject(error);
      })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(({ error }) => {
            // We are not setting the error message as the first time user
            // visit out website would be annoying
            setErrorMessage(error);
            return Promise.reject(error);
          });
        }
        return response.json();
      })
      .then((res) => {
        setErrorMessage("");
        setUserinfo(res);
      });
  }, []);

  useEffect(() => {
    // Fetch Post
    fetch("/api/v1/post")
      .catch(({ error }) => {
        setErrorMessage(error);
        return Promise.reject(error);
      })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(({ error }) => {
            setErrorMessage(error);
            return Promise.reject(error);
          });
        }
        return response.json();
      })
      .then((res) => {
        const action = {
          type: PostReducerConstant.GET_POST,
          payload: res,
        };
        dispatchPostInfo(action);
      });
  }, [userInfo]);

  return (
    <div className="app">
      <Header />
      <p>{errorMessage}</p>
      <PostList
        postInfo={postInfo}
        dispatchPostInfo={dispatchPostInfo}
        dispatchPostFormInfo={dispatchPostFormInfo}
        setErrorMessage={setErrorMessage}
      />
      <PostForm
        postFormInfo={postFormInfo}
        dispatchPostFormInfo={dispatchPostFormInfo}
        dispatchPostInfo={dispatchPostInfo}
        setErrorMessage={setErrorMessage}
      />
      <User
        userInfo={userInfo}
        setUserinfo={setUserinfo}
        setErrorMessage={setErrorMessage}
      />
      <Footer />
    </div>
  );
}

export default App;
