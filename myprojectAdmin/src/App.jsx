import React, { useContext } from 'react'
import FillText from './components/FillText'
import Lesson from './components/Lesson'
 import {createBrowserRouter,createRoutesFromElements,RouterProvider, Route } from 'react-router'
import FillWithImage from './components/FillWithImage'
import AddVideo from './components/AddVideo'
import AddAudio from './components/AddAudio'
import AddDialog from './components/AddDialog'
import QuestionAndAnsur from './components/QuestionAndAnsur'
import Course from './components/Course'
import Home from './components/Home'
import ShowLesson from './components/ShowLesson'
import MyCourses from './components/MyCourses'
import Login from './components/Login'

import AddCourse from './components/AddCourse'
import AddBot from './components/AddBot'
import TrueAndFalse from './components/TrueAndFalse'
import Grammatik from './components/Grammatik'

import WriteSentence from './components/WriteSentence'
import Image from './components/Image'
function App() {
  const router=createBrowserRouter(createRoutesFromElements(
    <>
    {/* <Route index element={<Login/>}/> */}
    <Route path='/home' element={<Home/>}/>
    <Route path='/addCourse' element={<AddCourse/>}/>
    <Route path='/course/:id' element={<Course/>}/>
    <Route path='/mycourses' element={<MyCourses/>}/>
    <Route path='/course/:id/lesson' element={<Lesson/>}/>

    <Route path='/course/:id/lesson/:id' element={<ShowLesson/>}/>
    <Route path='/show' element={<ShowLesson/>}/>
    <Route path='/fillText/:id' element={<FillText/>}/>
    <Route path='/fillWithImage/:id' element={<FillWithImage/>}/>
    <Route path='/video/:id' element={<AddVideo/>}/>
    <Route path='/audio/:id' element={<AddAudio/>}/>
    <Route path='/dialog/:id' element={<AddDialog/>} />
    <Route path='/questionAndAnsur/:id' element={<QuestionAndAnsur/>}/>
    <Route path='/bot/:id' element={<AddBot/>}/>
    <Route path='/trueAndFalse/:id' element={<TrueAndFalse/>}/>
    <Route path='/grammatik/:id' element={<Grammatik/>} />
    <Route path='/writeSentence/:id' element={<WriteSentence/>}/>
    <Route path='/image/:id' element={<Image/>}/>
    </>
  ))
  return <RouterProvider router={router}/>
}

export default App
