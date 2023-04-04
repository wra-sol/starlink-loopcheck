// src/components/AddressList.js
import React from 'react';
import {Box} from '@mui/material';
import AddressItem from './AddressItem';

function AddressList({addresses, onRemove}) {
  return (
    <Box padding={2}>
      {addresses.map (address => (
        <Box item key={address.id}>
          <AddressItem
            id={address.id}
            address={address.address}
            coverage={address.coverage}
            onRemove={onRemove}
            key={`${address.id}-item`}
          />
        </Box>
      ))}
    </Box>
  );
}

export default AddressList;
