const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));

// Payment Success Handler
app.get("/payment-success", async (req, res) => {
  const { txAmt, pid, refId, status } = req.query;

  if (status === "success") {
    try {
      // Verify payment with eSewa
      const response = await axios.post("https://rc-epay.esewa.com.np/api/epay/verify", {
        amt: txAmt,
        pid: pid,
        refId: refId,
        scd: "EPAYTEST", // Your merchant code
      });

      if (response.data.status === "success") {
        res.send("Payment successful!");
      } else {
        res.send("Payment failed!");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      res.send("Error verifying payment");
    }
  } else {
    res.send("Payment failed");
  }
});

// Payment Failure Handler
app.get("/payment-failure", (req, res) => {
  res.send("Payment failed, please try again.");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
