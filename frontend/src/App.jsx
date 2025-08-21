import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Tickets from "./Pages/Tickets";
import CreateTicket from "./Pages/CreateTicket";

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
