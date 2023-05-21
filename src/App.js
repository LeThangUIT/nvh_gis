import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import HomePage from "./pages/Home/HomePage";
import ProfilePage from "./pages/Profile/ProfilePage";
import ContactPage from "./pages/Contact/ContactPage";
import PitchPage from "./pages/Pitch/PitchPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login/*" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route index element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="profile/*" element={<ProfilePage />} />
        <Route path="/pitch" element={<PitchPage />} />
      </Routes>
    </>
  );
}

export default App;
