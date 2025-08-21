import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateTicketForm from "../components/CreateTicketForm";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);

  const addTicket = (ticket) => {
    setTickets((prev) => [ticket, ...prev]);
  };

  return (
    <div className="p-6 space-y-6">
      <CreateTicketForm onTicketCreated={addTicket} />
      {/* Ticket list component here */}
    </div>
  );
}

/*function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  // Adjust backend URL if needed
  const API_URL = "https://helpdesk-ai-eo5u.onrender.com/api";

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token"); // assuming login saves token
      const res = await axios.get(`${API_URL}/tickets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(res.data);
    } catch (err) {
      console.error("Error fetching tickets", err);
    }
  };

  const handleTriage = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_URL}/agent/triage/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update ticket list with AI suggestion
      setTickets((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, aiSuggestion: res.data.aiSuggestion } : t
        )
      );
    } catch (err) {
      console.error("Error triaging ticket", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      {tickets.length === 0 && <p>No tickets found.</p>}

      {tickets.map((ticket) => (
        <div
          key={ticket._id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            marginBottom: "10px",
            padding: "15px",
            background: "#fafafa",
          }}
        >
          <h3>{ticket.title}</h3>
          <p>{ticket.description}</p>
          <p>
            <strong>Status:</strong> {ticket.status}
          </p>

          {ticket.aiSuggestion ? (
            <div style={{ marginTop: "10px", background: "#e8f5e9", padding: "10px", borderRadius: "5px" }}>
              <strong>AI Suggestion:</strong>
              <p>Category: {ticket.aiSuggestion.category}</p>
              <p>Confidence: {ticket.aiSuggestion.confidence}</p>
            </div>
          ) : (
            <button
              onClick={() => handleTriage(ticket._id)}
              disabled={loading}
              style={{
                padding: "8px 12px",
                border: "none",
                borderRadius: "5px",
                background: "#1976d2",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              {loading ? "Triaging..." : "Triage"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}*/

