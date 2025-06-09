import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Card, CardMedia, CardContent } from "@mui/material";

function ProductDetail({ products, cart, setCart }) {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const navigate = useNavigate();

  if (!product) return <Typography>Product not found.</Typography>;

  const handleAddToCart = () => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return (
    <Box sx={{ mt: 10, display: "flex", justifyContent: "center" }}>
      <Card sx={{ maxWidth: 600 }}>
        <CardMedia
          component="img"
          height="300"
          image={product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h5">{product.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary">{product.category}</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>{product.description}</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>${product.price}</Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleAddToCart}>Add to Cart</Button>
          <Button variant="outlined" sx={{ mt: 2, ml: 2 }} onClick={() => navigate(-1)}>Back</Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ProductDetail;
