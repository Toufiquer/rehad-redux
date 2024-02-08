import React, { useEffect, useState } from "react";
import ImgLearningPortal from "../../assets/image/learningportal.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import getSaveToLocalStorage from "../../utils/getSaveToLocalStorage";
import studentAuthSlice from "../../redux/features/studentAuth/studentAuthSlice";
import { useAddStudentMutation } from "../../redux/features/studentAuth/studentAuthApi";
const StudentRegistration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const users = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addStudent, {}] = useAddStudentMutation();
  useEffect(() => {
    error &&
      toast.error(error.data, { toastId: (Math.random() * 1000).toFixed(0) });
  }, [error]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const currentUser = {
      email,
      name,
      role: "student",
      password,
    };
    //  After first randers we get all users data. Which will save to redux store in usersSlice
    const isExist =
      users.data.length > 0 &&
      users.data.find(
        (curr) => curr.email.toLocaleLowerCase() === email.toLocaleLowerCase()
      );
    if (password !== confirmPassword && password === "lws@123456") {
      toast.error("Password does't match. it must be 'lws@123456'", {
        toastId: (Math.random() * 1000).toFixed(0),
      });
      return;
    } else if (isExist) {
      toast.error("Ops Your email already exist", {
        toastId: (Math.random() * 1000).toFixed(0),
      });
    } else {
      addStudent(currentUser);
      getSaveToLocalStorage("studentAuth", currentUser);
      toast.success("Successfully LoggedIn.", {
        toastId: (Math.random() * 1000).toFixed(0),
      });
      navigate("/coursePlayer");
    }
  };
  return (
    <>
      <section className="py-6 bg-primary h-screen grid place-items-center">
        <div className="mx-auto max-w-md px-5 lg:px-0">
          <div>
            <img className="h-12 mx-auto" src={ImgLearningPortal} alt="Logo" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
              Create Your New Account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  required
                  className="login-input rounded-t-md text-white"
                  placeholder="Student Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="confirm-password"
                  required
                  className="login-input rounded-b-md text-gray-800"
                  placeholder="Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default StudentRegistration;
