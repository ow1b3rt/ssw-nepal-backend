import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { appointments } from "../../db/schema/appointment.js";

export const createAppointmentSchema = createInsertSchema(appointments);
export const updateAppointmentSchema = createUpdateSchema(appointments);
