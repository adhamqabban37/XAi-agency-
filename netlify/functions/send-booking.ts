const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export const handler = async (event: any) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: "Method Not Allowed" }),
    };
  }

  try {
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    const toEmail = process.env.CONTACT_EMAIL ?? "xenlixai@gmail.com";

    if (!accessKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          message: "Missing Web3Forms access key",
        }),
      };
    }

    const payload = JSON.parse(event.body ?? "{}");

    const response = await fetch(WEB3FORMS_ENDPOINT, {
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

    return {
      statusCode: response.ok ? 200 : response.status,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error("send-booking error", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Failed to send booking request",
      }),
    };
  }
};
