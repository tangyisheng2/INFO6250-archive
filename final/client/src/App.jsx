import "./App.css";
import Header from "./components/Header";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import User from "./components/User";
import Footer from "./components/Footer";
import ErrorMessage from "./components/ErrorMessage";
import { useState } from "react";
import { useReducer } from "react";
import postReducer from "./reducer/post-reducer";
import postFormReducer from "./reducer/post-form-reducer";
import { useEffect } from "react";
import { PostReducerConstant } from "./constants/post-reducer-constant";
import PostFormConstant from "./constants/post-form-constant";
import { fetchCurrentSession } from "./controller/user-controller";
import { fetchPost } from "./controller/post-controller";

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
    fetchCurrentSession().then((res) => {
      setUserinfo(res);
    });
  }, []);

  useEffect(() => {
    // Clean the previous state to remove the left over post when log out
    dispatchPostInfo({
      type: PostReducerConstant.GET_POST,
      payload: [],
    });
    fetchPost().then((res) => {
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
      <ErrorMessage errorMessage={errorMessage} />
      <PostList
        userInfo={userInfo}
        postInfo={postInfo}
        dispatchPostInfo={dispatchPostInfo}
        dispatchPostFormInfo={dispatchPostFormInfo}
        setErrorMessage={setErrorMessage}
      />
      {userInfo?.userId && (
        <PostForm
          postFormInfo={postFormInfo}
          dispatchPostFormInfo={dispatchPostFormInfo}
          dispatchPostInfo={dispatchPostInfo}
          setErrorMessage={setErrorMessage}
        />
      )}
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
