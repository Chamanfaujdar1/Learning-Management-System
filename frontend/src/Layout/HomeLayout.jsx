import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Footer from "../Components/Footer";
import { logout } from "../Redux/Slices/AuthSlice";

function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  function changeWidth() {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  }

  function hideDrawer() {
    const ele = document.getElementsByClassName("drawer-toggle");
    ele[0].checked = false;

    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "0px ";
  }

  async function handleLogout(e){
    e.preventDefault();
    const res =  dispatch(logout());
    if (res?.payload?.success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-[90vh] ">
      <div className="drawer h-[100vh] absolute left-0 z-50 w-fit">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content h-full">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu
              onClick={changeWidth}
              size={"32px"}
              className="font-bold text-white m-4"
            />
          </label>
        </div>
        <div className="drawer-side h-full">
          <label htmlFor="my-drawer" className="drawer-overlay h-full"></label>
          <ul className="menu flex flex-col justify-between w-48 p-4 sm:w-80 bg-base-200 text-base-content h-full">
            <div>
              <li className="w-fit absolute right-2 z-50 ">
                <button onClick={hideDrawer}>
                  <AiFillCloseCircle size={"24px"} />
                </button>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              {isLoggedIn && role === "ADMIN" && (
                <li>
                  <Link to="/admin/dashboard">Admin Dashboard</Link>
                </li>
              )}
              {isLoggedIn && role === "ADMIN" && (
                <li>
                  <Link to="/course/create">Create Course</Link>
                </li>
              )}
              <li>
                <Link to="/courses">All Courses</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
            </div>

            <div className="mt-auto">
              {!isLoggedIn && (
                <li>
                  <div className="w-full flex items-center justify-center">
                    <button className="btn btn-primary ">
                      <Link to="/login">Login</Link>
                    </button>
                    <button className="btn btn-secondary ">
                      <Link to="/signup">Sign Up</Link>
                    </button>
                  </div>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <div className="w-full flex items-center justify-center">
                    <button className="btn btn-primary ">
                      <Link to="/user/profile">Profile</Link>
                    </button>
                    <button className="btn btn-secondary  " onClick={handleLogout}>
                      <Link>Logout</Link>
                    </button>
                  </div>
                </li>
              )}
            </div>
          </ul>
        </div>
      </div>
      {children}
      <Footer />
    </div>
  );
}

export default HomeLayout;
