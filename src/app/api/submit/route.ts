import { NextResponse } from "next/server";
import { sendSubmissionEmail } from "@/lib/submit-email";
import type { SubmissionPayload } from "@/lib/submit-types";

const PAGE_OPTIONS = new Set([
  "APIs",
  "Recipes",
  "Ideas",
  "Ecosystems",
  "Grants",
  "Builder Intel",
  "Crypto Stocks",
  "Other",
]);

function trim(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function optionalUrl(value: unknown): string | undefined {
  const trimmed = trim(value);
  return trimmed.length > 0 ? trimmed : undefined;
}

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function parsePayload(body: unknown): SubmissionPayload | { error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request body" };
  }

  const record = body as Record<string, unknown>;

  const payload: SubmissionPayload = {
    name: trim(record.name),
    email: trim(record.email),
    socialProfileUrl: trim(record.socialProfileUrl),
    page: trim(record.page),
    category: trim(record.category),
    title: trim(record.title),
    resourceUrl: trim(record.resourceUrl),
    githubUrl: optionalUrl(record.githubUrl),
    documentationUrl: optionalUrl(record.documentationUrl),
    description: trim(record.description),
    why: trim(record.why),
  };

  if (!payload.name) return { error: "Name is required" };
  if (!isValidEmail(payload.email)) return { error: "A valid email is required" };
  if (!payload.socialProfileUrl || !isValidUrl(payload.socialProfileUrl)) {
    return { error: "A valid social profile URL is required" };
  }
  if (!PAGE_OPTIONS.has(payload.page)) return { error: "Invalid page selection" };
  if (!payload.category) return { error: "Category is required" };
  if (!payload.title) return { error: "Title is required" };
  if (!payload.resourceUrl || !isValidUrl(payload.resourceUrl)) {
    return { error: "A valid resource URL is required" };
  }
  if (payload.githubUrl && !isValidUrl(payload.githubUrl)) {
    return { error: "GitHub URL must be a valid http(s) URL" };
  }
  if (payload.documentationUrl && !isValidUrl(payload.documentationUrl)) {
    return { error: "Documentation URL must be a valid http(s) URL" };
  }
  if (!payload.description) return { error: "Description is required" };
  if (!payload.why) return { error: "Please explain why this should be added" };

  return payload;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = parsePayload(body);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    await sendSubmissionEmail(parsed);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[submit] Failed to send email:", error);
    return NextResponse.json(
      {
        error:
          "Could not send your submission. Please try again later or contribute on GitHub.",
      },
      { status: 503 },
    );
  }
}
