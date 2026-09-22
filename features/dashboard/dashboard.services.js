import { db } from "../../config/db.js";
import { appointments } from "#/db/schema/appointment.js";
import { events } from "#/db/schema/events.js";
import { notices } from "#/db/schema/notices.js";
import { contacts } from "#/db/schema/contact.js";
import { successProfiles } from "#/db/schema/successProfiles.js";
import { testimonials } from "#/db/schema/testimonials.js";
import { sql, desc, asc, gte } from "drizzle-orm";

const RECENT_LIMIT = 5;

async function getAppointmentsSummary() {
  const [totalRow, recentAppointments] = await Promise.all([
    db.select({ total: sql`count(*)::int` }).from(appointments),
    db
      .select({
        id: appointments.id,
        firstName: appointments.firstName,
        lastName: appointments.lastName,
        purpose: appointments.purpose,
        status: appointments.status,
        createdAt: appointments.createdAt,
      })
      .from(appointments)
      .orderBy(desc(appointments.createdAt))
      .limit(RECENT_LIMIT),
  ]);

  return {
    totalAppointments: totalRow[0].total,
    recentAppointments,
  };
}

async function getEventsSummary() {
  const now = new Date();

  const [countRow, upcomingEvents] = await Promise.all([
    db
      .select({ upcomingEventsCount: sql`count(*)::int` })
      .from(events)
      .where(gte(events.time, now)),
    db
      .select({
        id: events.id,
        title: events.title,
        slug: events.slug,
        description: events.description,
        time: events.time,
        location: events.location,
      })
      .from(events)
      .where(gte(events.time, now))
      .orderBy(asc(events.time))
      .limit(RECENT_LIMIT),
  ]);

  return {
    upcomingEventsCount: countRow[0].upcomingEventsCount,
    upcomingEvents,
  };
}

async function getNoticesSummary() {
  const [totalRow, recentNotices] = await Promise.all([
    db.select({ total: sql`count(*)::int` }).from(notices),
    db
      .select({
        id: notices.id,
        title: notices.title,
        slug: notices.slug,
        description: notices.description,
        createdAt: notices.createdAt,
      })
      .from(notices)
      .orderBy(desc(notices.createdAt))
      .limit(RECENT_LIMIT),
  ]);

  return {
    totalNotices: totalRow[0].total,
    recentNotices,
  };
}

async function getContactsSummary() {
  const [totalRow, recentContacts] = await Promise.all([
    db.select({ total: sql`count(*)::int` }).from(contacts),
    db
      .select({
        id: contacts.id,
        name: contacts.name,
        email: contacts.email,
        subject: contacts.subject,
        phone: contacts.phone,
        message: contacts.message,
        createdAt: contacts.createdAt,
      })
      .from(contacts)
      .orderBy(desc(contacts.createdAt))
      .limit(RECENT_LIMIT),
  ]);

  return {
    totalContacts: totalRow[0].total,
    recentContacts,
  };
}

async function getSuccessProfilesSummary() {
  const [totalRow, recentSuccessProfiles] = await Promise.all([
    db.select({ total: sql`count(*)::int` }).from(successProfiles),
    db
      .select({
        id: successProfiles.id,
        name: successProfiles.name,
        batch: successProfiles.batch,
        profilePic: successProfiles.profilePic,
        description: successProfiles.description,
        createdAt: successProfiles.createdAt,
      })
      .from(successProfiles)
      .orderBy(desc(successProfiles.createdAt))
      .limit(RECENT_LIMIT),
  ]);

  return {
    totalSuccessProfiles: totalRow[0].total,
    recentSuccessProfiles,
  };
}

async function getTestimonialsSummary() {
  const [totalRow, recentTestimonials] = await Promise.all([
    db.select({ total: sql`count(*)::int` }).from(testimonials),
    db
      .select({
        id: testimonials.id,
        title: testimonials.title,
        name: testimonials.name,
        batch: testimonials.batch,
        image: testimonials.image,
        description: testimonials.description,
        createdAt: testimonials.createdAt,
      })
      .from(testimonials)
      .orderBy(desc(testimonials.createdAt))
      .limit(RECENT_LIMIT),
  ]);

  return {
    totalTestimonials: totalRow[0].total,
    recentTestimonials,
  };
}

export async function getDashboardSummaryService() {
  const [
    appointmentsSummary,
    eventsSummary,
    noticesSummary,
    contactsSummary,
    successProfilesSummary,
    testimonialsSummary,
  ] = await Promise.all([
    getAppointmentsSummary(),
    getEventsSummary(),
    getNoticesSummary(),
    getContactsSummary(),
    getSuccessProfilesSummary(),
    getTestimonialsSummary(),
  ]);

  return {
    ...appointmentsSummary,
    ...eventsSummary,
    ...noticesSummary,
    ...contactsSummary,
    ...successProfilesSummary,
    ...testimonialsSummary,
  };
}
