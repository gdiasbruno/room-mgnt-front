import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Index from '../pages/login/index';
import Users from '../pages/users/index';
import Logon from '../pages/logon/index';
import Menu from '../pages/menu/index';
import Rooms from '../pages/rooms/index';
import CreateRoom from '../pages/rooms/createRoom';
import Appointments from '../pages/appointments/index';
import CreateAppointment from '../pages/appointments/createAppointment';
import UpdateUser from '../pages/users/updateUser';

const Routes: React.FC = () => (
  <>
    <Switch>
      <Route path="/" exact component={Index} />
      <Route path="/users" exact component={Users} />
      <Route path="/logon" exact component={Logon} />
      <Route path="/menu" exact component={Menu} />
      <Route path="/rooms" exact component={Rooms} />
      <Route path="/create_room" exact component={CreateRoom} />
      <Route path="/appointments" exact component={Appointments} />
      <Route path="/create_appointment" exact component={CreateAppointment} />
      <Route path="/update_user" exact component={UpdateUser} />
    </Switch>

  </>
);

export default Routes;
