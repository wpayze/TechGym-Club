import { NavLink, Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, currentUser } = useAppContext();

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <nav
      className="navbar is-white"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <NavLink to="/" className="navbar-item">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width={112}
            height={28}
          />
        </NavLink>
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          {isLoggedIn && (
            <>
              <NavLink to="members" className="navbar-item">
                Members
              </NavLink>
              <NavLink to="memberships" className="navbar-item">
                Memberships
              </NavLink>
            </>
          )}
        </div>
        <div className="navbar-end">
          {!isLoggedIn ? (
            <div className="navbar-item">
              <div className="buttons">
                <Link to="register" className="button is-info">
                  Sign up
                </Link>
                <Link to="login" className="button is-light">
                  Log In
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">{currentUser.name}</a>
                <div className="navbar-dropdown is-right">
                  <Link to="settings " className="navbar-item">
                    Gym Settings
                  </Link>
                  <a className="navbar-item">Users</a>
                  <a className="navbar-item" onClick={() => logout()}>Log Out</a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
