import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { gql, useMutation } from '@apollo/client';

import { Section } from './styles';

const useStyles = makeStyles((theme: Theme) => createStyles({

  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

  let inputRoomId:any;
  let inputTime:any;
  let inputUserId:any;

  const [createAppointment, { data }] = useMutation(CREATE_APPOINTMENT);

  if (data) {
    // eslint-disable-next-line no-alert
    alert(`Appointment for user ${data.createAppointment.userId} in the ${data.createAppointment.roomId} is successfully created`);
  }

  return (
    <Section>
      <h1>Register a new Room</h1>
      <form
        onSubmit={(e) => {
          const date = new Date(inputTime.value);

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
      <a href="/appointments">Back to appointments</a>
    </Section>

  );
};

export default CreateAppointment;
