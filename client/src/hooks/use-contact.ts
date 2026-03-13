import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { ContactInput, ContactSubmitResponse, ValidationError } from "@shared/routes";

export function useSubmitContact() {
  return useMutation<ContactSubmitResponse, Error | ValidationError, ContactInput>({
    mutationFn: async (data: ContactInput) => {
      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        // Construct a meaningful error to throw
        throw new Error(errorData.message || "Er is een fout opgetreden bij het verzenden.");
      }

      return res.json();
    },
  });
}
