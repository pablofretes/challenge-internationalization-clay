import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from './pages/users/Register.tsx';
import Login from './pages/auth/Login.tsx';
import WordList from './pages/words/WordList.tsx';
import Demo from './pages/demo/Demo.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/words",
    element: <WordList />
  },
  {
    path: "/demo",
    element: <Demo />
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
