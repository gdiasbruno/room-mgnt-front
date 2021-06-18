import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Section } from './styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ROOMS = gql`
  query Rooms {
    rooms {
      id
      company
      name
      status
    }
  }
`;

const DELETE_ROOM = gql`
  mutation deleteRoom($id: String!) {
    deleteRoom(id: $id)
  }
`;

function FetchRooms() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(ROOMS);

  const [deleteRoom] = useMutation(DELETE_ROOM);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Company</TableCell>
              <TableCell align="right">E-mail</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.rooms.map((row:any) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.company}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">
                  <button
                    type="button"
                    onClick={() => {
                      deleteRoom({ variables: { id: row.id } });
                      window.location.reload();
                    }}
                  >
                    Delete
                  </button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

const Rooms: React.FC = () => {
  const classes = useStyles();

  return (
    <Section>
      <h1>Rooms</h1>
      <br />
      <Link to="/create_room">Register a room</Link>
      <br />
      <FetchRooms />
      <br />
      <Link to="/menu">Back to menu</Link>
    </Section>

  );
};

export default Rooms;
