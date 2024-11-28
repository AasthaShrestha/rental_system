import React from "react";

function Cards({ item }) {

  const [orders, setOrders] = useState([]);
  const [amount, setAmount] = useState(""); // State to store dynamic amount
  const [product, setProduct] = useState(""); // State to store dynamic product

  const handlePayment = async () => {
    const url = "http://localhost:4001/api/orders/create";
    const data = {
      amount: parseFloat(amount), // Use user-provided amount
      products: [{ product, amount: parseFloat(amount), quantity: 1 }], // Use user-provided product
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
        esewaCall(responseData.formData);
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
    <div className="p-4 flex justify-center">
      <div className="card bg-base-100 max-w-sm w-full shadow-xl rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
        <figure>
          <img
            src={item.image}
            alt="item image"
            className="h-64 w-full object-cover"
          />
        </figure>
        <div className="card-body p-4">
          <h2 className="card-title text-lg font-semibold mb-2 flex items-center">
            {item.name}
            <div className="badge badge-secondary ml-2">NEW</div>
          </h2>
          <p className="text-sm text-gray-600 mb-4">{item.title}</p>
          <div className="card-actions flex justify-between items-center">
            <div className="badge badge-outline text-lg font-semibold">
              रु {item.price}
            </div>
            <button className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-700 transition duration-300 ease-in-out">
              Buy Now onClick={() => handlePayment()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
