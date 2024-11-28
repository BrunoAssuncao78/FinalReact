import { useState } from 'react'
import './App.css'
import RootLayout from './Components/RootLayout'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/Home'
import Login from './pages/Login'
import Menu from './pages/Menu'
import ErrorPage from './pages/ErrorPage'
import Kitchen from './pages/Cozinha'

const router = createBrowserRouter([
  {
    id: 'root',
    loader: () => {
      return {
        login: localStorage.getItem('token') ? true : false
      };
    },
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/login', element: <Login /> },
      { path: '/Menu', element: <Menu /> },
      { path: '/Cozinha', element: <Kitchen /> },
    ],
  },
]);


export default function App() {

  return (
    <RouterProvider router={router}/>
  )
}
