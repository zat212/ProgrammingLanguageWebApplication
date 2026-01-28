import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import AdminApp from './AdminApp.jsx';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

// Pages
import Home from './pages/Home.jsx';
import Timeline from './pages/Timeline.jsx';
import About from './pages/About.jsx';
import Blog from './pages/Blog.jsx';
import FAQ from './pages/FAQ.jsx';
import Login from './pages/Login.jsx';
import Registration from './pages/Registration.jsx';

import EditLesson from './pages/tutor/EditLesson.jsx';
import CreateQuizz from './pages/tutor/CreateQuizz.jsx';
import AddMaterials from './pages/tutor/AddMaterials.jsx';
import LessonManagement from './pages/tutor/LessonManagement.jsx';
import CreateNewLesson from './pages/tutor/CreateNewLesson.jsx';

// User Pages
import UserProfile from './pages/UserProfile.jsx';
import LessonDetail from './pages/LessonDetail.jsx';
import EditProfile from './pages/EditProfile.jsx';

//Java Lessons
import JavaBeginner from './pages/Lessons/JavaLessons/JavaBeginner.jsx';
import JavaAdvance from './pages/Lessons/JavaLessons/JavaAdvance.jsx';
import JavaInter from './pages/Lessons/JavaLessons/JavaInter.jsx';
import JavaSaveLesson from './pages/Lessons/JavaLessons/JavaSaveLesson.jsx';
import JavaStartGamePage from './pages/Lessons/JavaLessons/JavaStartGamePage.jsx';
import JavaGamePage from './pages/Lessons/JavaLessons/JavaGamePage.jsx';
// import GamePage from './pages/Lessons/JavaLessons/GamePage.jsx';
import JavaLeaderBoard from './pages/Lessons/JavaLessons/JavaLeaderBoard.jsx';

// Python Lessons
import PythonGamePage from './pages/Lessons/PythonLessons/PythonGamePage.jsx';
import PythonLeaderBoard from './pages/Lessons/PythonLessons/PythonLeaderBoard.jsx';
import PythonBeginner from './pages/Lessons/PythonLessons/PythonBeginner.jsx';
import PythonInter from './pages/Lessons/PythonLessons/PytonInter.jsx';
import PythonAdvance from './pages/Lessons/PythonLessons/PythonAdvance.jsx';
import PythonSaved from './pages/Lessons/PythonLessons/PythonSaved.jsx';

// JavaScript Lessons
import JavaScriptGamePage from './pages/Lessons/JavaScirptLessons/JavaScriptGamePage.jsx';
import JavaScriptLeaderBoard from './pages/Lessons/JavaScirptLessons/JavaScriptLeaderBoard.jsx';
import JavaScriptBeginner from './pages/Lessons/JavaScirptLessons/JavaScriptBeginner.jsx';
import JavaScriptInter from './pages/Lessons/JavaScirptLessons/JavaScriptInter.jsx';
import JavaScriptAdvnce from './pages/Lessons/JavaScirptLessons/JavaScriptAdvnce.jsx';
import JavaScriptSaved from './pages/Lessons/JavaScirptLessons/JavaScriptSaved.jsx';

// Tutor
import CheckQuizAttempt from './pages/tutor/CheckQuizAttempt.jsx';
import StudentManagement from './pages/tutor/StudentManagement.jsx';
import CreateBlog from './pages/tutor/CreateBlog.jsx';
import BlogList from './pages/tutor/BlogList.jsx';
import BlogDetails from './pages/BlogDetails.jsx';
import TestingGame from './pages/Lessons/PythonLessons/TestingGame.jsx';
import TestingGamePage from './pages/Lessons/TestingGamePage.jsx';
import CheckLeaderBoard from './pages/tutor/CheckLeaderBoard.jsx';

//Admin pages
import AdminLogin from './pages/Admin/AdminLogin.jsx';
import AdminRegistration from './pages/Admin/AdminRegistration.jsx';
import MainAdminLayout from './pages/Admin/MainAdminLayout.jsx';
import MainAdminAllUsers from './pages/Admin/MainAdminAllUsers.jsx';
import MainAdminStudents from './pages/Admin/MainAdminStudents.jsx';
import MainAdminTutors from './pages/Admin/MainAdminTutors.jsx';
import MainAdminLessonManagement from './pages/Admin/MainAdminLessonManagement.jsx';
import MainAdminBlogList from './pages/Admin/MainAdminBlogList.jsx';
import MainAdminCreateBlog from './pages/Admin/MainAdminCreateBlog.jsx';

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Registration /> },
  { path: '/adminLogin', element: <AdminLogin /> },
  { path: '/adminRegister', element: <AdminRegistration /> },
  

  {
    path: '/',
    element: <App />,
    children: [
      { path: '/home', element: <Home /> },
      { path: '/javaBasic', element: <JavaBeginner /> },
      { path: '/javaAdvance', element: <JavaAdvance /> },
      { path: '/javaInter', element: <JavaInter /> },
      { path: '/javaSavedLesson', element: <JavaSaveLesson /> },
      { path: '/learningTimeLine', element: <Timeline /> },
      { path: '/javaStartGame', element: <JavaStartGamePage /> },
      { path: '/javaGamePage', element: <JavaGamePage/>},
      // { path: '/testingGame', element: <GamePage /> },
      { path: '/javaLeaderBoard', element: <JavaLeaderBoard /> },
      { path: '/about', element: <About /> },
      { path: '/blogs', element: <Blog /> },
      { path: '/faqs', element: <FAQ /> },
      { path: '/blogs/:blogId', element: <BlogDetails /> },
      { path: '/pythonBeginner', element: <PythonBeginner /> },
      { path: '/pytonInter', element: <PythonInter /> },
      { path: '/pythonAdvance', element: <PythonAdvance /> },
      { path: '/pythonGamepage', element: <TestingGamePage /> },
      { path: '/pythonGame', element: <PythonGamePage /> },
      { path: '/pythonLeaderBoard', element: <PythonLeaderBoard /> },
      { path: '/pythonSaved', element: <PythonSaved /> },
      { path: '/javaScriptBeginner', element: <JavaScriptBeginner /> },
      { path: '/javaScriptInter', element: <JavaScriptInter /> },
      { path: '/javaScriptAdvance', element: <JavaScriptAdvnce /> },
      { path: '/javaScriptGame', element: <JavaScriptGamePage /> },
      { path: '/javaScriptLeaderBoard', element: <JavaScriptLeaderBoard /> },
      { path: '/javaScriptSaved', element: <JavaScriptSaved /> },
      { path: '/lesson/:lessonId', element: <LessonDetail /> },
      { path: '/profile', element: <UserProfile /> },
      { path: '/edit', element: <EditProfile /> },
      { path: '/testGame', element: <TestingGame /> },
    ],
  },

  {
    path: '/admin',
    element: <AdminApp />,
    children: [
      { path: 'lessonManagement', element: <LessonManagement /> },
      { path: 'createNewLesson', element: <CreateNewLesson /> },
      { path: 'editLesson/:lessonId', element: <EditLesson /> },
      { path: 'addMaterials/:lessonId', element: <AddMaterials /> },
      { path: 'createQuizz/:lessonId', element: <CreateQuizz /> },
      { path: 'checkQuizAttempt', element: <CheckQuizAttempt /> },
      { path: 'studentManagement', element: <StudentManagement /> },
      { path: 'createBlog', element: <CreateBlog /> },
      { path: 'blogList', element: <BlogList /> },
      { path: 'checkLeaderboard', element: <CheckLeaderBoard /> },
    ],
  },

  {
    path: '/mainAdmin',
    element: <MainAdminLayout/>,
    children:[
      { path : 'allusers' , element: <MainAdminAllUsers/> },
      { path : 'students' , element:<MainAdminStudents/> },
      { path : 'tutors' , element:<MainAdminTutors/> },
      { path : 'allLessons' , element:<MainAdminLessonManagement/> },
      { path : 'allBlogs' , element:<MainAdminBlogList/> },
      { path : 'addBlog' , element:<MainAdminCreateBlog/> },
    ]
  }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
