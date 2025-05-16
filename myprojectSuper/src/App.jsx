import React from 'react'

import Course from './Pages/Course'
import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route} from 'react-router-dom' 
// import Login from './Pages/Login'
import LayOut from './Layout/LayOut'
import './app.css'
import SliderPage from './Pages/SliderPage'
import ViewsPage from './Pages/ViewsPage'
import User from './Pages/User'
import Message from './Pages/Message'
const App = () => {
 const router=createBrowserRouter(
               createRoutesFromElements(
                <>
                {/* <Route path='/' element={<Login/>} /> */}
                <Route index element={<LayOut/>}>
                  <Route path='/courses' element={<Course/>} />
                  <Route path='/user' element={<User/>} />
                  <Route path='/slider' element={<SliderPage/>}/>
                  <Route path='/views' element={<ViewsPage/>}/>
                  <Route path='/message' element={<Message/>} />
                </Route>
                </>
               ))

  return <RouterProvider router={router} />
}
export default App
