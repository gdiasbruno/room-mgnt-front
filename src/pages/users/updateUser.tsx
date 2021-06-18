import React from 'react';
import { useHistory } from 'react-router-dom';
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

const UPDATE_USER = gql`
  mutation updateUser($data: UpdateUserInput!, $id: String!) {
    updateUser(data: $data, id: $id) {
      name
      id
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
  let inputId:any;
  let inputPassword:any;

  const [updateUser, { data }] = useMutation(UPDATE_USER);

  if (data) {
    // eslint-disable-next-line no-alert
    alert(`User ${data.updateUser.email} successfully updated`);
  }

  return (
    <Section>
      <h1>Update</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateUser({
            variables: {
              data: {
                company: inputCompany.value,
                email: inputEmail.value,
                name: inputName.value,
                password: inputPassword.value,
              },
              id: inputId.value,
            },
          });
        }}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <input
          type="number"
          placeholder="Id"
          ref={(node) => {
            inputId = node;
          }}
        />
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

        <Button type="submit" variant="contained">Update</Button>
      </form>
      <a href="/users">Back to Users</a>
    </Section>

  );
};

export default Logon;
