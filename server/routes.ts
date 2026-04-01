import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { sendContactEmail } from "./mailer";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);

      const submission = await storage.createContactSubmission(input);

      sendContactEmail(input).catch((err) => {
        console.error("E-mail verzenden mislukt:", err);
      });

      res.status(201).json({ message: "Aanvraag succesvol verzonden!", id: submission.id });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      console.error("Contact submission error:", err);
      res.status(500).json({ message: "Er is een fout opgetreden. Probeer het later opnieuw." });
    }
  });

  return httpServer;
}
