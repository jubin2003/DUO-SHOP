import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import SearchComponent from './SearchComponent';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
const AdminViewProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the server
    axios.get('http://localhost:5000/api/products/')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleUpdate = (productId) => {
    // Implement the logic for updating a product
    window.location.href = `/update-product/${productId}`;
    console.log(`Update product with ID: ${productId}`);
  };

  const handleDelete = (productId) => {
    // Implement the logic for deleting a product
    console.log(`Delete product with ID: ${productId}`);
  };

  return (
    <Grid container spacing={8}>
    {products.map((product) => (
      <Grid item key={product._id} xs={12} sm={6} md={4}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="Product Image"
            height="240"
            image={product.img}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.desc}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {product.categories.join(', ')}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {product.size}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {product.color}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Rs{product.price}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => handleUpdate(product._id)} size="small">Update</Button>
            <Button onClick={() => handleDelete(product._id)} size="small">Delete</Button>
          </CardActions>
        </Card>
      </Grid>
    ))}
  </Grid>
  );
};

export default AdminViewProducts;
