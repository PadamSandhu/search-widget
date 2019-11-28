import React from 'react';
import {
  FormControl,
  InputLabel,
  InputAdornment,
  Input
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

import get from 'lodash/get';

import LocationOnIcon from '@material-ui/icons/LocationOn';
export const Trips = ({ type, handleChange, initialState }) => {
  const onChangeHandler = (event, idType) => {
    const outGoingObj = {};
    outGoingObj[type] = {};

    outGoingObj[type][idType] = idType.includes('date')
      ? event
      : event.target.value;

    handleChange({ ...outGoingObj });
  };
  return (
    <div className="air-canada-form">
      <form>
        <FormControl>
          <InputLabel htmlFor="input-with-icon-Location">
            Start your destination From
          </InputLabel>
          <Input
            id="input-with-icon-LocationOnIcon"
            value={get(initialState, `${type}.from`, '')}
            onChange={event => onChangeHandler(event, 'from')}
            placeholder="FROM"
            startAdornment={
              <InputAdornment position="start">
                <LocationOnIcon />
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="input-with-icon-adornment">
            Destination
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            value={get(initialState, `${type}.to`, '')}
            onChange={event => onChangeHandler(event, 'to')}
            placeholder="TO"
            startAdornment={
              <InputAdornment position="start">
                <LocationOnIcon />
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Departure Date"
              format="MM/dd/yyyy"
              value={get(initialState, `${type}.date1`, new Date())}
              onChange={event => onChangeHandler(event, 'date1')}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </MuiPickersUtilsProvider>
        </FormControl>

        <FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Arrival Date"
              format="MM/dd/yyyy"
              value={get(initialState, `${type}.date2`, new Date())}
              onChange={event => onChangeHandler(event, 'date2')}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </MuiPickersUtilsProvider>
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="input-with-icon-promo-code">
            Prove any promitional code
          </InputLabel>
          <Input
            id="input-with-icon-LocationOnIcon"
            value={get(initialState, `${type}.promoCode`, '')}
            onChange={event => onChangeHandler(event, 'promoCode')}
            placeholder="PROMOTION CODE"
            startAdornment={
              <InputAdornment position="start">
                <LocationOnIcon />
              </InputAdornment>
            }
          />
        </FormControl>

      </form>
    </div>
  );
};
