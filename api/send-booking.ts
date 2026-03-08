export default async function handler(req, res) {
  // CORS handles
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  try {
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    const toEmail = process.env.CONTACT_EMAIL ?? "xenlixai@gmail.com";

    if (!accessKey) {
      return res.status(500).json({
        success: false,
        message: "Missing Web3Forms access key",
      });
    }

    const payload = req.body || {};

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        to_email: toEmail,
        ...payload,
      }),
    });

    const result = await response.json();

    return res.status(response.ok ? 200 : response.status).json(result);
  } catch (error) {
    console.error("send-booking error", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send booking request",
    });
  }
}
