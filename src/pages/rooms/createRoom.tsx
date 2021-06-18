import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { gql, useMutation } from '@apollo/client';

import { Section } from './styles';

const useStyles = makeStyles((theme: Theme) => createStyles({

  root: {
    display: 'flex',
    flexDirection: 'column',

    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const CREATE_ROOM = gql`
  mutation createRoom($data: CreateRoomInput!) {
    createRoom(data: $data) {
      company
      name
    }
  }
`;

const CreateRoom: React.FC = () => {
  const classes = useStyles();

  let inputName:any;
  let inputCompany:any;
  let inputStatus:any;

  const [createRoom, { data }] = useMutation(CREATE_ROOM);

  if (data) {
    // eslint-disable-next-line no-alert
    alert(`Room ${data.createRoom.name} by company ${data.createRoom.company} successfully created`);
  }

  return (
    <Section>
      <h1>Register a new Room</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createRoom({
            variables: {
              data: {
                company: inputCompany.value,
                status: inputStatus.value,
                name: inputName.value,
              },
            },
          });
        }}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <input
          placeholder="Name"
          ref={(node) => {
            inputName = node;
          }}
        />
        <input
          placeholder="Company"
          ref={(node) => {
            inputCompany = node;
          }}
        />
        <input
          placeholder="Status"
          ref={(node) => {
            inputStatus = node;
          }}
        />

        <Button type="submit" variant="contained">Register</Button>
      </form>
      <a href="/rooms">Back to rooms</a>
    </Section>

  );
};

export default CreateRoom;
