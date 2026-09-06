import { Router } from "express";

import {
  commonCreateController,
  commonDeleteController,
  commonGetController,
  commonGetSingleController,
} from "../../common/feature/common.controller.js";
import { appointments } from "../../db/schema/appointment.js";
import { createAppointmentSchema } from "./appointment.schema.js";
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
    commonGetController(req, res, appointments),
  );

router
  .route("/:id")
  .all(authenticateUser, authorizePermissions("admin"))
  .get((req, res) => commonGetSingleController(req, res, appointments))
  .delete((req, res) => commonDeleteController(req, res, appointments));

export default router;
