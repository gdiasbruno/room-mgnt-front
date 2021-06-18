import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { gql, useMutation, useQuery } from '@apollo/client';

import { Section } from './styles';

const useStyles = makeStyles((theme: Theme) => createStyles({

  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      display: 'flex',
      flexDirection: 'column',
    },
  },
}));

const CREATE_USER = gql`
  mutation createUser($data: CreateUserInput!) {
    createUser(data: $data) {
      email
    }
  }
`;

const Logon: React.FC = () => {
  const classes = useStyles();

  const history = useHistory();

  let inputName:any;
  let inputCompany:any;
  let inputEmail:any;
  let inputPassword:any;

  const [createUser, { data }] = useMutation(CREATE_USER);

  if (data) {
    alert(`User ${data.createUser.email} successfully created`);
  }

  return (
    <Section>
      <h1>Register</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createUser({
            variables: {
              data: {
                company: inputCompany.value,
                email: inputEmail.value,
                name: inputName.value,
                password: inputPassword.value,
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
          placeholder="E-mail"
          ref={(node) => {
            inputEmail = node;
          }}
        />
        <input
          placeholder="Password"
          type="password"
          ref={(node) => {
            inputPassword = node;
          }}
        />
        <Button type="submit" variant="contained">Register</Button>
      </form>
      <Link to="/">Login</Link>
    </Section>

  );
};

export default Logon;
