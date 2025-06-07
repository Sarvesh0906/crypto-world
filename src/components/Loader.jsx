import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loader = () => (
  <Box className="flex justify-center items-center h-[60vh]">
    <CircularProgress />
  </Box>
);

export default Loader;
