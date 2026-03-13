import { db } from "./db";
import { contactSubmissions } from "@shared/schema";
import type { CreateContactRequest, ContactResponse } from "@shared/schema";

export interface IStorage {
  createContactSubmission(data: CreateContactRequest): Promise<ContactResponse>;
  getContactSubmissions(): Promise<ContactResponse[]>;
}

export class DatabaseStorage implements IStorage {
  async createContactSubmission(
    data: CreateContactRequest
  ): Promise<ContactResponse> {
    const [submission] = await db
      .insert(contactSubmissions)
      .values(data)
      .returning();
    return submission;
  }

  async getContactSubmissions(): Promise<ContactResponse[]> {
    return await db.select().from(contactSubmissions);
  }
}

export const storage = new DatabaseStorage();
