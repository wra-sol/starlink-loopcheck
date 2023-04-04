// src/hooks/useCoverageStatus.js
import { useQuery } from 'react-query';

const fetchCoverageStatus = async (addresses) => {
  const response = await fetch('/locations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ addresses }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch coverage status');
  }
  return response.json();
};

export const useCoverageStatus = (locations) => {
  return useQuery(
    ['coverageStatus', locations],
    () => fetchCoverageStatus(locations),
    {
      enabled: !!locations && locations.length > 0,
    },
  );
};