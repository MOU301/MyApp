import React from 'react'
import Lesson from './components/Unterricht/Lesson'
import { createBrowserRouter,createRoutesFromElements,RouterProvider } from 'react-router'
import { Route } from 'react-router'
import LayOut from './components/LayOut/LayOut'
import Login from './components/Pages/Login'
import Logout from './components/Pages/Logout'
import Home from './components/Pages/Home'

import CreateAcount from './components/Pages/CreateAcount'
import './App.css'
import CourseSingel from './components/Pages/CourseSingel'
import Course from './components/Pages/Course'
import Payment from './components/Pages/Payment'
import Translate from './components/Pages/Translate'
import Bot from './components/Pages/Bot';
// import BotTest from './components/Pages/BotTest';
const App = () => {
  const router=createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<LayOut/>}>
      <Route index element={<Home/>}/>
      <Route path='/courses' element={<Course/>}/>
      <Route path='/course/:id' element={<CourseSingel/>}/>
      <Route path='course/:id/lesson/:id' element={<Lesson/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/createAcount' element={<CreateAcount/>}/>
      <Route path='/payment/:id' element={<Payment/>}/>
      <Route path='/translate' element={<Translate/>}/>
      <Route path='/bot' element={<Bot/>}/>
      {/* <Route path='/BotTest' element={<BotTest/>}/> */}
    </Route>
    ));
  return <RouterProvider router={router} />
}

export default App
