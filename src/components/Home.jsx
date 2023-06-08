import Cart from './Cart'
import React, { useLayoutEffect, useState } from 'react'
import axios from 'axios';
import { Box } from '@mui/material';
import AppBarComp from './Appbar';

function Home({ cartDetails,setCartDetails }) {


  const [books, setBooks] = useState([])

  const getBookData = async () => {
    await axios.get('http://localhost:8989/api/auth/books-data').then(res => {
      console.log(res.data.data)
      setBooks(res.data.data)
    }).catch(err => {
      console.log(err)
    })

  };


  useLayoutEffect(() => {
    getBookData()
  }, []);



  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: "row", flexWrap: 'wrap', justifyContent: "center", marginTop: "20px" }}>

        {
          books.map(books => (
            <Cart key={books._id} books={books}  />
          ))
        }

      </Box>
    </>
  )
}

export default Home