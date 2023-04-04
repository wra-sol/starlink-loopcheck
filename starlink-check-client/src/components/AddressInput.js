// src/components/AddressInput.js
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import styled from '@emotion/styled';

const FormBox = styled(Box)`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

function AddressInput({ onAddAddress }) {
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (address.trim()) {
      onAddAddress(address.trim());
  
      // Send a GA4 event
      window.gtag('event', 'add_address', {
        'event_category': 'address',
        'event_label': address.trim(),
      });
  
      setAddress('');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormBox>
        <TextField
          fullWidth
          label="Enter address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Add
        </Button>
      </FormBox>
    </form>
  );
}

export default AddressInput;
