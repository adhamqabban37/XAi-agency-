const RETELL_API_URL = "https://api.retellai.com/v2/create-web-call";

export const handler = async (event: any) => {
  // CORS headers for all responses
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // Handle preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: "Method Not Allowed" }),
    };
  }

  try {
    const apiKey = process.env.RETELL_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          message: "Missing RETELL_API_KEY environment variable",
        }),
      };
    }

    const { agentId } = JSON.parse(event.body ?? "{}");

    if (!agentId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: "Missing agentId in request body",
        }),
      };
    }

    const response = await fetch(RETELL_API_URL, {
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
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({
          success: false,
          message: result.message || "Failed to create Retell call",
        }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error("retell-create-call error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: "Internal server error",
      }),
    };
  }
};
