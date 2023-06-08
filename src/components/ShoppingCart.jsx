import { Divider, ListItemSecondaryAction } from '@material-ui/core';
import { AppBar, Badge, Box, Button, Container, Grid, IconButton, List, ListItem, ListItemText, Paper, Toolbar, Typography } from '@mui/material';
import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';



function ShoppingCart() {

  const navigate = useNavigate()

  const [cartItems, setCartItems] = useState([]);

  const handleRemoveFromCart = (item) => {
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.id !== item.id)
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartDetails = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    }

    try {
      await axios.get("http://localhost:8989/api/auth/cart-details", config)
        .then((res) => {
          console.log(res.data);
          setCartItems(res.data.cart)
        }).catch(err => console.log(err))

    } catch (error) {
      console.log(error);
      localStorage.removeItem('authToken')
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      navigate('/SignIn')
    }

    getCartDetails()

  }, []);

  const deleteCartItem = async (id) => {
    console.log(id)
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    }

    try {
      await axios.delete(`http://localhost:8989/api/auth/remove-from-cart/${id}`, config)
        .then((res) => {
          console.log(res.data);
          setCartItems(res.data.cart)
        }).catch(err => console.log(err))

    } catch (error) {
      console.log(error);
    }

  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Cart Details
      </Typography>
      {cartItems.length > 0 ? (
        <List>
          {cartItems.map((book) => (
            <div key={book._id}>
              <ListItem>
                <ListItemText primary={book.title} secondary={`Author: ${book.author}`} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => deleteCartItem(book._id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <Divider />
            </div>
          ))}
          <Box mt={2} textAlign="center">

            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
              back to shop
            </Button>
          </Box>
        </List>
      ) : (
        <Typography variant="body1" align="center">
          Your cart is empty.
        </Typography>
      )}
    </Container>
  )
}

export default ShoppingCart