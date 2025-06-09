import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      setUser({ name: username });
      setError("");
      navigate("/"); // Redirect to products list after login
    } else {
      setError("Please enter both username and password.");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Paper elevation={3} sx={{ p: 4, minWidth: 320 }}>
        <Typography variant="h5" gutterBottom>Login</Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
          )}
          <Button type="submit" variant="contained" fullWidth>Login</Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Login;
