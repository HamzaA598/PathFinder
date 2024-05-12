import { Routes, Route, useLocation } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Chat from "./Pages/Chat/Chat";
import "./App.css";
import { Toaster } from "./components/ui/toaster";
import University from "./Pages/University/University";
import UniversityInfo from "./Pages/UniversityInfo/UniversityInfo";
import CollegeInfo from "./Pages/CollegeInfo/CollegeInfo";
import Compare from "./Pages/Compare/Compare";

function App() {
  // Get the current location using the useLocation hook
  const location = useLocation();
  // Check if the current route is /chat
  const isChatRoute = location.pathname === "/chat";
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/university" element={<University />}></Route>
        <Route path="/:name" element={<UniversityInfo />}></Route>
        <Route path="/:name/:name" element={<CollegeInfo />}></Route>
        <Route path="/Compare" element={<Compare />}></Route>
      </Routes>
      {!isChatRoute && <Footer />}
      <Toaster />
    </>
  );
}

export default App;
