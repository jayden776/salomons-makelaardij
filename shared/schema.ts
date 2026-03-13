import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  naam: text("naam").notNull(),
  email: text("email").notNull(),
  telefoonnummer: text("telefoonnummer").notNull(),
  plaatsWoning: text("plaats_woning").notNull(),
  bericht: text("bericht").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export type CreateContactRequest = InsertContact;
export type ContactResponse = ContactSubmission;
