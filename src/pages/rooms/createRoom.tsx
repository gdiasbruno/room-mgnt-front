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

  const history = useHistory();

  let inputName:any;
  let inputCompany:any;
  let inputStatus:any;

  const [createRoom, { data }] = useMutation(CREATE_ROOM);

  if (data) {
    alert(`Room ${data.createRoom.name} by company ${data.createRoom.company} successfully created`);
  }

  return (
    <>
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
      <a href="http://localhost:3000/rooms">Back to rooms</a>
    </>

  );
};

export default CreateRoom;
