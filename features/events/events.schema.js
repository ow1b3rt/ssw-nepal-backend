import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { events } from "#/db/schema/events.js";

export const insertEventSchema = createInsertSchema(events)
export const updateEventSchema = createUpdateSchema(events)
