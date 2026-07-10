import { Resend } from "resend";
import { siteConfig } from "@/lib/data";

export type ContactMailPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml(payload: ContactMailPayload): string {
  const rows: [string, string][] = [
    ["Họ tên", payload.name],
    ["Email", payload.email],
    ["Điện thoại", payload.phone ?? "—"],
    ["Công ty", payload.company ?? "—"],
    ["Dịch vụ", payload.service ?? "—"],
    ["Ngân sách", payload.budget ?? "—"],
    ["Nội dung", payload.message],
  ];

  const body = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e5e5e5;font-weight:600;width:140px">${escapeHtml(label)}</td><td style="padding:8px 12px;border:1px solid #e5e5e5;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `<div style="font-family:system-ui,sans-serif;color:#111"><h2 style="margin:0 0 16px">Liên hệ mới — ${escapeHtml(siteConfig.name)}</h2><table style="border-collapse:collapse;width:100%;max-width:640px">${body}</table></div>`;
}

/**
 * Sends contact notification to CONTACT_TO_EMAIL (default: siteConfig.email).
 * Uses Resend when RESEND_API_KEY is set; otherwise FormSubmit (one-time email confirm).
 */
export async function sendContactNotification(
  payload: ContactMailPayload,
): Promise<{ ok: boolean; provider: string; error?: string }> {
  const to =
    process.env.CONTACT_TO_EMAIL?.trim() || siteConfig.email || "namdoan.ka@gmail.com";
  const subject = `[${siteConfig.name}] Liên hệ mới từ ${payload.name}`;
  const html = buildHtml(payload);

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const from =
        process.env.CONTACT_FROM_EMAIL?.trim() ||
        "Sergio Agency <onboarding@resend.dev>";
      const { error } = await resend.emails.send({
        from,
        to: [to],
        replyTo: payload.email,
        subject,
        html,
      });
      if (error) {
        return { ok: false, provider: "resend", error: error.message };
      }
      return { ok: true, provider: "resend" };
    } catch (err) {
      return {
        ok: false,
        provider: "resend",
        error: err instanceof Error ? err.message : "Resend failed",
      };
    }
  }

  try {
    const res = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(to)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          phone: payload.phone ?? "",
          company: payload.company ?? "",
          service: payload.service ?? "",
          budget: payload.budget ?? "",
          message: payload.message,
          _subject: subject,
          _template: "table",
          _captcha: "false",
          _replyto: payload.email,
        }),
      },
    );

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return {
        ok: false,
        provider: "formsubmit",
        error: text || `HTTP ${res.status}`,
      };
    }

    return { ok: true, provider: "formsubmit" };
  } catch (err) {
    return {
      ok: false,
      provider: "formsubmit",
      error: err instanceof Error ? err.message : "FormSubmit failed",
    };
  }
}
