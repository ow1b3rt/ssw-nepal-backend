import { createUserSchema } from "../users/users.schema.js";
import { createUserService } from "../users/users.services.js";
import { insertAuthorSchema, updateAuthorSchema } from "./authors.schema.js";
import HttpError from "../../common/errors/HttpError.js";
import { StatusCodes } from "http-status-codes";
import { commonCreateService } from "../../common/feature/common.services.js";
import { authors } from "../../db/schema/index.js";
import { updateAuthorService } from "./authors.services.js";


export async function createAuthorController(req, res) {
  req.body.role = "author";
  const { data: userdata } = createUserSchema.safeParse(req.body);

  const user = await createUserService(userdata)
  if (!user) {
    throw new HttpError("Failed to create author user", StatusCodes.INTERNAL_SERVER_ERROR);
  }

  req.body.userId = user.id;
  const { data: authordata } = insertAuthorSchema.safeParse(req.body);

  const author = await commonCreateService(authors, authordata);
  if (!author) {
    throw new HttpError("Failed to create author profile", StatusCodes.INTERNAL_SERVER_ERROR);
  }

  res.status(StatusCodes.CREATED).json({
    success: true,
    author: {
      name: user.name,
      email: user.email,
      role: user.role,
      ...author,
    }
  });
}

export async function updateAuthorController(req, res) {
  const { id } = req.params;
  req.body.role = "author";

  const result = await updateAuthorService(id, req.body);

  res.status(StatusCodes.OK).json({
    success: true,
    ...result
  });
}
