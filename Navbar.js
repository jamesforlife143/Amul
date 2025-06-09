import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Badge, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

function Navbar({ cart, user }) {
  const navigate = useNavigate();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: "pointer" }} onClick={() => navigate("/")}>
          E-Shop
        </Typography>
        <Typography variant="body1" sx={{ mr: 2 }}>Hi, {user.name}</Typography>
        <Button color="inherit" onClick={() => navigate("/checkout")}>Checkout</Button>
        <IconButton color="inherit" onClick={() => navigate("/checkout")}>
          <Badge badgeContent={cartCount} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
