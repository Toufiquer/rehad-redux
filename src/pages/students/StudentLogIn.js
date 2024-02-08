import React, { useEffect, useState } from "react";
import imgLearningPortal from "../../assets/image/learningportal.svg";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import getSaveToLocalStorage from "../../utils/getSaveToLocalStorage";
import { studentLoggedIn } from "../../redux/features/studentAuth/studentAuthSlice";
const StudentLogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const users = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    error &&
      toast.error(error.data, { toastId: (Math.random() * 1000).toFixed(0) });
  }, [error]);
  const handleSubmit = (e) => {
    e.preventDefault();
    //  After first randers we get all users data. Which will save to redux store in usersSlice
    const isExist =
      users.data.length > 0 &&
      users.data.find(
        (curr) => curr.email.toLocaleLowerCase() === email.toLocaleLowerCase()
      );
    if (
      isExist &&
      isExist.role === "student" &&
      password === process.env.REACT_APP_PASSWORD
    ) {
      // Check the user is admin or not
      const currentUser = {
        ...isExist,
      };
      console.log(currentUser, isExist, " => Line No: 36");
      dispatch(studentLoggedIn(currentUser));
      getSaveToLocalStorage("studentAuth", currentUser);
      toast.success("Successfully LoggedIn.", {
        toastId: (Math.random() * 1000).toFixed(0),
      });
      navigate("/coursePlayer");
    } else {
      toast.error("Ops Your email or password is not valid", {
        toastId: (Math.random() * 1000).toFixed(0),
      });
    }
  };
  return (
    <>
      {" "}
      <section className="py-6 bg-primary h-screen grid place-items-center">
        <div className="mx-auto max-w-md px-5 lg:px-0">
          <div>
            <img className="h-12 mx-auto" src={imgLearningPortal} alt="LWS" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
              Sign in to Student Account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="login-input rounded-t-md text-gray-800"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="login-input rounded-b-md text-gray-800"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link
                  to="/registration"
                  className="font-medium text-violet-600 hover:text-violet-500"
                >
                  Create New Account
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default StudentLogIn;
