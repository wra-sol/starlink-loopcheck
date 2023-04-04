import React from 'react';
import { Grid, Typography, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import useIsMobile from '../hooks/useIsMobile';

const AddressGrid = styled(Grid)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const AddressText = styled(Typography)`
  flex-grow: 1;
  margin-right: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function CoverageStatusIcon({ status }) {
    const iconProps = { padding: '2px' };
    
    if (status === 'Available Now') {
      return (
        <Tooltip title={status} arrow>
          <CheckCircleOutlineIcon sx={{ color: 'success.main', ...iconProps }} />
        </Tooltip>
      );
    } else if (status === 'Expanding in in 2023') {
      return (
        <Tooltip title={status} arrow>
          <AccessTimeFilledIcon sx={{ color: 'warning.main', ...iconProps }} />
        </Tooltip>
      );
    } else if (status === 'Not checked') {
      return (
        <Tooltip title={status} arrow>
          <HelpOutlineIcon sx={{ color: 'info.main', ...iconProps }} />
        </Tooltip>
      );
    } else {
      return (
        <Tooltip title={status} arrow>
          <HighlightOffIcon sx={{ color: 'error.main', ...iconProps }} />
        </Tooltip>
      );
    }
  }
  

function AddressItem({ id, address, coverage, onRemove }) {
    const isMobile = useIsMobile();
  const handleRemove = () => {
    onRemove(id);
  };
  const maxWid = isMobile ? '70%': 'unset';
  return (
    <AddressGrid container spacing={2} sx={{ flexWrap: 'nowrap' , background:'rgba(200,200,200,.1)',padding:'20px', borderRadius:'5px', maxWidth:maxWid}}>
      <CoverageStatusIcon status={coverage} />
      <AddressText variant="body1" ml={2} color='primary'>
        {address}
      </AddressText>
      <IconButton edge="end" sx={{ color: 'error.main' }} onClick={handleRemove}>
        <DeleteIcon />
      </IconButton>
    </AddressGrid>
  );
}

export default AddressItem;
