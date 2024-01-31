import React from 'react'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
const AddProduct = () => {
  return (
    <div>
         <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    ></Box>
  <Grid container spacing={2}>
  <Grid item xs={12}>
  <TextField id="outlined-basic" label="Outlined" variant="outlined"  />
  </Grid>
  <Grid item xs={4}>
  <TextField id="outlined-basic" label="Outlined" variant="outlined" />
  </Grid>
  <Grid item xs={4}>
  <TextField id="outlined-basic" label="Outlined" variant="outlined" />
  </Grid>
  <Grid item xs={8}>
  <TextField id="outlined-basic" label="Outlined" variant="outlined" />
  </Grid>
</Grid>
</div>
    
  )
}

export default AddProduct
