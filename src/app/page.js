'use client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OButton from "@/components/OButton";
import { useNavigate } from "react-router-dom";
import Login from "/src/app/login/login.js";
import Register from "/src/app/register/register.js";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <OButton
      color="blue"
      title="Click me"
      border="none"
      onClick={() => navigate("/login")}
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} /> {/* Home route */}
        <Route path="/login" element={<Login />} /> {/* Login route */}
        <Route path="/register" element={<Register />} /> {/* Register route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;