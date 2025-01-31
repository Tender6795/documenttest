import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { FolderOpen } from '@mui/icons-material'; 

export const Header = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      bgcolor="#3182CE" 
      p={2}
      borderRadius={2}
    >
      <Avatar
        sx={{
          bgcolor: 'white', 
          width: 40,
          height: 40,
          marginRight: 2,
        }}
      >
        <FolderOpen sx={{ color: '#3182CE', fontSize: 30 }} /> 
      </Avatar>
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
        Legal Document Management Interface
      </Typography>
    </Box>
  );
};

export default Header;
