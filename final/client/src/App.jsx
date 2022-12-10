import "./App.css";
import Header from "./components/Header";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import User from "./components/User";
import Footer from "./components/Footer";
import { useState } from "react";

function App() {
  const [userInfo, setUserinfo] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <div className="app">
      <Header />
      <p>{errorMessage}</p>
      <PostList />
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
