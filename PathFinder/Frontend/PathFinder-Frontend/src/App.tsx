import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import Home from "./Pages/Home/Home";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path = "/" element={<Home />}/>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
