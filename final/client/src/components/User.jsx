import { useState } from "react";
import { UserConstant } from "../constants/user-constant.js";
import {
  userLogin,
  userLogout,
  userRegister,
} from "../controller/user-controller.js";

function User({ userInfo, setUserinfo, setErrorMessage }) {
  const username = userInfo?.username;

  const [userDivState, setUserDivState] = useState(UserConstant.LOGIN);

  /**
   * This method makes a HTTP POST request to the server and log in the user.
   * It would also set the User div to welcomestate that shows the user info
   * @param {Event} e Event object from userLoginForm
   */
  function onLoginSubmit(e) {
    setErrorMessage(""); // Clean error message before any move
    e.preventDefault();
    userLogin({ username: e.target.username.value })
      .then((res) => {
        setUserinfo(res);
        setUserDivState(UserConstant.WELCOMESTATE);
      })
      .catch(({ error }) => setErrorMessage(error));
  }

  /**
   * This method sends the sign up request to the server and
   * set the User div to welcomestate that shows the user info
   * @param {Event} e Event object from userRegisterForm
   */
  function onRegisterSubmit(e) {
    setErrorMessage(""); // Clean error message before any move
    e.preventDefault();
    userRegister({ username: e.target.username.value }).then((res) => {
      setUserinfo(res);
      setUserDivState(UserConstant.WELCOMESTATE);
    });
  }

  /**
   * This method handles log out request for the user.
   * @param {Event} e Event object from userWelcomeInfo to logout
   */
  function onLogout(e) {
    setErrorMessage(""); // Clean error message before any move
    e.preventDefault();
    userLogout().then(() => {
      setUserinfo();
      setUserDivState(UserConstant.LOGIN);
    });
  }

  /**
   * This method switches the form to login view.
   * @param {Event} e Event Object
   */
  function onSwitchLogIn(e) {
    e.preventDefault();
    setErrorMessage("");
    setUserDivState(UserConstant.LOGIN);
  }

  /**
   * This method switch the form to register view
   * @param {Event} e Event object
   */
  function onSwitchRegister(e) {
    e.preventDefault();
    setErrorMessage("");
    setUserDivState(UserConstant.REGISTER);
  }

  const userDivPageSelectorForm = (
    <>
      <form className="user-page-selector">
        <button onClick={onSwitchLogIn}>Log In</button>
        <button onClick={onSwitchRegister}>Sign Up</button>
      </form>
    </>
  );

  const userLoginForm = (
    <>
      <form className="user-login" onSubmit={onLoginSubmit}>
        <h2 className="user-header">Log In</h2>
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
      <form className="user-register" onSubmit={onRegisterSubmit}>
        <h2 className="user-header">Register a new account</h2>
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
      <form className="user-info" onSubmit={onLogout}>
        <h2 className="user-header">Welcome {username}!</h2>
        <button type="submit">Signout</button>
      </form>
    </>
  );

  return (
    <div className="user-div">
      {userInfo?.username && userWelcomeInfo}
      {!userInfo?.username &&
        [UserConstant.LOGIN, UserConstant.REGISTER].includes(userDivState) &&
        userDivPageSelectorForm}
      {!userInfo?.username &&
        userDivState === UserConstant.LOGIN &&
        userLoginForm}
      {!userInfo?.username &&
        userDivState === UserConstant.REGISTER &&
        userRegisterForm}
    </div>
  );
}

export default User;
