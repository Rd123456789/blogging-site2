import logo from "./logo.svg";
import "./App.css";
import HomeComponent from "./pages/HomeComponent";
import "react-toastify/package.json";
import { RouterProvider, Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
import DetailsComp from "./pages/DetailsComp";
import AddEdit from "./pages/AddEdit";
import About from './pages/About'
import NotFound from "./pages/NotFound"


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeComponent/>}/>
        <Route path="/details/:id" element={<DetailsComp/>}/>
        <Route path="/create" element={<AddEdit/>}/>
        <Route path="/update/:id" element={<AddEdit/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="*" element={<NotFound/>}/>

    
      </Routes>
    </div>
  );
}

export default App;
