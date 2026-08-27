import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { contacts } from "#/db/schema/contact.js";

export const insertContactSchema = createInsertSchema(contacts)
export const updateContactSchema = createUpdateSchema(contacts)
