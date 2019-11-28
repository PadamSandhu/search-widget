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

export const FlightTabs = () => {
  const [value, setValue] = React.useState(0);
  const [formState, setFormState] = React.useState({});

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

  useEffect(() => {
    // Set intial State
    const object = {};
    const currentDate = new Date();
    object[tabContentArray[0].type] = {};
    object[tabContentArray[0].type].date1 = currentDate;
    object[tabContentArray[0].type].date2 = new Date(currentDate.getTime() + 5 * 24 * 60 * 60 * 1000);
    setFormState({ ...object });
  }, []);

  const tabHandleChange = (event, newValue) => {
    setValue(newValue);
    // Reset Form
    setFormState({});
  };

  const formHandler = incomingObj => {
    setFormState(defaultsDeep(incomingObj, formState));
    console.log('incomingObj', incomingObj);
  };
  console.log('state', formState);

  return (
    <div className="tabs-container">
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

      <TabContent>
        <RoundTrip
          type={tabContentArray[value].type}
          handleChange={formHandler}
          initialState={formState}
        />
      </TabContent>
    </div>
  );
};
