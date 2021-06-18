import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { Section } from './styles';

const useStyles = makeStyles((theme: Theme) => createStyles({

  button: {
    margin: '10px',
  },
}));

const Menu: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Section>
      <h1>Menu</h1>

      <Button
        type="submit"
        variant="contained"
        href="/users"
        // onClick={() => { history.push('/users'); }}
        className={classes.button}
      >
        Users
      </Button>
      <Button
        type="submit"
        variant="contained"
        onClick={() => { history.push('/rooms'); }}
        className={classes.button}
      >
        Rooms
      </Button>
      <Button
        type="submit"
        variant="contained"
        onClick={() => { history.push('/appointments'); }}
        className={classes.button}
      >
        Appointments
      </Button>
      <Link to="/">Logout</Link>
    </Section>

  );
};

export default Menu;
