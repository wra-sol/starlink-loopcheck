import React, {Fragment, useState} from 'react';
import {Typography, Button, Grid, Box} from '@mui/material';
import {v4 as uuidv4} from 'uuid';
import AddressInput from './components/AddressInput';
import AddressList from './components/AddressList';
import {useCoverageStatus} from './hooks/useCoverageStatus';
import {StyledContainer, StyledBox} from './components/StyledComponents';

function App () {
  const [addresses, setAddresses] = useState ([]);

  const handleAddAddress = address => {
    setAddresses (prevAddresses => [
      ...prevAddresses,
      {id: uuidv4 (), address, coverage: 'Not checked'},
    ]);
  };

  const handleRemoveAddress = id => {
    setAddresses (prevAddresses =>
      prevAddresses.filter (address => address.id !== id)
    );
  };

  const handleRemoveAll = () => {
    setAddresses ([]);
  };

  const coverageQuery = useCoverageStatus (addresses);

  const handleCheckCoverage = async () => {
    try {
      const queryResult = await coverageQuery.refetch ();
      const data = queryResult.data;

      const updateCoverage = address => {
        const coverageItem = data.find (item => item.id === address.id);
        return {
          address: coverageItem ? coverageItem.address : address.address,
          coverage: coverageItem ? coverageItem.coverage : 'Not available',
        };
      };

      if (data) setAddresses (prevAddresses => prevAddresses.map (updateCoverage));
    } catch (error) {
      console.error ('Failed to fetch coverage status:', error);
    }
  };

  return (
    <StyledContainer maxWidth="md" color="primary">

      <Typography variant="h4" color="primary">STARLINK</Typography> <Typography
        variant="h5"
        component="h1"
        color="primary"
        sx={{textAlign: 'center'}}
        gutterBottom
      >
        Bulk Address Coverage Checker
      </Typography>
      <StyledBox>
        <AddressInput onAddAddress={handleAddAddress} />
        <Grid container spacing={2} pb={2}>
          {addresses.length > 0 &&
            <Fragment>
              <Grid item>
                <Button variant="contained" onClick={handleCheckCoverage}>
                  Check Coverage
                </Button>
              </Grid><Grid item>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleRemoveAll}
                >
                  Remove All Addresses
                </Button>
              </Grid>
            </Fragment>}
          <Grid item  sm={10}/>
          {addresses.length > 0 &&
            <Grid item >
              <AddressList
                addresses={addresses}
                onRemove={handleRemoveAddress}
              />
            </Grid>}
        </Grid>
      </StyledBox>
    </StyledContainer>
  );
}
export default App;
