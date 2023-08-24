import "./App.css";
import { Route,Routes } from "react-router-dom";
import {Navbar} from "./components/common/Navbar";
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ForgotPassword from "./pages/forwardPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/about";
function App() {
  return (
    
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col">
       <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
       
        <Route path="/contact" element={<div className="text-white">Contact</div>}/>
        <Route path="/login" element=
        {<OpenRoute>
        <Login/>
        </OpenRoute>}/>
        <Route path="/signup" element={
            <OpenRoute>
              <SignUp/>
              </OpenRoute>}/>
        <Route path="/forgot-password" element={
              <OpenRoute>
              <ForgotPassword/>
              </OpenRoute>}/>
          <Route path = "/reset-password/:id" element={
          <OpenRoute>
          <UpdatePassword/>
          </OpenRoute>}/>
           <Route path = "/verify-email" element={
          <OpenRoute>
          <VerifyEmail/>
          </OpenRoute>}/>
          <Route
            path="/about" element={
              <About/>
            }></Route>

      </Routes>
    </div>
  );
}

export default App;
