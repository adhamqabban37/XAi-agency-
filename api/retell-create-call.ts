export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  try {
    const apiKey = process.env.RETELL_API_KEY;

    if (!apiKey) {
      console.error("Missing RETELL_API_KEY");
      return res.status(500).json({
        success: false,
        message: "Missing RETELL_API_KEY environment variable",
      });
    }

    // req.body is already parsed in Vercel
    const { agentId } = req.body;

    if (!agentId) {
      return res.status(400).json({
        success: false,
        message: "Missing agentId in request body",
      });
    }

    const response = await fetch("https://api.retellai.com/v2/create-web-call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        agent_id: agentId,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Retell API error:", result);
      return res.status(response.status).json({
        success: false,
        message: result.message || "Failed to create Retell call",
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("retell-create-call error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
