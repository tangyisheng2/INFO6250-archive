import { useState } from "react";
import { isValidUsername } from "../controller/user";

function LoginForm({ setUsername, setMessage }) {
  const [usernameInputValue, setUsernameInputValue] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    const username = usernameInputValue;
    if (isValidUsername(username)) {
      setUsername(username);
      setMessage(`Welcome! ${username}`);
      setUsernameInputValue("");
    } else {
      setMessage(`Login Error, try again`);
      setUsernameInputValue("");
    }
  };
  return (
    <div className="login-div">
      <form action="" className="login-form" onSubmit={onLogin} method="POST">
        <label>
          <span>Username: </span>
          <input
            type="text"
            className="username-input"
            name="username"
            value={usernameInputValue}
            onChange={(e) => setUsernameInputValue(e.target.value)}
          />
        </label>
        <button type="submit" className="username-submit">
          Login
        </button>
      </form>
    </div>
  );
}
export default LoginForm;
