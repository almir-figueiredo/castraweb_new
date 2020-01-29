import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Initial from '../pages/Initial';

import OperatorSignin from '../pages/OperatorSignin';
import Operators from '../pages/Operators';
import OperatorNew from '../pages/Operators/OperatorNew';
import OperatorEdit from '../pages/Operators/OperatorEdit';

import ClinicSignin from '../pages/ClinicSignin';
import Clinics from '../pages/Clinics';
import ClinicNew from '../pages/Clinics/ClinicNew';
import ClinicEdit from '../pages/Clinics/ClinicEdit';
import ClinicSchedules from '../pages/Schedules';
import Calendar from '../pages/Clinics/ClinicCalendar';

// import ScheduleNew from '../pages/Schedules';

import Users from '../pages/Users';
import UserNew from '../pages/Users/UserNew';
import UserEdit from '../pages/Users/UserEdit';

import UserAnimals from '../pages/Users/UserAnimals';
import AnimalNew from '../pages/Animals/AnimalNew';
import AnimalEdit from '../pages/Animals/AnimalEdit';

import Appointments from '../pages/Appointments';
import Profile from '../pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Initial} />
      <Route path="/signin-operator" exact component={OperatorSignin} />
      <Route path="/operators" exact component={Operators} isPrivate />
      <Route path="/operators/new" exact component={OperatorNew} isPrivate />
      <Route
        path="/operators/edit/:id"
        exact
        component={OperatorEdit}
        isPrivate
      />
      <Route path="/signin-clinic" exact component={ClinicSignin} />
      <Route path="/clinics" exact component={Clinics} isPrivate />
      <Route path="/clinics/new" exact component={ClinicNew} isPrivate />
      <Route path="/clinics/edit/:id" exact component={ClinicEdit} isPrivate />
      <Route
        path="/clinics/schedules/:id/:date"
        exact
        component={ClinicSchedules}
        isPrivate
      />
      <Route
        path="/clinics/calendar/:id"
        exact
        component={Calendar}
        isPrivate
      />
      {/* <Route
        path="/schedules/new/"
        exact
        component={ScheduleNew}
        isPrivate
      />
      <Route
        path="/schedules/edit/:id"
        exact
        component={ScheduleEdit}
        isPrivate
      /> */}
      <Route path="/users" exact component={Users} isPrivate />
      <Route path="/users/new" exact component={UserNew} isPrivate />
      <Route path="/users/edit/:id" exact component={UserEdit} isPrivate />
      <Route
        path="/users/:id/animals"
        exact
        component={UserAnimals}
        isPrivate
      />
      <Route
        path="/users/:id/animals/new"
        exact
        component={AnimalNew}
        isPrivate
      />
      <Route
        path="/users/:userId/animals/edit/:id"
        exact
        component={AnimalEdit}
        isPrivate
      />
      <Route
        path="/users/:userId/animals/appointment"
        exact
        component={Appointments}
        isPrivate
      />
      <Route path="/profile" exact component={Profile} isPrivate />
    </Switch>
  );
}
