import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) => createStyles({

  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const Menu: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <h1>Menu</h1>

      <Button
        type="submit"
        variant="contained"
        onClick={() => { history.push('/users'); }}
      >
        Users
      </Button>
      <Button
        type="submit"
        variant="contained"
        onClick={() => { history.push('/rooms'); }}
      >
        Rooms
      </Button>
      <Button
        type="submit"
        variant="contained"
        onClick={() => { history.push('/appointments'); }}
      >
        Appointments
      </Button>

    </>

  );
};

export default Menu;
