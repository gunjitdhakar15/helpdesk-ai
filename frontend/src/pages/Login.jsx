import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import API from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/login", { email, password });
      localStorage.setItem("token", data.token);
      alert("Login successful!");
    } catch (err) {
      alert("Login failed!");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" align="center">Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField fullWidth type="password" label="Password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>Login</Button>
        </form>
      </Box>
    </Container>
  );
}
