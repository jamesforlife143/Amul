import React, { useState } from "react";
import { Box, Typography, Button, TextField, Paper, List, ListItem, ListItemText, Divider, Alert, IconButton } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import DeleteIcon from "@mui/icons-material/Delete";

function Checkout({ cart, setCart }) {
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  const [success, setSuccess] = useState(false);
  const [invoice, setInvoice] = useState("");
  const [error, setError] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (total === 0) {
      setError("Cannot checkout with no products in the cart.");
      return;
    }
    setInvoice(uuidv4().slice(0, 8).toUpperCase());
    setSuccess(true);
    setCart([]);
    setError("");
  };

  const handleDelete = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  if (success) {
    return (
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <Typography variant="h4" color="success.main">Checkout Successful!</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>Invoice No: {invoice}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 10, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom>Checkout</Typography>
        <List>
          {cart.map(item => (
            <ListItem
              key={item.id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={`${item.name} x${item.quantity}`}
                secondary={`$${item.price * item.quantity}`}
              />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">Total: ${total}</Typography>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <form onSubmit={handleCheckout}>
          <TextField
            label="Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
            fullWidth
            sx={{ mt: 2 }}
            disabled={total === 0}
          />
          <TextField
            label="Payment Details"
            value={payment}
            onChange={e => setPayment(e.target.value)}
            required
            fullWidth
            sx={{ mt: 2 }}
            disabled={total === 0}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={total === 0}
          >
            Checkout
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Checkout;
