import React from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Alert, Stack } from '@mui/material';


const Container = styled.div`
width:100vw;
height:100vh;
background:linear-gradient(
    rgba(255,255,255,0.5),
    rgba(255,255,255,0.5)
), url("https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
center;
display:flex;
align-items: center;
justify-content: center;

`;

const Wrapper = styled.div`
width:40%;
padding:20px;
background-color:white;

`;
const Title = styled.h1`
font-size:24px;
font-weight:300;
`;

const Form = styled.form`
display: flex;
flex-wrap: wrap;

`;
const Input = styled.input`
flex:1;
min-width:40%;
margin:20px 10px 0px 0px;
padding:10px;
`;
const Agreement = styled.span`
font-size:12px;
margin:20px 0px;
`;
const Button = styled.button`
width:40%;
border:none;
padding:15px 20px;
background-color:teal;
color:white;
cursor:pointer;
`;


const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // Clear the specific error when the user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    let newErrors = {};

    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Handle successful registration, redirect, etc.
          navigate('/login');
          console.log('Registration successful!');
          <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="success">Registration successful!</Alert>
          </Stack>
        } else {
          // Handle registration error
          console.error('Registration failed!');
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    }
  };
  return (
    <Container>
    <Wrapper>
      <Title>SIGN UP</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="username"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <span>{errors.username}</span>}

        <Input
          type="text"
          placeholder="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}

        <Input
          placeholder="password"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span>{errors.password}</span>}

        <Input type='password' placeholder="confirm password" />

        <Agreement>
          By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
        </Agreement>

        <Button type="submit">Register</Button>
      </Form>
    </Wrapper>
  </Container>
  )
}

export default Register
