import { Router } from "express";
import {
  createEventController,
  getEventsController,
  updateEventController,
  deleteEventController,
  getSingleEventController,
} from "./events.controller.js";
import {
  authenticateUser,
  authorizePermissions,
} from "#/common/authentication/auth.js";

export const router = Router();

router.route("/")
  .all(authenticateUser, authorizePermissions('admin'))
  .post(createEventController)


router.route('/').get(getEventsController);

router.route("/:id")
  .get(getSingleEventController);

router.route("/:id")
  .all(authenticateUser, authorizePermissions('admin'))
  .patch(updateEventController)
  .delete(deleteEventController);

export default router;
