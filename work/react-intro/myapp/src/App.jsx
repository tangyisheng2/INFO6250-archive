import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";
import LoginForm from "./components/LoginForm";
import Message from "./components/Message";
import Game from "./components/Game";

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [word, setWord] = useState("");

  return (
    <div className="app">
      <Header
        username={username}
        setUsername={setUsername}
        setMessage={setMessage}
      />
      <div className="main">
        <Message message={message} />
        {!username && (
          <LoginForm setUsername={setUsername} setMessage={setMessage} />
        )}
        {username && (
          <Game word={word} setWord={setWord} setMessage={setMessage} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
