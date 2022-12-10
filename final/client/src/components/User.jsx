import { useState } from "react";
import { UserConstant } from "../constants/user-constant.js";

function User({ userInfo, setUserinfo, setErrorMessage }) {
  console.log(userInfo);
  const username = userInfo?.username;
  const [userDivState, setUserDivState] = useState(
    username ? UserConstant.WELCOMESTATE : UserConstant.LOGIN
  );

  function onLoginSubmit(e) {
    setErrorMessage(""); // Clean error message before any move
    e.preventDefault();
    const username = e.target.username.value;
    console.log(username);
    fetch("/api/v1/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ username }),
    })
      .catch(({ error }) => setErrorMessage(error))
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
        setUserinfo(res);
        setUserDivState(UserConstant.WELCOMESTATE);
      });
  }
  function onRegisterSubmit(e) {
    setErrorMessage(""); // Clean error message before any move
    e.preventDefault();
    const body = { username: e.target.username.value };
    fetch("/api/v1/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(body),
    })
      .catch(({ error }) => setErrorMessage(error))
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
        setUserinfo(res);
        setUserDivState(UserConstant.WELCOMESTATE);
      });
  }
  function onLogout(e) {
    setErrorMessage(""); // Clean error message before any move
    e.preventDefault();
    fetch("/api/v1/user", {
      method: "DELETE",
    })
      .catch(({ error }) => setErrorMessage(error))
      .then((response) => {
        if (!response.ok) {
          return response.json().then(({ error }) => {
            setErrorMessage(error);
            return Promise.reject(error);
          });
        }
        return response.json();
      })
      .then(() => {
        setUserinfo({});
        setUserDivState(UserConstant.LOGIN);
      });
  }

  function onSwitchLogIn(e) {
    e.preventDefault();
    setErrorMessage("");
    setUserDivState(UserConstant.LOGIN);
  }
  function onSwitchRegister(e) {
    e.preventDefault();
    setErrorMessage("");
    setUserDivState(UserConstant.REGISTER);
  }

  const userDivPageSelectorForm = (
    <>
      <form action="">
        <button onClick={onSwitchLogIn}>Log In</button>
        <button onClick={onSwitchRegister}>Sign Up</button>
      </form>
    </>
  );

  const userLoginForm = (
    <>
      <form action="" onSubmit={onLoginSubmit}>
        <p>Log in</p>
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            placeholder="John"
            className="username-input"
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  );

  const userRegisterForm = (
    <>
      <form action="" onSubmit={onRegisterSubmit}>
        <p>Register a new account</p>
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            placeholder="John"
            className="username-input"
          />
        </label>
        <button type="submit">Sign up</button>
      </form>
    </>
  );

  const userWelcomeInfo = (
    <>
      <form action="" onSubmit={onLogout}>
        <p>Welcome {username}!</p>
        <p>Not you?</p>
        <button type="submit">Signout</button>
      </form>
    </>
  );

  return (
    <div className="user-div">
      {[UserConstant.LOGIN, UserConstant.REGISTER].includes(userDivState) &&
        userDivPageSelectorForm}
      {userDivState === UserConstant.WELCOMESTATE && userWelcomeInfo}
      {userDivState === UserConstant.LOGIN && userLoginForm}
      {userDivState === UserConstant.REGISTER && userRegisterForm}
    </div>
  );
}

export default User;
