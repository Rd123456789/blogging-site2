import logo from "./logo.svg";
import "./App.css";
import HomeComponent from "./pages/HomeComponent";
import "react-toastify/package.json";
import { RouterProvider, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DetailsComp from "./pages/DetailsComp";
import AddEdit from "./pages/AddEdit";
import About from './pages/About'
import NotFound from "./pages/NotFound"
import Headers from "./components/Headers";
import "./style.scss"
import AuthFile from "./pages/AuthFile";
import { useState } from "react";
import { useEffect } from "react";
import { auth } from "./firebaseconf";




function App() {
  const [user, setUserIn] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUserIn(authUser);
      } else {
        setUserIn(null);
      }
    });
  }, []);
  return (
    <div className="App">
      <Headers user = {user}/>
      <ToastContainer position="top-center"/>
      <Routes>
        <Route path="/" element={<HomeComponent/>}  />
        <Route path="/details/:id" element={<DetailsComp/>}/>
        <Route path="/create" element={<AddEdit/>}/>
        <Route path="/update/:id" element={<AddEdit/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/auth" element={<AuthFile/>}/>
        <Route path="*" element={<NotFound/>}/>

    
      </Routes>
    </div>
  );
}

export default App;
