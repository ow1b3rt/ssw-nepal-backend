import * as t from "drizzle-orm/pg-core";
import { pkid, timestamps } from "./helpers.js";

export const appointmentStatusEnum = t.pgEnum("appointment_status", [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
]);

export const appointments = t.pgTable(
  "appointments",
  {
    ...pkid,
    ...timestamps,

    // Personal Information
    firstName: t.varchar("first_name", { length: 255 }).notNull(),
    lastName: t.varchar("last_name", { length: 255 }).notNull(),
    email: t.varchar("email", { length: 255 }).notNull(),
    phone: t.varchar("phone", { length: 20 }).notNull(),
    location: t.varchar("location", { length: 255 }), // "City, Country"

    purpose: t.varchar("purpose", { length: 255 }).notNull(),
    appointmentType: t.varchar("appointment_type", { length: 255 }),
    preferredTime: t.varchar("preferred_time", { length: 255 }),

    additionalInfo: t.text("additional_info"),

    status: appointmentStatusEnum("status").notNull().default("pending"),
  },
  (table) => ({
    emailIdx: t.index("appointments_email_idx").on(table.email),
    statusIdx: t.index("appointments_status_idx").on(table.status),
    createdAtIdx: t.index("appointments_created_at_idx").on(table.createdAt),
    purposeIdx: t.index("appointments_purpose_idx").on(table.purpose),
  }),
);
