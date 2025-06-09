import React from "react";
import { Box, List, ListItem, ListItemButton, ListItemText, Typography, Divider, Slider, Select, MenuItem } from "@mui/material";

const categories = ["", "Mobiles", "Laptops", "PC"];

function Sidebar({ filters, setFilters }) {
  return (
    <Box sx={{ width: 250, p: 2, mt: 8, borderRight: "1px solid #eee", height: "100vh", position: "sticky", top: 0 }}>
      <Typography variant="h6">Categories</Typography>
      <List>
        {categories.map(cat => (
          <ListItem key={cat} disablePadding>
            <ListItemButton selected={filters.category === cat} onClick={() => setFilters(f => ({ ...f, category: cat }))}>
              <ListItemText primary={cat || "All"} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Price Range</Typography>
      <Slider
        value={filters.price}
        min={0}
        max={3000}
        step={100}
        onChange={(_, value) => setFilters(f => ({ ...f, price: value }))}
        valueLabelDisplay="auto"
        sx={{ width: "90%" }}
      />
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Sort By</Typography>
      <Select
        value={filters.sort}
        onChange={e => setFilters(f => ({ ...f, sort: e.target.value }))}
        fullWidth
        size="small"
      >
        <MenuItem value="">Default</MenuItem>
        <MenuItem value="price-asc">Price: Low to High</MenuItem>
        <MenuItem value="price-desc">Price: High to Low</MenuItem>
      </Select>
    </Box>
  );
}

export default Sidebar;
