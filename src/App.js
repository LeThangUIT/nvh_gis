import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import HomePage from "./pages/Home/HomePage";
import ProfilePage from "./pages/Profile/ProfilePage";
import ContactPage from "./pages/Contact/ContactPage";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/login/*" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route index element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="profile/*" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
