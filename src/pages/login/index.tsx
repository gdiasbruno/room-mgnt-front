import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { gql, useMutation } from '@apollo/client';

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

const LOGIN = gql`
  mutation login($data: AuthInput!) {
    login(data: $data) {
      token
    }
  }
`;

const Index: React.FC = () => {
  const classes = useStyles();

  const history = useHistory();

  let inputEmail:any;
  let inputPassword:any;

  const [login, { data }] = useMutation(LOGIN);

  if (data) {
    localStorage.setItem('token', data.login.token);
    history.push('/menu');
  }

  return (
    <Section>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login({
            variables: {
              data: {
                email: inputEmail.value,
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
        <Button type="submit" variant="contained">Login</Button>
      </form>

      <Link to="/logon">Create new user</Link>
    </Section>

  );
};

export default Index;
