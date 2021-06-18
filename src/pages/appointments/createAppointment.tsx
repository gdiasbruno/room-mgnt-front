import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { gql, useMutation, useQuery } from '@apollo/client';

const useStyles = makeStyles((theme: Theme) => createStyles({

  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const CREATE_APPOINTMENT = gql`
  mutation createAppointment($data: CreateAppointmentInput!) {
    createAppointment(data: $data) {
      id
      roomId
      time
      userId
    }
  }
`;

const CreateAppointment: React.FC = () => {
  const classes = useStyles();

  const history = useHistory();

  let inputRoomId:any;
  let inputTime:any;
  let inputUserId:any;

  const [createAppointment, { data }] = useMutation(CREATE_APPOINTMENT);

  if (data) {
    alert(`Appointment for user ${data.createAppointment.userId} in the ${data.createAppointment.roomId} is successfully created`);
  }

  return (
    <>
      <h1>Register a new Room</h1>
      <form
        onSubmit={(e) => {
          const date = new Date(inputTime.value);
          console.log(date);

          e.preventDefault();
          createAppointment({
            variables: {
              data: {
                roomId: parseFloat(inputRoomId.value),
                time: date.toISOString(),
                userId: parseFloat(inputUserId.value),
              },
            },
          });
        }}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <p>Room Id</p>
        <input
          type="number"
          placeholder="Room Id"
          ref={(node) => {
            inputRoomId = node;
          }}
        />
        <p>User Id</p>
        <input
          type="number"
          placeholder="User Id"
          ref={(node) => {
            inputUserId = node;
          }}
        />
        <p>Date</p>
        <input
          type="date"
          placeholder="Status"
          ref={(node) => {
            inputTime = node;
          }}
        />

        <Button type="submit" variant="contained">Register</Button>
      </form>
      <a href="http://localhost:3000/appointments">Back to appointments</a>
    </>

  );
};

export default CreateAppointment;
