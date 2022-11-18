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
        {username && <span>Hi, {username}</span>}
        {username ? (
          <span>
            <button onClick={onLogout}>Log out</button>
          </span>
        ) : (
          <span>
            <button>Log in</button>
          </span>
        )}
      </div>
    </header>
  );
}

export default Header;
