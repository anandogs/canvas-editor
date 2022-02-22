import Link from "next/link";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import Router from "next/router";

function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const logoutUser = () => {
    dispatch(logout());
    dispatch(reset());
    Router.push("/");
  };
  return (
    <header className="flex justify-between p-5">
      <div>
        <Link href="/">Blog</Link>
      </div>
      <ul>
        {user ? (
          <li className="cursor-pointer">
            <button
              onClick={logoutUser}
              className="flex items-center  w-20 justify-around"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </li>
        ) : (
          <div className="flex w-64 justify-around">
            <li className="cursor-pointer">
              <Link href="/loginUser">
                <div className="flex items-center w-20 justify-around">
                  <FaSignInAlt /> Login
                </div>
              </Link>
            </li>
            <li className="cursor-pointer">
              <Link href="/registerUser">
                <div className="flex items-center w-24 justify-around ">
                  <FaUser /> Register
                </div>
              </Link>
            </li>
          </div>
        )}
      </ul>
    </header>
  );
}

export default Header;
