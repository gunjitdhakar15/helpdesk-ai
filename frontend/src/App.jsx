import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Tickets from "./Pages/Tickets.jsx";
import CreateTicket from "./Pages/CreateTicket.jsx";


export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/create" element={<CreateTicket />} />
      </Routes>
    </Router>
    // phill
  );
}
