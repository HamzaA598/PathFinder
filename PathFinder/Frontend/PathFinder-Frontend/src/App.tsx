import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { toast } from "./components/ui/use-toast";
import { Toaster } from "./components/ui/toaster";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";

import "./App.css";

import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Chat from "./Pages/Chat/Chat";
import University from "./Pages/University/University";
import UniversityInfo from "./Pages/UniversityInfo/UniversityInfo";
import CollegeInfo from "./Pages/CollegeInfo/CollegeInfo";
import Compare from "./Pages/Compare/Compare";
import News from "./Pages/News/News";
import AddCollegeAdmin from "./Pages/AddCollegeAdmin/AddCollegeAdmin";

function App() {
  // Get the current location using the useLocation hook
  const location = useLocation();
  // Check if the current route is /chat
  const isChatRoute = location.pathname === "/chat";

  const [user, setUser] = useState(null);
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return;

    (async () => {
      const response = await fetch(
        "http://localhost:8000/webapp/get_user_from_jwt",
        {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const content = await response.json();

      if (response.ok) setUser(content);

      toast({
        title: content.message,
        description: response.ok
          ? `Welcome back ${content.name}!`
          : "Please Log in",
      });
    })();

    effectRan.current = true;
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/university" element={<University />}></Route>
        <Route
          path="/:uni_name"
          element={<UniversityInfo user={user} />}
        ></Route>
        <Route path="/:uni_name/:col_name" element={<CollegeInfo />}></Route>
        <Route path="/Compare" element={<Compare />}></Route>
        <Route path="/News" element={<News user={user} />}></Route>
        <Route
          path="/add_college_admin"
          element={<AddCollegeAdmin user={user} setUser={setUser} />}
        ></Route>
      </Routes>
      {!isChatRoute && <Footer />}
      <Toaster />
    </>
  );
}

export default App;
