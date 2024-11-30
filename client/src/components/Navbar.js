import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { assets } from "../assets/assets";
import { useAuth } from "../context/auth";

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleMenu = () => {
    mobileMenu ? setMobileMenu(false) : setMobileMenu(true);
  };

  const navigate = useNavigate();
  // const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  //handle logout
  const handleLogout = async () => {
    try {
      setAuth({ ...auth, user: "", token: "" });
      localStorage.removeItem("auth");
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <nav>
        <NavLink className="navbar-brand" to="/">
          <span className="head1">SearchAI</span>
        </NavLink>

        <ul className={mobileMenu ? "" : "hide-mobile-menu"}>
          {!auth.user ? (
            <>
              <li>
                <NavLink to="/" offset={-250} duration={500} className="head1">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" p={1} className="head1">
                  Sign Up
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" p={1} className="head1">
                  Sign In
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  onClick={handleLogout}
                  p={1}
                  className="head"
                >
                  Logout
                </NavLink>
              </li>
            </>
          )}

          <li>
            <div className="quote_btn-container">
              <NavLink to="https://wa.me/+919424575042" className="head1">
                <i className="fa fa-phone" aria-hidden="true" />
                <span>Whatsapp Me!</span>
              </NavLink>
            </div>
          </li>
        </ul>
        <img
          src={assets.menu_icon}
          alt=""
          className="menu-icon"
          onClick={toggleMenu}
        />
      </nav>
      {/* nav e */}
    </div>
  );
};

export default Navbar;
