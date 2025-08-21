import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import API from "../api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", { name, email, password });
      alert("Registration successful!");
    } catch (err) {
      alert("Registration failed!");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" align="center">Register</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Name" margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField fullWidth label="Email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField fullWidth type="password" label="Password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>Register</Button>
        </form>
      </Box>
    </Container>
  );
}
