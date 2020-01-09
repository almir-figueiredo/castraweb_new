import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Initial from '../pages/Initial';

import OperatorSignin from '../pages/OperatorSignin';
import Operators from '../pages/Operators';
import OperatorDetails from '../pages/Operators/OperatorDetails';

import ClinicSignin from '../pages/ClinicSignin';
import Clinics from '../pages/Clinics';
import ClinicDetails from '../pages/Clinics/ClinicDetails';
import ClinicSchedules from '../pages/Schedules';
import Calendar from '../pages/Clinics/ClinicCalendar';

// import ScheduleDetails from '../pages/Schedules';

import Users from '../pages/Users';
import UserDetails from '../pages/Users/UserDetails';

import UserAnimals from '../pages/Users/UserAnimals';
import AnimalDetails from '../pages/Animals/AnimalDetails';

import Profile from '../pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Initial} />
      <Route path="/signin-operator" exact component={OperatorSignin} />
      <Route path="/operators" exact component={Operators} isPrivate />
      <Route
        path="/operators/details/"
        exact
        component={OperatorDetails}
        isPrivate
      />
      <Route
        path="/operators/details/:id"
        exact
        component={OperatorDetails}
        isPrivate
      />
      <Route path="/signin-clinic" exact component={ClinicSignin} />
      <Route path="/clinics" exact component={Clinics} isPrivate />
      <Route
        path="/clinics/details/"
        exact
        component={ClinicDetails}
        isPrivate
      />
      <Route
        path="/clinics/details/:id"
        exact
        component={ClinicDetails}
        isPrivate
      />
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
        path="/schedules/details/"
        exact
        component={ScheduleDetails}
        isPrivate
      />
      <Route
        path="/schedules/details/:id"
        exact
        component={ScheduleDetails}
        isPrivate
      /> */}
      <Route path="/users" exact component={Users} isPrivate />
      <Route path="/users/details/" exact component={UserDetails} isPrivate />
      <Route
        path="/users/details/:id"
        exact
        component={UserDetails}
        isPrivate
      />
      <Route path="/animals/:id" exact component={UserAnimals} isPrivate />
      <Route
        path="/animals/details/:id"
        exact
        component={AnimalDetails}
        isPrivate
      />
      <Route path="/profile" exact component={Profile} isPrivate />
    </Switch>
  );
}
