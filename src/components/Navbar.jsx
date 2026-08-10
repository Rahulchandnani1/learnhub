import { FaBars } from "react-icons/fa";
import NavbarSearch from "./NavbarSearch";
import "../styles/Navbar.css";
const Navbar = ({ toggleSidebar }) => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <div className="navbar">

      <button
        className="menu-btn"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      <NavbarSearch />

      <div className="navbar-user">

        <h3>

          Welcome,

          <span> {user?.name}</span>

        </h3>

      </div>

    </div>

  );

};

export default Navbar;