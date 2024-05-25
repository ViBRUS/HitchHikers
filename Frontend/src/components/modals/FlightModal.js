// src/components/FlightModal.js
import React, { useState } from 'react';
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  Grid,
  MenuItem
} from '@mui/material';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles((theme) => ({
  const modalSx = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const paperSx = {
    backgroundColor: '#42a5f5',
    border: '2px solid #000',
    boxShadow: 5,
    padding: 4,
    borderRadius: 8,
  };
  const formControlSx = {
    marginBottom: 2,
  };
  const buttonSx = {
    marginTop: 2,
    backgroundColor: '#4caf50',
    '&:hover': {
      backgroundColor: '#388e3c',
    },
  };

const FlightModal = () => {
  // const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    flightNumber: '',
    departureCity: '',
    arrivalCity: '',
    departureDate: '',
    arrivalDate: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Flight Details:', form);
    // Handle form submission (e.g., send data to server)
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Flight Details
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        // className={classes.modal}
        aria-labelledby="flight-modal-title"
        aria-describedby="flight-modal-description"
        sx={modalSx}
      >
        <Box sx={paperSx}>
          <Typography variant="h6" id="flight-modal-title" gutterBottom>
            Flight Details
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={formControlSx}>
                <TextField
                  label="Flight Number"
                  name="flightNumber"
                  value={form.flightNumber}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6} sx={formControlSx}>
                <TextField
                  label="Departure City"
                  name="departureCity"
                  value={form.departureCity}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6} sx={formControlSx}>
                <TextField
                  label="Arrival City"
                  name="arrivalCity"
                  value={form.arrivalCity}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6} sx={formControlSx}>
                <TextField
                  label="Departure Date"
                  name="departureDate"
                  type="date"
                  value={form.departureDate}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6} sx={formControlSx}>
                <TextField
                  label="Arrival Date"
                  name="arrivalDate"
                  type="date"
                  value={form.arrivalDate}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={buttonSx}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default FlightModal;
