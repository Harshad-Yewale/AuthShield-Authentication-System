import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/login/Login'
import EmailVerify from './pages/email verify/EmailVerify'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import ResetPassword from './pages/reset password/ResetPassword'
import ProtectedRoute from './util/ProtectedRoute';
import { Analytics } from '@vercel/analytics/react';


function App() {

  return (
    <div>
     <ToastContainer 
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/verify-email' element={<ProtectedRoute><EmailVerify/></ProtectedRoute>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/>
          <Route path="*" element={<Navigate to="/" />}/>
          
        </Routes>
        <Analytics/>
    </div>
  )
}

export default App
