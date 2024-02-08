import React, { useEffect, useState } from "react";
import logoPortal from "../../assets/image/learningportal.svg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { clearLocalStorage } from "../../utils/getSaveToLocalStorage";
import { adminLoggedOut } from "../../redux/features/adminAuth/adminAuthSlice";
import { toast } from "react-toastify";
import { studentLoggedOut } from "../../redux/features/studentAuth/studentAuthSlice";
const Nav = () => {
  const [user, setUser] = useState({});
  const adminAuth = useSelector((state) => state.adminAuth);
  const studentAuth = useSelector((state) => state.studentAuth);
  const navigate = useNavigate();
  useEffect(() => {
    if (adminAuth?.data?.name) {
      setUser(adminAuth?.data);
    }
    if (studentAuth?.data?.name) {
      setUser(studentAuth?.data);
    }
  }, [adminAuth, studentAuth]);
  const handleLogIn = () => {
    clearLocalStorage();
    adminLoggedOut();
    studentLoggedOut();
    setUser({});
    navigate("/");
  };
  const handleLogOut = () => {
    clearLocalStorage();
    adminLoggedOut();
    studentLoggedOut();
    setUser({});
    toast.success("Logged out Successfully", {
      toastId: (Math.random() * 1000).toFixed(0),
    });
    navigate("/");
  };
  return (
    <>
      <nav className="shadow-md">
        <div className="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3">
          <Link to="/">
            <img className="h-10" src={logoPortal} alt="lws" />
          </Link>
          <div className="flex items-center gap-3">
            {studentAuth?.data?.name && (
              // For student
              <>
                <Link to="/coursePlayer">CoursePlayer</Link>
                <Link to="/leaderBoard">LeaderBoard</Link>
              </>
            )}
            {!studentAuth?.data?.name && (
              // For student
              <>
                <Link title="Only For Student" to="/registration">
                  Registration
                </Link>
              </>
            )}
            {adminAuth?.data?.name && (
              // admin route
              <>
                <Link to="/admin/assignments">assignment</Link>
                <Link to="/admin/assignmentMarks">AssignmentMarks</Link>
                <Link to="/admin/dashboard">Dashboard</Link>
                <Link to="/admin/quizzes">Quizzes</Link>
                <Link to="/admin/videos">Videos</Link>
              </>
            )}

            {user?.name ? (
              <>
                <h2 className="font-bold">{user.name}</h2>
                <button
                  onClick={handleLogOut}
                  className="flex gap-2 items-center px-4 py-1 rounded-full text-sm transition-all bg-red-600 hover:bg-red-700 font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                  Logout
                </button>
                {/* <button
                  onClick={handleLogOut}
                  className="flex gap-2 border border-cyan items-center px-4 py-1 rounded-full text-sm transition-all hover:bg-cyan "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                  Logout
                </button> */}
              </>
            ) : (
              <button
                onClick={handleLogIn}
                className="flex gap-2 border border-cyan items-center px-4 py-1 rounded-full text-sm transition-all hover:bg-cyan "
              >
                LogIn
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
