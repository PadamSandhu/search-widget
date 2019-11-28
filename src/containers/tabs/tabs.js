import React, { useEffect } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import LastPageIcon from '@material-ui/icons/LastPage';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import defaultsDeep from 'lodash/defaultsDeep';

import { TabContent } from './tabContent';
import RoundTrip from '../../components/trips';
import './tabs.scss';

const defaultStateObject = {
  roundTrip: {
    date1: new Date(),
    date2: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
    adults: 1
  },
  oneWay: {
    date1: new Date(),
    adults: 1
  },
  multiCity: {
    date1: new Date(),
    adults: 1
  }
};

export const FlightTabs = () => {
  const [value, setValue] = React.useState(0);
  const [personCountOpen, setPersonCountOpen] = React.useState(false);
  const [formState, setFormState] = React.useState({ ...defaultStateObject });

  const tabContentArray = [
    {
      type: 'roundTrip',
      index: 0
    },
    {
      type: 'oneWay',
      index: 1
    },
    {
      type: 'multiCity',
      index: 2
    }
  ];

  const tabHandleChange = (event, newValue) => {
    setValue(newValue);
  };

  const formHandler = incomingObj => {
    setFormState(defaultsDeep(incomingObj, formState));
    console.log('incomingObj', incomingObj);
  };
  console.log('state', formState);

  return (
    <div className="tabs-container">
      <div className="tabs-container__tabs">
        <Tabs
          value={value}
          onChange={tabHandleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="Select the type of trip"
        >
          <Tab icon={<AllInclusiveIcon />} label="Round-trip" />
          <Tab icon={<LastPageIcon />} label="One-way" />
          <Tab icon={<AirportShuttleIcon />} label="Multi-city" />
        </Tabs>
      </div>
      <div className="tabs-container__tabs-content">
        <TabContent>
          <RoundTrip
            type={tabContentArray[value].type}
            handleChange={formHandler}
            initialState={formState}
            personCountOpen={personCountOpen}
            setPersonCountOpen={setPersonCountOpen}
          />
        </TabContent>
      </div>
    </div>
  );
};
