// esewa.controller.js

export const handleEsewaSuccess = async (req, res, next) => {
  try {
    const { data } = req.query;

    // Decode and parse the eSewa data as before...
    const decodedUrlData = decodeURIComponent(data);
    const decodedData = JSON.parse(Buffer.from(decodedUrlData, "base64").toString("utf-8"));

    if (decodedData.status !== "COMPLETE") {
      return res.status(400).json({ message: "error" });
    }

    // Validate the signature...
    const message = decodedData.signed_field_names
      .split(",")
      .map((field) => `${field}=${decodedData[field] || ""}`)
      .join(",");
    
    const signature = createSignature(message);

    if (signature !== decodedData.signature) {
      return res.json({ message: "Integrity error" });
    }

    req.transaction_uuid = decodedData.transaction_uuid;
    req.transaction_code = decodedData.transaction_code;
    next();
  } catch (err) {
    return res.status(400).json({ error: err?.message || "No Orders found" });
  }
};
