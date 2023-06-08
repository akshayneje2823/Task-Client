import React, { useState } from 'react'
import { Grid, Paper, TextField, Button, Box, Typography } from '@material-ui/core'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const paperStyle = { padding: '30px 20px', width: 300, margin: "10% auto" }
    const headerStyle = { margin: 0 };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const navigate = useNavigate()
    const submitHandler = async (e) => {
        e.preventDefault()
        console.log(email, password);

        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }
        if (email && password) {

            try {
                await axios.post('http://localhost:8989/api/auth/login', {
                    email,
                    password
                }, config).then((res) => {
                    console.log(res);
                    localStorage.setItem('authToken', res.data.token);
                    navigate('/')
                })
            } catch (error) {
                //  console.log(error)   
                alert("Please Enter Valid Credentials");
                setEmail("");
                setPassword('')
            }
        } else {
            alert("all field required")
        }
    }

    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <h2 style={headerStyle}>Sign In</h2>
                </Grid>
                <form style={{ top: "20%" }}>
                    <TextField fullWidth margin='normal' label='Email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                    <TextField margin='normal' type='password' fullWidth label='Password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                    <Box textAlign='center'>
                        <Button variant='contained' color='primary' style={{
                            marginTop: "20px"
                        }} type='submit' onClick={submitHandler}>
                            Sign In
                        </Button>
                    </Box>
                    <Box sx={{ marginTop: "15px" }}>
                        <Typography variant="body2">
                            Don't have an account {" "}<Link to="/signUp"  >
                                Sign Up
                            </Link>
                        </Typography>
                    </Box>

                </form>
            </Paper>
        </Grid >
    )
}

export default Login;