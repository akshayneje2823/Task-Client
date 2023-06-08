import React, { useEffect } from 'react';

import { Typography, Container, Button, CardContent, CardMedia, Card, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Cart = ({ books, setCartDetails }) => {

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      navigate('/SignIn')
    }
  }, [])

  const addToCartBtn = async (books) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    }

    try {
      await axios.post("http://localhost:8989/api/auth/add-to-cart", { books }, config).then((res) => {
        console.log("CHECK ", res)
        setCartDetails(res.data.cart)
      }).catch(err => console.log(err))

    } catch (error) {
      console.log(error);
      localStorage.removeItem('authToken')
    }
  }

  return (
    <div>
      <Container maxWidth="lg" sx={{ m: "10px" }}>
        <Card >
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image={books.imageLink}
          />
          <CardContent sx={{ width: 340 }}>
            <Typography gutterBottom variant="h5" component="div">
              {books.title}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {books.country}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {books.author}
                </Typography>
              </Box>
              <Box><Typography variant="body2" color="text.secondary">
                {books.year}
              </Typography></Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Language
                </Typography>
              </Box>
              <Box><Typography variant="body2" color="text.secondary">
                {books.language}
              </Typography></Box>
            </Box>
          </CardContent>
          <Box textAlign='center' sx={{ m: "5px" }}>
            <Button size="small" onClick={() => addToCartBtn(books)}>Add To Cart</Button>
          </Box>
        </Card>
      </Container>
    </div>
  );
};

export default Cart;