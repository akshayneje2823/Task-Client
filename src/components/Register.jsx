import React, { useState } from 'react'
import { Grid, Paper, TextField, Button, Box } from '@material-ui/core'
import axios from 'axios'
import { Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {

    const paperStyle = { padding: '30px 20px', width: 300, margin: "10% auto" }
    const headerStyle = { margin: 0 };

    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });

    const registerHandler = async (e) => {
        e.preventDefault()
        try {
            const config = {
                header: {
                    "Content-Type": "application/json"
                }
            }
            await axios.post('http://localhost:8989/api/auth/register', {
                username: user.username,
                email: user.email,
                password: user.password

            }, config).then((res) => {
                localStorage.setItem('authToken', res.data.token);
                navigate('/signIn')
            }).catch(err => console.log(err));

        } catch (error) {
            alert("Error Refresh The page")
            console.log(error.response.data.error)
        }


    }

    const onchangeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    return (
        <Grid>
            <Paper elevation={20} style={paperStyle} color='#ffff'>
                <Grid align='center'>
                    <h2 style={headerStyle}>Sign Up</h2>
                </Grid>
                <form onSubmit={registerHandler}>
                    <TextField fullWidth margin='normal' name='username' value={user.username} onChange={onchangeHandler} label='Name' placeholder="Enter your name" />
                    <TextField fullWidth margin='normal' name="email" value={user.email} onChange={onchangeHandler} label='Email' placeholder="Enter your email" />
                    <TextField margin='normal' fullWidth name="password" value={user.password} onChange={onchangeHandler} label='Password' placeholder="Enter your password" />
                    <Box textAlign='center'>
                        <Button variant='contained' color='primary' style={{
                            marginTop: "20px"
                        }} type='submit'>
                            Sign Up
                        </Button>
                    </Box>
                </form>
                <Box sx={{ marginTop: "15px" }}>
                    <Typography variant="body2">
                        Already have an account {" "}<Link to="/signIn"  >
                            Sign In
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Grid>
    )
}

export default Register;