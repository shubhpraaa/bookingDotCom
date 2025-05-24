import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header.jsx'
import Layout from './Layout'
import { createBrowserRouter, RouterProvider } from 'react-router'
import path from 'path'
import Home from './components/Home.jsx'
import SearchPage from './pages/SearchPage'

const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
        path:"",
        element:<Home/>,
      },
      {
        path:"/search",
        element:<SearchPage />,
      }
    ]
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
