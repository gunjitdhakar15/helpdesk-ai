import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import API from "../api";

export default function CreateTicket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tickets", { title, description });
      alert("Ticket created!");
    } catch (err) {
      alert("Failed to create ticket!");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" align="center">Create Ticket</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Title" margin="normal" value={title} onChange={(e) => setTitle(e.target.value)} />
          <TextField fullWidth label="Description" margin="normal" multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
          <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>Submit</Button>
        </form>
      </Box>
    </Container>
  );
}
