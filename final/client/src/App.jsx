import "./App.css";
import Header from "./components/Header";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import User from "./components/User";
import Footer from "./components/Footer";
import { useState } from "react";
import { useReducer } from "react";
import postReducer from "./reducer/post-reducer";
import { useEffect } from "react";

function App() {
  const [userInfo, setUserinfo] = useState({});
  const [postInfo, dispatchPostInfo] = useReducer(postReducer, [
    {
      postId: "38653",
      userId: "1",
      title: "Bonjour",
      content: "Bonjour from test post",
      cover: "https://placekitten.com/1600/900",
      likeCount: 0,
      createDate: "2022-12-10T07:03:45.285Z",
    },
    {
      postId: "1",
      userId: "1",
      title: "Hello World!",
      content: "This is your first post",
      cover: "https://placekitten.com/1600/900",
      likeCount: 0,
      createDate: "2022-01-01T00:00:00.000Z",
    },
  ]);
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
        console.log(response);
        return response.json();
      })
      .then((res) => {
        setErrorMessage("");
        setUserinfo(res);
      });
  }, []);

  // useEffect(() => {
  //   // Fetch Post
  //   fetch("/api/v1/post").catch(({ error }) => {
  //     setErrorMessage(error);
  //     return Promise.reject(error);
  //   });
  // }, [userInfo]);

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
