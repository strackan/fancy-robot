"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const company = formData.get("company") as string;
  const email = formData.get("email") as string;
  const product = formData.get("product") as string;

  if (!name || !company || !email || !product) {
    return { success: false, error: "All fields are required." };
  }

  try {
    await resend.emails.send({
      from: "Fancy Robot <onboarding@resend.dev>",
      to: "strackan@gmail.com",
      replyTo: email,
      subject: `New AI Visibility Score Request — ${company}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>What they sell:</strong> ${product}</p>
      `,
    });

    return { success: true };
  } catch {
    return { success: false, error: "Failed to send message. Please try again." };
  }
}
