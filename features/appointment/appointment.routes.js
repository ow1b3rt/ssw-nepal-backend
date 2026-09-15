import { Router } from "express";

import {
  commonCreateController,
  commonDeleteController,
  commonGetController,
  commonGetSingleController,
  commonUpdateController,
} from "../../common/feature/common.controller.js";
import { appointments } from "../../db/schema/appointment.js";
import {
  createAppointmentSchema,
  updateAppointmentSchema,
} from "./appointment.schema.js";
import {
  authenticateUser,
  authorizePermissions,
} from "../../common/authentication/auth.js";

export const router = Router();

router
  .route("/")
  .post((req, res) =>
    commonCreateController(req, res, appointments, createAppointmentSchema),
  )
  .get(authenticateUser, authorizePermissions("admin"), (req, res) =>
    commonGetController(
      req,
      res,
      appointments,

      [appointments.firstName, appointments.lastName, appointments.email, appointments.phone],
    ),
  );

router
  .route("/:id")
  .all(authenticateUser, authorizePermissions("admin"))
  .get((req, res) => commonGetSingleController(req, res, appointments))
  .patch((req, res) =>
    commonUpdateController(req, res, appointments, updateAppointmentSchema),
  )
  .delete((req, res) => commonDeleteController(req, res, appointments));

export default router;
