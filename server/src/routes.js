import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import OperatorController from './app/controllers/OperatorController';
import AnimalController from './app/controllers/AnimalController';
import SessionController from './app/controllers/SessionController';
import OperatorSessionController from './app/controllers/OperatorSessionController';
import FileController from './app/controllers/FileController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import ClinicController from './app/controllers/ClinicController';
import ClinicSessionController from './app/controllers/ClinicSessionController';
import AvailableController from './app/controllers/AvailableController';
import HolidayController from './app/controllers/HolidayController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

routes.get('/holidays', HolidayController.index);
const bruteForce = new Brute(bruteStore);

routes.post('/sessions', bruteForce.prevent, SessionController.store);
routes.post(
  '/operators/sessions',
  bruteForce.prevent,
  OperatorSessionController.store
);
routes.post(
  '/clinics/sessions',
  bruteForce.prevent,
  ClinicSessionController.store
);

routes.use(authMiddleware);
routes.post('/users', UserController.store);
routes.get('/users', UserController.list);
routes.get('/users/:id', UserController.details);
routes.put('/users/:id', UserController.update);
routes.get('/users/animals/:userId', AnimalController.list);
routes.delete('/users/:id', UserController.delete);

routes.post('/animals/:userId', AnimalController.store);
routes.put('/animals/:animalId', AnimalController.update);
routes.get('/animals/:animalId', AnimalController.details);
routes.get('/animals/:userId/availabilities', AvailableController.index);

routes.post(
  '/users/:userId/animals/:animalId/appointments',
  AppointmentController.store
);
routes.get('/users/:userId/appointments', AppointmentController.index);

routes.post('/operators', OperatorController.store);
routes.get('/operators', OperatorController.list);
routes.get('/operators/:id', OperatorController.details);
routes.put('/operators/:id', OperatorController.update);
routes.delete('/operators/:id', OperatorController.delete);

routes.post('/clinics', ClinicController.store);
routes.get('/clinics', ClinicController.list);
routes.get('/clinics/:id', ClinicController.details);
routes.put('/clinics/:id', ClinicController.update);
routes.delete('/clinics/:id', ClinicController.delete);

// routes.get('/schedules', ScheduleController.index);
routes.get('/schedules', ScheduleController.list);
routes.get('/schedules/:clinicId', ScheduleController.index);
routes.get('/schedules/:id', ScheduleController.details);
routes.put('/schedules/:id', ScheduleController.update);
routes.delete('/schedules/:id', ScheduleController.delete);

// routes.post('/clinics/members', ClinicMemberController.store);
// routes.get('/clinics/:clinicId/available', AvailableController.index);

routes.post('/files', upload.single('file'), FileController.store);
routes.delete('/appointments/:id', AppointmentController.delete);

export default routes;
