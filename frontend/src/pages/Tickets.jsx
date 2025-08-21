import { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Grid } from "@mui/material";
import API from "../api";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const { data } = await API.get("/tickets");
        setTickets(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTickets();
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Tickets</Typography>
      <Grid container spacing={2}>
        {tickets.map((ticket) => (
          <Grid item xs={12} md={6} key={ticket._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{ticket.title}</Typography>
                <Typography variant="body2">{ticket.description}</Typography>
                <Typography variant="caption">Status: {ticket.status}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
