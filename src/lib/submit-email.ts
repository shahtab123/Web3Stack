import nodemailer from "nodemailer";
import type { SubmissionPayload } from "@/lib/submit-types";

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "465");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const to = process.env.SUBMIT_TO_EMAIL ?? user;

  if (!host || !user || !pass || !to) {
    return null;
  }

  const secure =
    process.env.SMTP_SECURE === "true" || port === 465 || port === 995;

  return {
    host,
    port,
    secure,
    auth: { user, pass },
    to,
    from: process.env.SUBMIT_FROM_EMAIL ?? user,
  };
}

function formatSubmissionText(payload: SubmissionPayload) {
  const lines = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Social profile", payload.socialProfileUrl],
    ["Page", payload.page],
    ["Category", payload.category],
    ["Title", payload.title],
    ["Resource URL", payload.resourceUrl],
    ["GitHub URL", payload.githubUrl || "—"],
    ["Documentation URL", payload.documentationUrl || "—"],
    ["Description", payload.description],
    ["Why add this?", payload.why],
  ];

  return lines.map(([label, value]) => `${label}:\n${value}`).join("\n\n");
}

function formatSubmissionHtml(payload: SubmissionPayload) {
  const row = (label: string, value: string) =>
    `<tr><th align="left" style="padding:8px 12px 8px 0;vertical-align:top;color:#666">${label}</th><td style="padding:8px 0;word-break:break-word">${escapeHtml(value)}</td></tr>`;

  const optional = (label: string, value?: string) =>
    value ? row(label, value) : "";

  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#111">
<h2 style="margin:0 0 16px">New Web3Scout resource submission</h2>
<table style="border-collapse:collapse;width:100%;max-width:640px">
${row("Name", payload.name)}
${row("Email", payload.email)}
${row("Social profile", payload.socialProfileUrl)}
${row("Page", payload.page)}
${row("Category", payload.category)}
${row("Title", payload.title)}
${row("Resource URL", payload.resourceUrl)}
${optional("GitHub URL", payload.githubUrl)}
${optional("Documentation URL", payload.documentationUrl)}
${row("Description", payload.description)}
${row("Why add this?", payload.why)}
</table></body></html>`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function isSubmitEmailConfigured() {
  return getSmtpConfig() !== null;
}

export async function sendSubmissionEmail(payload: SubmissionPayload) {
  const config = getSmtpConfig();
  if (!config) {
    throw new Error("SMTP is not configured");
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
  });

  const subject = `[Web3Scout] Submission: ${payload.title} (${payload.page})`;

  await transporter.sendMail({
    from: `"Web3Scout Submissions" <${config.from}>`,
    to: config.to,
    replyTo: payload.email,
    subject,
    text: formatSubmissionText(payload),
    html: formatSubmissionHtml(payload),
  });
}
