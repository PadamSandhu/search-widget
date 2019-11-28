import React from 'react';
import MContainer from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import Tabs from './tabs';

export const Container = () => {
  return (
    <MContainer maxWidth="xl">
      <Paper
        style={{
          paddingBottom: '30px'
        }}
      >
        <Typography variant="h5" component="h3">
          Flights
        </Typography>
        <Tabs />
      </Paper>
    </MContainer>
  );
};
