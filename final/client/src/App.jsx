import "./App.css";
import Header from "./components/Header";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import User from "./components/User";
import Footer from "./components/Footer";
import { useState } from "react";
import { useReducer } from "react";
import postReducer from "./reducer/post-reducer";

function App() {
  const [userInfo, setUserinfo] = useState({});
  const [postInfo, dispatchPostInfo] = useReducer(postReducer, [
    {
      postId: "38653",
      userId: "1",
      title: "Bonjour",
      content: "Bonjour from test post",
      cover: "https://placekitten.com/200/300",
      likeCount: 0,
      createDate: "2022-12-10T07:03:45.285Z",
    },
    {
      postId: "1",
      userId: "1",
      title: "Hello World!",
      content: "This is your first post",
      cover: "https://placekitten.com/200/300",
      likeCount: 0,
      createDate: "2022-01-01T00:00:00.000Z",
    },
  ]);
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <div className="app">
      <Header />
      <p>{errorMessage}</p>
      <PostList postInfo={postInfo} dispatchPostInfo={dispatchPostInfo} />
      <PostForm />
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
