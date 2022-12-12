function Header({ username, setUsername, setMessage }) {
  const onLogout = () => {
    setUsername("");
    setMessage("");
  };

  return (
    <header className="header">
      <div className="home-link">
        <button>Home</button>
      </div>
      <div className="user-status">
        {username && <span className="user-status-name">Hi, {username}!</span>}
        {username ? (
          <span>
            <button className="user-status-logout" onClick={onLogout}>
              Log out
            </button>
          </span>
        ) : (
          <span>
            <button className="user-status-logout">Log in</button>
          </span>
        )}
      </div>
    </header>
  );
}

export default Header;
