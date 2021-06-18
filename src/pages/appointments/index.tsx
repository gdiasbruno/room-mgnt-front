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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const APPOINTMENTS = gql`
  query Appointments {
    appointments {
      id
      roomId
      time
      userId
    }
  }
`;

const DELETE_APPOINTMENT = gql`
  mutation deleteAppointment($id: Float!) {
    deleteAppointment(id: $id)
  }
`;

function FetchAppointments() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(APPOINTMENTS);

  const [deleteAppointment] = useMutation(DELETE_APPOINTMENT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Room Id</TableCell>
              <TableCell align="right">User Id</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.appointments.map((row:any) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.roomId}
                </TableCell>
                <TableCell align="right">{row.userId}</TableCell>
                <TableCell align="right">{row.time}</TableCell>
                <TableCell align="right">
                  <button
                    type="button"
                    onClick={() => {
                      console.log(typeof parseFloat(row.id));
                      deleteAppointment({ variables: { id: parseFloat(row.id) } });
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
    <>
      <h1>Appointments</h1>
      <Link to="/create_appointment">Create an Appointment</Link>
      <FetchAppointments />
      <Link to="/menu">Back to menu</Link>
    </>

  );
};

export default Rooms;
