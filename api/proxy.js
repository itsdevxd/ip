import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const url = req.query.url;

    if (!url || !url.startsWith("http")) {
      return res.status(400).json({ error: "Invalid or missing URL" });
    }

    // Fetch request from YouTube or any URL
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/115 Safari/537.36"
      }
    });

    // Copy headers
    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") || "application/octet-stream"
    );

    // Stream response
    response.body.pipe(res);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
