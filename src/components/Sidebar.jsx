import "../styles/sidebar.css"
import { NavLink, useNavigate } from "react-router-dom";
import api from "../services/api";

const Sidebar = ({sidebarOpen,
closeSidebar}) => {

    const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem("user"));
 const logout = async () => {
  try {
    await api.post("/auth/logout", {
      refreshToken:
        localStorage.getItem(
          "refreshToken"
        ),
    });
  } catch (error) {
    console.log(error);
  }

  localStorage.removeItem(
    "accessToken"
  );

  localStorage.removeItem(
    "refreshToken"
  );

  localStorage.removeItem("user");

  navigate("/");
};

    return (
<>

{
sidebarOpen && (

<div
className="sidebar-overlay"
onClick={closeSidebar}
/>

)
}

<aside
className={`sidebar ${
sidebarOpen ? "open" : ""
}`}
>

            <div className="logo">

                LearnHub

            </div>

         <nav>

  {
    user?.role === "Admin" ? (

      <>

        <NavLink
          to="/admin/dashboard"
          onClick={closeSidebar}
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/users"
          onClick={closeSidebar}
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          👥 Users
        </NavLink>

        <NavLink
          to="/courses"
          onClick={closeSidebar}
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          📚 Courses
        </NavLink>

      </>

    ) : (

      <>

        <NavLink
          to="/dashboard"
          onClick={closeSidebar}
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/my-courses"
          onClick={closeSidebar}
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          📚 My Courses
        </NavLink>

        <NavLink
          to="/courses"
          onClick={closeSidebar}
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          📚 Courses
        </NavLink>

        <NavLink
          to="/profile"
          onClick={closeSidebar}
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          👤 Profile
        </NavLink>

      </>

    )
  }

</nav>

            <button
                className="logout-btn"
                onClick={logout}
            >
                Logout
            </button>

        </aside></>
    );
};

export default Sidebar;