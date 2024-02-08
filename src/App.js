import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Nav from "./components/Nav/Nav";
import { Route, Routes } from "react-router-dom";
import CoursePlayer from "./pages/students/CoursePlayer/CoursePlayer";
import LeaderBoard from "./pages/students/LeaderBoard/LeaderBoard";
import StudentLogIn from "./pages/students/StudentLogIn";
import StudentRegistration from "./pages/students/StudentRegistration";
import AdminLogIn from "./pages/admin/AdminLogIn";
import AssignmentMarks from "./pages/admin/Assignment/AssignmentMarks";
import Dashboard from "./pages/admin/Dashboard";

import Videos from "./pages/admin/Videos/Videos";
import NotFound from "./pages/NotFound/NotFound";
import AdminAssignment from "./pages/admin/Assignment/AdminAssignment";
import UpdateVideo from "./pages/admin/Videos/UpdateVideo";
import AddVideo from "./pages/admin/Videos/AddVideo";
import useFirstLoad from "./hook/useFirstLoad";
import AddQuiz from "./pages/admin/Quizzes/AddQuiz";
import Quizzes from "./pages/admin/Quizzes/Quizzes";
import UpdateQuiz from "./pages/admin/Quizzes/UpdateQuiz";
import AddAssignment from "./pages/admin/Assignment/AddAssignment";
import UpdateAssignment from "./pages/admin/Assignment/UpdateAssignment";
import AdminPrivateRoute from "./components/PrivateRoutes/AdminPrivateRoute";
import StudentPrivateRoute from "./components/PrivateRoutes/StudentPrivateRoute";

function App() {
  useFirstLoad();
  return (
    <>
      <Nav />
      <Routes>
        {/* Students Routes */}
        <Route path="/" element={<StudentLogIn />} /> {/* Home Page*/}
        <Route path="/registration" element={<StudentRegistration />} />
        <Route
          path="/coursePlayer/:id"
          element={
            <StudentPrivateRoute>
              <CoursePlayer />
            </StudentPrivateRoute>
          }
        />
        <Route
          path="/coursePlayer"
          element={
            <StudentPrivateRoute>
              <CoursePlayer />
            </StudentPrivateRoute>
          }
        />
        <Route
          path="/leaderBoard"
          element={
            <StudentPrivateRoute>
              <LeaderBoard />
            </StudentPrivateRoute>
          }
        />
        {/* Route for Admin */}
        <Route path="/admin" element={<AdminLogIn />} />
        <Route
          path="/admin/assignments/update/:id"
          element={
            <AdminPrivateRoute>
              <UpdateAssignment />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/assignments/add"
          element={
            <AdminPrivateRoute>
              <AddAssignment />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/assignments"
          element={
            <AdminPrivateRoute>
              <AdminAssignment />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/assignmentMarks"
          element={
            <AdminPrivateRoute>
              <AssignmentMarks />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminPrivateRoute>
              <Dashboard />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/quizzes/update/:id"
          element={
            <AdminPrivateRoute>
              <UpdateQuiz />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/quizzes/add"
          element={
            <AdminPrivateRoute>
              <AddQuiz />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/quizzes"
          element={
            <AdminPrivateRoute>
              <Quizzes />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/videos/add"
          element={
            <AdminPrivateRoute>
              <AddVideo />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/videos/update/:id"
          element={
            <AdminPrivateRoute>
              <UpdateVideo />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/videos"
          element={
            <AdminPrivateRoute>
              <Videos />
            </AdminPrivateRoute>
          }
        />
        {/* NotFound || 404 Error */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
