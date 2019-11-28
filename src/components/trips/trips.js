import React from 'react';
import {
  FormControl,
  InputLabel,
  InputAdornment,
  Input,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  DialogActions,
  Fab,
  Grid
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import NavigationIcon from '@material-ui/icons/Navigation';
import './trips.scss';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

import get from 'lodash/get';

import LocationOnIcon from '@material-ui/icons/LocationOn';

const passengerArray = [
  { type: 'adults', maxNoAllowed: 9, label: 'Adults (16+)' },
  { type: 'youth', maxNoAllowed: 9, label: 'Youth (12-15)' },
  { type: 'child', maxNoAllowed: 9, label: 'Child (2-11)' },
  { type: 'infantLap', maxNoAllowed: 9, label: 'Infant (On Lap)' },
  { type: 'infantSeat', maxNoAllowed: 9, label: 'Infant (In Seat)' }
];

export const Trips = ({
  type,
  handleChange,
  initialState,
  personCountOpen,
  setPersonCountOpen
}) => {
  const onChangeHandler = (event, idType = 'null') => {
    const outGoingObj = {};
    outGoingObj[type] = {};
    console.log('event', event);
    outGoingObj[type][idType] = idType.includes('date')
      ? event
      : event.target.value;

    handleChange({ ...outGoingObj });
  };
  return (
    <div className="air-canada-form">
      <form>
        <Grid
          container
          // spacing={3}
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs={12} sm={6} md={4}>
            <FormControl style={{width: "80%"}}>
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
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FormControl style={{width: "80%"}}>
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
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FormControl style={{width: "80%"}}>
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
          </Grid>

          {type === 'roundTrip' ? (
            <Grid item xs={12} sm={6} md={4}>
              <FormControl style={{width: "80%"}}>
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
            </Grid>
          ) : null}

          <Grid item xs={12} sm={6} md={4}>
            <FormControl style={{
              paddingTop: "30px",
              paddingBottom: "10px",
              width: "50%"
            }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setPersonCountOpen(true)}
              >
                Select Passengers
              </Button>
              <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={personCountOpen}
                onClose={() => setPersonCountOpen(false)}
              >
                <DialogTitle>Select No Of Travelers</DialogTitle>
                <DialogContent>
                  {passengerArray.map((item, index) => (
                    <FormControl
                      style={{
                        minWidth: '110px',
                        marginRight: '20px'
                      }}
                      key={`form-control-${item.type}`}
                    >
                      <InputLabel htmlFor={`input-for-${item.type}`}>
                        {item.label}
                      </InputLabel>
                      <Select
                        native
                        value={get(initialState, `${type}.${item.type}`, 0)}
                        onChange={event => onChangeHandler(event, item.type)}
                        input={<Input id={`${item.type}`} />}
                      >
                        {[...Array(item.maxNoAllowed + 1).keys()].map(
                          (data, id) =>
                            id === 0 && index === 0 ? null : (
                              <option key={`${item.type}-${data}`} value={data}>
                                {data}
                              </option>
                            )
                        )}
                      </Select>
                    </FormControl>
                  ))}
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setPersonCountOpen(false)}
                    color="primary"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setPersonCountOpen(false)}
                    color="primary"
                  >
                    Ok
                  </Button>
                </DialogActions>
              </Dialog>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
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
          </Grid>

          <Grid item xs={12}>
            <Fab style={{
              margin: "30px",
              minWidth: "200px"
            }} color="secondary" variant="extended">
              <NavigationIcon />
              Find
            </Fab>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
