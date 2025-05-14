import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const nav = useNavigate();

  const islogin = JSON.parse(localStorage.getItem("islogin"));
  const username = localStorage.getItem("username");

  const handelogout = () => {
    toast.error("logout successful!!!");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.setItem("islogin", false);
    nav("/login");
  };
  return (
    <header>
      <nav className="max-w-screen-xl mx-auto border bg-blue-600 py-3 rounded-lg capitalize flex justify-between items-center px-20">
        <h1 className=" text-3xl font-mono text-white cursor-pointer" onClick={()=>nav("/")}>TaskTracker</h1>
        <div className="flex gap-4 items-center">
          {islogin ? (
            <button
              type="button"
              onClick={handelogout}
              className="bg-red-500 text-white font-medium text-lg rounded-md hover:bg-red-700 px-4 py-2 font-mono capitalize"
            >
              logout
            </button>
          ) : (
            <>
              <Link
                to={"/login"}
                className="px-4 py-2 font-mono bg-green-600 text-lg font-medium hover:bg-green-800 rounded-md text-white"
              >
                Login
              </Link>
              <Link
                to={"/signup"}
                className="px-4 py-2 font-mono bg-orange-600 text-lg font-medium hover:bg-orange-800 rounded-md text-white"
              >
                SignUp
              </Link>
            </>
          )}
          {islogin && (
            <p className="text-white font-mono text-lg ">
              [ {<strong>{username}</strong>} ]
            </p>
          )}
        </div>
      </nav>
    </header>
  );
};
