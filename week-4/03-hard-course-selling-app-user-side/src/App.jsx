import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Courses from "./components/Courses";
import CoursePage from "./components/CoursePage";
import PurchasedCourses from "./components/PurchasedCourses";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/courses/",
    element: <Courses />,
  },
  {
    path: "/courses/purchased",
    element: <PurchasedCourses />,
  },
  {
    path: "/courses/:courseId",
    element: <CoursePage />,
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter} />;
    </div>
  );
};

export default App;
