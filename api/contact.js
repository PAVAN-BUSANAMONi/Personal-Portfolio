const nodemailer = require("nodemailer");
const path = require("path");

const OWNER_NAME = "PAVAN BUSANAMONi";
const OWNER_EMAIL = process.env.CONTACT_RECEIVER_EMAIL ? process.env.CONTACT_RECEIVER_EMAIL.trim() : "pavan.busanamoni@gmail.com";
const MAIL_USER = process.env.MAIL_USER ? process.env.MAIL_USER.trim() : "personal.portfolio.pavan@gmail.com";
const MAIL_APP_PASSWORD = process.env.MAIL_APP_PASSWORD ? process.env.MAIL_APP_PASSWORD.trim() : undefined;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: MAIL_USER,
    pass: MAIL_APP_PASSWORD,
  },
});

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function detailRow(label, value, highlight = false) {
  return `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #e6edf5;color:#64748b;font-weight:700;width:35%;min-width:90px;font-size:14px;word-break:break-word;">${label}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e6edf5;color:#0f172a;font-size:14px;word-break:break-word;${
        highlight ? "font-weight:800;background:#ecfeff;" : ""
      }">${escapeHtml(value || "Not provided")}</td>
    </tr>
  `;
}

function getPriorityTheme(priority = "") {
  const normalized = priority.toLowerCase();

  if (normalized.includes("high")) {
    return {
      label: "Immediate attention",
      accent: "#e11d48",
      bg: "#fff1f2",
      border: "#fb7185",
      text: "#9f1239",
    };
  }

  if (normalized.includes("quick")) {
    return {
      label: "Quick response",
      accent: "#0284c7",
      bg: "#f0f9ff",
      border: "#38bdf8",
      text: "#075985",
    };
  }

  if (normalized.includes("future")) {
    return {
      label: "Future opportunity",
      accent: "#7c3aed",
      bg: "#f5f3ff",
      border: "#a78bfa",
      text: "#5b21b6",
    };
  }

  return {
    label: "Normal follow-up",
    accent: "#d97706",
    bg: "#fffbeb",
    border: "#fbbf24",
    text: "#92400e",
  };
}

function getNeedTheme(need = "") {
  const normalized = need.toLowerCase();

  if (normalized.includes("hiring") || normalized.includes("internship")) {
    return {
      label: "Career / Hiring",
      accent: "#059669",
      bg: "#ecfdf5",
      border: "#34d399",
      text: "#065f46",
    };
  }

  if (normalized.includes("freelance")) {
    return {
      label: "Paid project",
      accent: "#9333ea",
      bg: "#faf5ff",
      border: "#c084fc",
      text: "#6b21a8",
    };
  }

  if (normalized.includes("collaboration")) {
    return {
      label: "Collaboration",
      accent: "#0891b2",
      bg: "#ecfeff",
      border: "#22d3ee",
      text: "#155e75",
    };
  }

  if (normalized.includes("technical")) {
    return {
      label: "Technical discussion",
      accent: "#2563eb",
      bg: "#eff6ff",
      border: "#60a5fa",
      text: "#1e40af",
    };
  }

  return {
    label: "General message",
    accent: "#475569",
    bg: "#f8fafc",
    border: "#94a3b8",
    text: "#334155",
  };
}

function badge(value, theme) {
  return `
    <span style="display:inline-block;padding:7px 11px;border-radius:999px;background:${theme.bg};border:1px solid ${theme.border};color:${theme.text};font-weight:900;font-size:13px;text-transform:uppercase;letter-spacing:.03em;">
      ${escapeHtml(value)}
    </span>
  `;
}

function highlightedRow(label, value, theme, note) {
  return `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #e6edf5;color:#64748b;font-weight:800;width:35%;min-width:90px;font-size:14px;word-break:break-word;">${label}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e6edf5;background:${theme.bg};border-left:5px solid ${theme.accent};color:${theme.text};word-break:break-word;">
        <div style="font-size:15px;font-weight:950;line-height:1.2;">${escapeHtml(
          value || "Not provided"
        )}</div>
        <div style="margin-top:4px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.04em;color:${theme.text};opacity:.82;line-height:1.2;">${escapeHtml(
          note
        )}</div>
      </td>
    </tr>
  `;
}

function notificationTemplate(data) {
  const priorityTheme = getPriorityTheme(data.priority);
  const needTheme = getNeedTheme(data.need);

  return `
    <div style="font-family:Inter,Arial,sans-serif;background:#f5f8fb;padding:12px;">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #dbe6f0;border-radius:14px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#0f172a,#164e63);padding:24px 20px;color:#ffffff;">
          <p style="margin:0 0 10px;color:#67e8f9;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.04em;">Portfolio Contact Request</p>
          <h1 style="margin:0;font-size:24px;line-height:1.2;">${escapeHtml(
            data.priority
          )} from ${escapeHtml(data.name)}</h1>
          <p style="margin:10px 0 0;font-size:14px;color:#d1fae5;font-weight:700;">${escapeHtml(
            data.need
          )} • Reply by ${escapeHtml(data.reply)}</p>
        </div>
        <div style="padding:15px;background:#ffffff;">
          <div style="margin-bottom:10px;border:1px solid ${needTheme.border};border-left:5px solid ${needTheme.accent};border-radius:12px;background:${needTheme.bg};padding:14px;">
            <div style="margin-bottom:6px;color:${needTheme.text};font-size:11px;font-weight:950;text-transform:uppercase;letter-spacing:.08em;">Contact Need</div>
            <div style="color:${needTheme.text};font-size:18px;font-weight:950;line-height:1.25;word-break:break-word;">${escapeHtml(
              data.need
            )}</div>
            <div style="margin-top:6px;">${badge(
              needTheme.label,
              needTheme
            )}</div>
          </div>
          <div style="margin-bottom:0;border:1px solid ${priorityTheme.border};border-left:5px solid ${priorityTheme.accent};border-radius:12px;background:${priorityTheme.bg};padding:14px;">
            <div style="margin-bottom:6px;color:${priorityTheme.text};font-size:11px;font-weight:950;text-transform:uppercase;letter-spacing:.08em;">Priority</div>
            <div style="color:${priorityTheme.text};font-size:18px;font-weight:950;line-height:1.25;word-break:break-word;">${escapeHtml(
              data.priority
            )}</div>
            <div style="margin-top:6px;">${badge(
              priorityTheme.label,
              priorityTheme
            )}</div>
          </div>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:15px;">
          ${detailRow("Receiver", OWNER_NAME, true)}
          ${detailRow("Receiver Mail", OWNER_EMAIL, true)}
          ${detailRow("Submission Time", data.timestamp)}
          ${detailRow("Sender Location", data.location)}
          ${detailRow("Sender IP", data.ip)}
          ${detailRow("Sender Name", data.name)}
          ${detailRow("Sender Email", data.email)}
          ${detailRow("Phone / WhatsApp", data.phone)}
          ${detailRow("Company / College", data.company)}
          ${highlightedRow(
            "Message Type",
            data.need,
            needTheme,
            needTheme.label
          )}
          ${highlightedRow(
            "Priority Level",
            data.priority,
            priorityTheme,
            priorityTheme.label
          )}
          ${highlightedRow(
            "Preferred Reply",
            data.reply,
            {
              accent: "#14b8a6",
              bg: "#f0fdfa",
              border: "#5eead4",
              text: "#0f766e",
            },
            "Best contact channel"
          )}
        </table>
        <div style="padding:24px 28px 28px;background:#ffffff;">
          <div style="margin-bottom:12px;">
            <span style="display:inline-block;color:${priorityTheme.text};background:${priorityTheme.bg};border:1px solid ${priorityTheme.border};border-radius:999px;padding:7px 12px;font-size:12px;font-weight:950;text-transform:uppercase;letter-spacing:.08em;">Main message to read first</span>
          </div>
          <h2 style="margin:0 0 12px;color:#0f172a;font-size:22px;line-height:1.25;">${escapeHtml(
            data.need
          )} request details</h2>
          <div style="white-space:pre-wrap;line-height:1.75;color:#111827;background:linear-gradient(135deg,${priorityTheme.bg},#ffffff);border:2px solid ${priorityTheme.border};border-left:10px solid ${priorityTheme.accent};border-radius:14px;padding:18px 20px;font-size:16px;font-weight:700;box-shadow:0 12px 30px rgba(15,23,42,.08);">${escapeHtml(
            data.message
          )}</div>
        </div>
      </div>
    </div>
  `;
}

function autoReplyTemplate(data) {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 20px;">
      <div style="max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
        
        <!-- Header -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0b192c; color: #ffffff;">
          <tr>
            <td style="padding: 40px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="width: 50px; vertical-align: top;">
                    <div style="width: 36px; height: 36px; border-radius: 50%; border: 2px solid #20c997; text-align: center; line-height: 36px; color: #20c997; font-size: 18px;">✓</div>
                  </td>
                  <td>
                    <h1 style="margin: 0; font-size: 26px; font-weight: bold;">Hello <span style="color: #20c997;">${escapeHtml(data.name)}</span>,</h1>
                    <p style="margin: 8px 0 0 0; font-size: 15px; color: #e2e8f0;">Thank you for reaching out through my portfolio website.</p>
                  </td>
                  <td style="width: 70px; text-align: right; vertical-align: top;">
                    <div style="font-size: 45px; line-height: 1;">✉️</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Body Content -->
        <div style="padding: 30px;">
          
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 25px;">
            <tr>
              <td style="width: 35px; vertical-align: top; padding-bottom: 15px;">
                <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #20c997; color: white; text-align: center; line-height: 22px; font-size: 12px; font-weight: bold;">✓</div>
              </td>
              <td style="padding-bottom: 15px; color: #334155; font-size: 15px; line-height: 1.5;">
                This email confirms that I have successfully received your contact request and submitted details on <strong>${escapeHtml(data.timestamp)}</strong>.
              </td>
            </tr>
            <tr>
              <td style="width: 35px; vertical-align: top;">
                <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #60a5fa; color: white; text-align: center; line-height: 22px; font-size: 12px; font-weight: bold;">🕒</div>
              </td>
              <td style="color: #334155; font-size: 15px; line-height: 1.5;">
                I truly appreciate your interest and will review your message shortly. You can expect a response from me as soon as possible using your preferred contact method.
              </td>
            </tr>
          </table>

          <!-- Divider -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 25px;">
            <tr>
              <td style="width: 30%; border-bottom: 1px solid #cbd5e1;"></td>
              <td style="width: 40%; text-align: center; font-weight: bold; color: #0b192c; font-size: 18px;">
                <span style="color: #20c997; margin-right: 8px;">●</span> Submitted Details <span style="color: #20c997; margin-left: 8px;">●</span>
              </td>
              <td style="width: 30%; border-bottom: 1px solid #cbd5e1;"></td>
            </tr>
          </table>

          <!-- Details Card -->
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 15px 25px; margin-bottom: 25px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="width: 45px; padding: 15px 0; border-bottom: 1px solid #f1f5f9;">
                  <div style="width: 32px; height: 32px; border-radius: 50%; background-color: #e0e7ff; text-align: center; line-height: 32px; font-size: 15px;">🕒</div>
                </td>
                <td style="width: 160px; padding: 15px 0; font-weight: bold; color: #0b192c; font-size: 15px; border-bottom: 1px solid #f1f5f9;">Date & Time:</td>
                <td style="padding: 15px 0; color: #334155; font-size: 15px; border-bottom: 1px solid #f1f5f9;">${escapeHtml(data.timestamp)}</td>
              </tr>
              <tr>
                <td style="width: 45px; padding: 15px 0; border-bottom: 1px solid #f1f5f9;">
                  <div style="width: 32px; height: 32px; border-radius: 50%; background-color: #ccfbf1; text-align: center; line-height: 32px; font-size: 15px;">👤</div>
                </td>
                <td style="width: 160px; padding: 15px 0; font-weight: bold; color: #0b192c; font-size: 15px; border-bottom: 1px solid #f1f5f9;">Name:</td>
                <td style="padding: 15px 0; color: #334155; font-size: 15px; border-bottom: 1px solid #f1f5f9;">${escapeHtml(data.name)}</td>
              </tr>
              <tr>
                <td style="width: 45px; padding: 15px 0; border-bottom: 1px solid #f1f5f9;">
                  <div style="width: 32px; height: 32px; border-radius: 50%; background-color: #dbeafe; text-align: center; line-height: 32px; font-size: 15px;">✉️</div>
                </td>
                <td style="width: 160px; padding: 15px 0; font-weight: bold; color: #0b192c; font-size: 15px; border-bottom: 1px solid #f1f5f9;">Email:</td>
                <td style="padding: 15px 0; font-size: 15px; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${escapeHtml(data.email)}" style="color: #3b82f6; text-decoration: none;">${escapeHtml(data.email)}</a></td>
              </tr>
              <tr>
                <td style="width: 45px; padding: 15px 0; border-bottom: 1px solid #f1f5f9;">
                  <div style="width: 32px; height: 32px; border-radius: 50%; background-color: #f3e8ff; text-align: center; line-height: 32px; font-size: 15px;">📞</div>
                </td>
                <td style="width: 160px; padding: 15px 0; font-weight: bold; color: #0b192c; font-size: 15px; border-bottom: 1px solid #f1f5f9;">Phone / WhatsApp:</td>
                <td style="padding: 15px 0; color: #334155; font-size: 15px; border-bottom: 1px solid #f1f5f9;">${escapeHtml(data.phone || "Not provided")}</td>
              </tr>
              <tr>
                <td style="width: 45px; padding: 15px 0;">
                  <div style="width: 32px; height: 32px; border-radius: 50%; background-color: #ffedd5; text-align: center; line-height: 32px; font-size: 15px;">🏢</div>
                </td>
                <td style="width: 160px; padding: 15px 0; font-weight: bold; color: #0b192c; font-size: 15px;">Company / College:</td>
                <td style="padding: 15px 0; color: #334155; font-size: 15px;">${escapeHtml(data.company || "Not provided")}</td>
              </tr>
            </table>
          </div>

          <!-- Quote -->
          <div style="background-color: #ecfdf5; border: 1px solid #d1fae5; border-radius: 8px; padding: 18px 20px; margin-bottom: 30px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="width: 35px; vertical-align: top; color: #10b981; font-size: 28px; line-height: 1; font-family: Georgia, serif; padding-top: 5px;">❝</td>
                <td style="color: #065f46; font-size: 15px; line-height: 1.6; vertical-align: middle;">
                  Thank you for your patience, and I look forward to speaking with you soon.
                </td>
              </tr>
            </table>
          </div>

          <!-- Footer -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top: 1px solid #e2e8f0; padding-top: 25px;">
            <tr>
              <td style="width: 70px; vertical-align: middle;">
                <img src="cid:avatar-img" alt="PAVAN BUSANAMONi" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; display: block;" />
              </td>
              <td style="vertical-align: middle;">
                <div style="font-size: 14px; color: #64748b; margin-bottom: 4px;">Best Regards,</div>
                <div style="font-size: 18px; font-weight: bold; color: #20c997; margin-bottom: 2px;">PAVAN BUSANAMONi</div>
                <div style="font-size: 14px; color: #94a3b8;">Portfolio Owner</div>
              </td>
            </tr>
          </table>

        </div>
      </div>
    </div>
  `;
}

function notificationText(data) {
  return [
    "Portfolio Contact Request",
    "",
    `Receiver: ${OWNER_NAME} <${OWNER_EMAIL}>`,
    `Submission Time: ${data.timestamp}`,
    `Sender Location: ${data.location}`,
    `Sender IP: ${data.ip}`,
    `Sender Name: ${data.name}`,
    `Sender Email: ${data.email}`,
    `Phone / WhatsApp: ${data.phone || "Not provided"}`,
    `Company / College: ${data.company || "Not provided"}`,
    `Contact Need: ${data.need}`,
    `Priority: ${data.priority}`,
    `Preferred Reply: ${data.reply}`,
    "",
    "Message:",
    data.message,
  ].join("\n");
}

function autoReplyText(data) {
  return [
    `Hello ${data.name},`,
    "",
    "Thank you for reaching out through my portfolio website.",
    "",
    `This email confirms that I have successfully received your contact request and submitted details on ${data.timestamp}.`,
    "",
    "I truly appreciate your interest and will review your message shortly. You can expect a response from me as soon as possible using your preferred contact method.",
    "",
    "Submitted Details:",
    "",
    `Date & Time: ${data.timestamp}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone / WhatsApp: ${data.phone || "Not provided"}`,
    `Company / College: ${data.company || "Not provided"}`,
    "",
    "Thank you for your patience, and I look forward to speaking with you soon.",
    "",
    "Best Regards,",
    "PAVAN BUSANAMONi",
    "Portfolio Owner"
  ].join("\n");
}

function validateContact(data) {
  const errors = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name is required.");
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("A valid email is required.");
  }

  if (!data.message || data.message.trim().length < 5) {
    errors.push("Message is required.");
  }

  return errors;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  let ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || '';
  if (ip && ip.includes(',')) {
    ip = ip.split(',')[0].trim();
  }

  let locationStr = "Location not available";
  const city = req.headers['x-vercel-ip-city'] || '';
  const region = req.headers['x-vercel-ip-country-region'] || '';
  const country = req.headers['x-vercel-ip-country'] || '';
  
  if (city || country) {
    locationStr = [decodeURIComponent(city), region, country].filter(Boolean).join(", ");
  }

  if (ip && ip !== '::1' && ip !== '127.0.0.1' && ip !== 'Unknown IP') {
    try {
      const response = await fetch(`http://ip-api.com/json/${ip}`);
      const geo = await response.json();
      if (geo && geo.status === 'success') {
        locationStr = `${geo.city}, ${geo.regionName}, ${geo.country} (ISP: ${geo.isp})`;
      }
    } catch (e) {
      console.error("Geolocation fetch failed:", e);
    }
  }

  if (!ip) {
    ip = 'Unknown IP';
  }

  const data = {
    name: req.body.name?.trim(),
    email: req.body.email?.trim(),
    phone: req.body.phone?.trim(),
    company: req.body.company?.trim(),
    need: req.body.need?.trim() || "Portfolio contact",
    priority: req.body.priority?.trim() || "Normal priority",
    reply: req.body.reply?.trim() || "Email",
    message: req.body.message?.trim(),
    timestamp: new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    }),
    location: locationStr,
    ip: ip,
  };

  const errors = validateContact(data);
  if (errors.length > 0) {
    return res.status(400).json({ message: errors.join(" ") });
  }

  if (!MAIL_APP_PASSWORD) {
    return res.status(500).json({
      message:
        "Mail server is missing MAIL_APP_PASSWORD. Add your Gmail app password to the ignored .env file and restart the server.",
    });
  }

  try {
    const subject = `Portfolio Contact: ${data.priority} - ${data.need} from ${data.name}`;

    await transporter.sendMail({
      from: `"${OWNER_NAME} Portfolio" <${MAIL_USER}>`,
      to: OWNER_EMAIL,
      replyTo: data.email,
      subject,
      text: notificationText(data),
      html: notificationTemplate(data),
    });

    await transporter.sendMail({
      from: `"${OWNER_NAME}" <${MAIL_USER}>`,
      to: data.email,
      subject: "Request Received Successfully",
      text: autoReplyText(data),
      html: autoReplyTemplate(data),
      attachments: [
        {
          filename: 'avatar.png',
          path: 'https://raw.githubusercontent.com/PAVAN-BUSANAMONi/Personal-Portfolio/main/src/Assets/newLogo.png',
          cid: 'avatar-img'
        }
      ]
    });

    res.json({
      message: "THANK YOU FOR INTREST TO CHOOSING ME!",
    });
  } catch (error) {
    console.error("Contact mail failed:", error);
    res.status(500).json({
      message:
        "Mail could not be sent right now. Check the server terminal for the Nodemailer error, then try again.",
    });
  }
};
