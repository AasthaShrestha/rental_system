import { useEffect, useState } from "react";
import React from "react";

function Esewa() {
  const [orders, setOrders] = useState([]);
  const [amount, setAmount] = useState(""); // State to store dynamic amount
  const [product, setProduct] = useState(""); // State to store dynamic product

  const handlePayment = async (payment_method) => {
    const url = "http://localhost:4001/api/orders/create";
    const data = {
      amount: parseFloat(amount), // Use user-provided amount
      products: [{ product, amount: parseFloat(amount), quantity: 1 }], // Use user-provided product
      payment_method,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        if (responseData.payment_method === "esewa") {
          esewaCall(responseData.formData);
        }
      } else {
        console.error("Failed to fetch:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const esewaCall = (formData) => {
    console.log(formData);
    var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in formData) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

  useEffect(() => {
    const getOrders = async () => {
      const url = "http://localhost:5005/api/order.model";

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
          setOrders(responseData);
        } else {
          console.error(
            "Failed to fetch:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };
    getOrders();
  }, []);

  return (
    <div>
      <h1>Esewa Test</h1>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            style={{ marginLeft: "10px", marginRight: "20px" }}
          />
        </label>
        <label>
          Product:
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Enter product"
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>
      <button
        style={{ background: "#55aa33", margin: 10 }}
        onClick={() => handlePayment("esewa")}
      >
        Handle Esewa Payment
      </button>
    </div>
  );
}

export default Esewa;