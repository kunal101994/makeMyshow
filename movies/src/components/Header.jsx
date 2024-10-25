import React, { useEffect, useState } from 'react';
import {AppBar, Autocomplete, Toolbar, TextField, Tabs, Tab} from "@mui/material"
import MovieIcon from '@mui/icons-material/Movie';
import { Box } from "@mui/system";
import { color } from 'framer-motion';
import { getAllMovies } from '../api-helpers/api-helpers';
const dummyArray =["eMemory", "Salaar", "Kalki 2898 AD"];
const Header = () => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    getAllMovies()
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
  }, []);
  return (
    <>
       <AppBar sx={{bgcolor:"#2b2d42"}}>
       <Toolbar>
        <Box width={'20%'}>
              <MovieIcon />
        </Box>
        <Box width={'30%'} margin={"auto"}>
        <Autocomplete
        freeSolo
        options={dummyArray.map((option) => option)}
        renderInput={(params) => (
        <TextField 
          sx={{input: {color:"white"}}}
        variant='standard' {...params} 
        placeholder="Search Across Multiple Movies" />
        )}
        />
        </Box>
        <Box display={'flex'}>
        {/* // this indicate highlight the movie tab */}
         <Tabs textColor='inherit' indicatorColor='secondary' value={value} onChange={(e, val)=> setValue(val)}>
          <Tab  label="Movies" />
          <Tab  label="Admin" />
          <Tab  label="Auth" />
         </Tabs>
        </Box>
       </Toolbar>
       </AppBar>
       </>
  )
}

export default Header
