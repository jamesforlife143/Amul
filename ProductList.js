import React, { useState } from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button, TextField, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE_OPTIONS = [2, 4, 6, 8];

function ProductList({ products, cart, setCart, filters, setFilters }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[1]);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
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

  const handleQuantityChange = (id, quantity) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, Number(quantity)) } : item
      )
    );
  };

  // Pagination
  const paginatedProducts = products.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, mt: 8 }}>
        <TextField
          label="Search"
          value={filters.search}
          onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
          size="small"
          sx={{ width: 300 }}
        />
        <TextField
          select
          label="Page Size"
          value={pageSize}
          onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
          size="small"
          SelectProps={{ native: true }}
          sx={{ width: 120 }}
        >
          {PAGE_SIZE_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </TextField>
      </Box>
      <Grid container spacing={3}>
        {paginatedProducts.map(product => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.name}
                sx={{ cursor: "pointer" }}
                onClick={() => navigate(`/product/${product.id}`)}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">{product.category}</Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>${product.price}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Button variant="contained" size="small" onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                  {cart.find(item => item.id === product.id) && (
                    <TextField
                      type="number"
                      size="small"
                      value={cart.find(item => item.id === product.id)?.quantity || 1}
                      onChange={e => handleQuantityChange(product.id, e.target.value)}
                      sx={{ width: 60, ml: 2 }}
                      inputProps={{ min: 1 }}
                    />
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={Math.ceil(products.length / pageSize)}
          page={page}
          onChange={(_, value) => setPage(value)}
        />
      </Box>
    </Box>
  );
}

export default ProductList;
