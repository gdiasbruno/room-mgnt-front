import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
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

const USERS = gql`
  query Users {
    users {
      id
      name
      company
      email
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id)
  }
`;

function FetchUsers() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(USERS);

  const [deleteUser] = useMutation(DELETE_USER);

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
              <TableCell align="right">Delete</TableCell>
              <TableCell align="right">Id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.users.map((row:any) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.company}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">
                  <button
                    type="button"
                    onClick={() => {
                      deleteUser({ variables: { id: row.id } });
                      window.location.reload();
                    }}
                  >
                    Delete
                  </button>

                </TableCell>
                <TableCell align="right">{row.id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

const Users: React.FC = () => (
  <Section>
    <h1>Users</h1>
    <br />
    <Link to="/update_user">Update User</Link>
    <br />
    <FetchUsers />
    <br />
    <Link to="/menu">Back to menu</Link>
  </Section>

);

export default Users;
