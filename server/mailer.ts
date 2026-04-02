import nodemailer from "nodemailer";

export async function sendContactEmail(data: {
  naam: string;
  email: string;
  telefoonnummer: string;
  plaatsWoning: string;
  bericht: string;
}) {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn("SMTP niet geconfigureerd — e-mail niet verzonden.");
    return false;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const to = process.env.CONTACT_EMAIL || "info@salomonsmakelaardij.nl";

  console.log(`[mailer] Sending email via ${host}:${port} as ${user} to ${to}`);

  await transporter.sendMail({
    from: `"Salomons Makelaardij Website" <${user}>`,
    to,
    replyTo: data.email,
    subject: `Nieuwe taxatieaanvraag van ${data.naam}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #122939;">Nieuwe aanvraag via de website</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; font-weight: bold; width: 180px;">Naam</td>
            <td style="padding: 8px;">${data.naam}</td>
          </tr>
          <tr style="background: #f5f5f5;">
            <td style="padding: 8px; font-weight: bold;">E-mailadres</td>
            <td style="padding: 8px;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Telefoonnummer</td>
            <td style="padding: 8px;">${data.telefoonnummer}</td>
          </tr>
          <tr style="background: #f5f5f5;">
            <td style="padding: 8px; font-weight: bold;">Plaats woning</td>
            <td style="padding: 8px;">${data.plaatsWoning}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; vertical-align: top;">Bericht</td>
            <td style="padding: 8px; white-space: pre-wrap;">${data.bericht}</td>
          </tr>
        </table>
        <p style="color: #666; font-size: 12px; margin-top: 24px;">
          Dit bericht is verzonden via het contactformulier op salomonsmakelaardij.nl
        </p>
      </div>
    `,
  });

  console.log("[mailer] E-mail succesvol verzonden.");
  return true;
}
