import { z } from "zod";

export const contactSubmissionSchema = z.object({
  name: z.string().trim().min(1, { message: "Name cannot be empty" }).max(100),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  audience: z.string().trim().min(1, { message: "Please choose who you are" }).max(60),
  message: z
    .string()
    .trim()
    .min(1, { message: "Please tell us what you would like to discuss" })
    .max(2000),
});

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;

export function web3FormsAccessKey() {
  const value = import.meta.env["VITE_WEB3FORMS_ACCESS_KEY"];
  return typeof value === "string" ? value.trim() : "";
}
