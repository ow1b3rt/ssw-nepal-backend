import { Router } from "express";
import { getTableColumns } from 'drizzle-orm'
import { insertAuthorSchema, updateAuthorSchema } from "./authors.schema.js";
import {
  commonGetController,
  commonGetSingleController,
  commonDeleteController,
} from "../../common/feature/common.controller.js";
import { authenticateUser, authorizePermissions } from "#/common/authentication/auth.js";
import { authors } from "../../db/schema/authors.js";
import { createAuthorController, updateAuthorController } from "./authors.controller.js";
import { join } from "#/common/utils/queryhelper.js";
import { eq } from "drizzle-orm";
import { users } from "#/db/schema/users.js";

const router = Router();

router.route("/")
  .post(authenticateUser, authorizePermissions('admin'), createAuthorController)
  .get((req, res) => commonGetController(req, res,
    join(authors, users, {
      on: eq(authors.userId, users.id),
      name: 'authors',
      fields: {
        ...getTableColumns(authors),
        name: users.name,
        email: users.email,
        avatar: users.avatar,
      },
    }),
  ));


router.route("/:id")
  .get((req, res) => commonGetSingleController(req, res, authors))
  .patch(authenticateUser, authorizePermissions('admin'), updateAuthorController)
  .delete(authenticateUser, authorizePermissions('admin'), (req, res) => commonDeleteController(req, res, authors));

export default router;
