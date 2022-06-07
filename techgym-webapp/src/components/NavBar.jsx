import { NavLink, Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAppContext();

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("access_token");
    navigate("/");
  }

  return (
    <nav
      className="navbar is-link"
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

          {/* <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">More</a>
                        <div className="navbar-dropdown">
                            <a className="navbar-item">About</a>
                            <a className="navbar-item">Jobs</a>
                            <a className="navbar-item">Contact</a>
                            <hr className="navbar-divider" />
                            <a className="navbar-item">Report an issue</a>
                        </div>
                    </div> */}
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {!isLoggedIn ? (
                <>
                  <Link to="register" className="button is-info">
                    Sign up
                  </Link>
                  <Link to="login" className="button is-light">
                    Log In
                  </Link>
                </>
              ) : (
                <button
                  className="button is-light"
                  onClick={() => logout()}
                >
                  Log Out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
