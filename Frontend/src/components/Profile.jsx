import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import NavBar from "./Navbar";
import Footer from "./Footer";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";

const UserProfile = () => {
  const [listedItems, setListedItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [updatedListedItems, setUpdatedListedItems] = useState([]);
  const [loadingListedItems, setLoadingListedItems] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [errorListedItems, setErrorListedItems] = useState(null);
  const [errorOrders, setErrorOrders] = useState(null);
  const [listedItemsPage, setListedItemsPage] = useState(1);
  const [ordersPage, setOrdersPage] = useState(1);

  const [userData, setUserData] = useState(null);

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(userData?.image || "");

  // For updating item
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:4001/user/mydata", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserData(response.data.data); // Update state with fetched data
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData(); // Call the function to fetch user data on mount
  }, []);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:4001/user/upload-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      window.location.reload();
      setUserData({ ...userData, image: response.data.imageUrl }); // Update user data with the new image URL
      setImagePreview(response.data.imageUrl); // Update image preview
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  useEffect(() => {
    const fetchListedItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/api/posts/mypost",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setListedItems(response.data.data || []);
        setLoadingListedItems(false);
      } catch (err) {
        setErrorListedItems(err.message);
        setLoadingListedItems(false);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/api/orders/myorders",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setOrders(response.data.data || []);
        setLoadingOrders(false);
      } catch (err) {
        setErrorOrders(err.message);
        setLoadingOrders(false);
      }
    };

    fetchListedItems();
    fetchOrders();
  }, []);

  const handleListedItemsPageChange = (event, value) => {
    setListedItemsPage(value);
  };

  const handleOrdersPageChange = (event, value) => {
    setOrdersPage(value);
  };

  const renderKYCDetails = () => {
    if (!userData?.kycFilled) {
      return <Typography color="error">KYC not filled.</Typography>;
    }
    return (
      <Box
        sx={{
          mt: 2,
          p: 2,
          border: "1px solid",
          borderColor: "primary.main",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          color="text.primary"
        >
          KYC Details:
        </Typography>
        <Typography color="text.primary">
          <strong>Status:</strong>{" "}
          {userData.kycVerified ? "Verified" : "Not Verified"}
        </Typography>
      </Box>
    );
  };
  const handleUpdate = (item) => {
    setCurrentItem(item);
    setUpdatedName(item.name);
    setUpdatedDescription(item.description);
    setOpenUpdateDialog(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/api/posts/mypost/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setListedItems((prevItems) =>
        prevItems.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const handleSubmitUpdate = async () => {
    try {
      const updatedItem = {
        name: updatedName,
        description: updatedDescription,
      };
      await axios.patch(
        `http://localhost:4001/api/posts/mypost/${currentItem._id}`,
        updatedItem,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      window.location.reload();

      setUpdatedListedItems((prevItems) =>
        prevItems.map((item) =>
          item._id === currentItem._id ? { ...item, ...updatedItem } : item
        )
      ); // Update the state with the updated item

      setOpenUpdateDialog(false);
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };

  const renderListedItems = () => {
    if (loadingListedItems) {
      return <Typography>Loading...</Typography>;
    }

    if (errorListedItems) {
      return <Typography color="error">Error: {errorListedItems}</Typography>;
    }

    if (listedItems.length === 0) {
      return <Typography>No items listed yet.</Typography>;
    }

    const itemsPerPage = 5;
    const startIndex = (listedItemsPage - 1) * itemsPerPage;
    const currentPageItems = listedItems.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    return currentPageItems.map((item) => (
      <Card key={item._id} sx={{ mb: 3, boxShadow: 3 }}>
        <Grid container>
          <Grid item xs={4}>
            <CardMedia
              component="img"
              image={`http://localhost:4001/${item.images[0]}`}
              alt={item.name}
              sx={{ height: 150, width: "100%" }}
            />
          </Grid>
          <Grid item xs={8}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="text.primary">
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.primary">
                <strong>Address:</strong> {item.address}
              </Typography>
              <Typography variant="body1" color="text.primary">
                <strong>Description:</strong> {item.description}
              </Typography>
              <Typography variant="body1" color="text.primary">
                <strong>Price:</strong> रु {item.price || "N/A"}
              </Typography>
              <Typography variant="body2" color="text.primary">
                <strong>Category:</strong> {item.parentCategory} -{" "}
                {item.subCategory}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleUpdate(item)}
                  sx={{ mr: 2 }}
                >
                  Update
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    ));
  };

  // const downloadSingleBookedItemAsPDF = (order, product) => {
  //   const doc = new jsPDF();

  //   doc.setFontSize(18);
  //   doc.text("Booked Item Details", 14, 20);
  //   const itemDetails = [
  //     ["Order ID", order._id],
  //     ["Product", product.product],
  //     ["Address", product.address],
  //     ["Price", `Rs ${product.price}`],
  //     ["Start Date", new Date(product.startDate).toLocaleDateString()],
  //     ["End Date", new Date(product.endDate).toLocaleDateString()],
  //     ["Category", `${product.parentCategory} - ${product.subCategory}`],
  //   ];

  //   // Add table
  //   doc.autoTable({
  //     head: [["Field", "Value"]],
  //     body: itemDetails,
  //     startY: 30,
  //   });
  //   // Optionally add an image
  //   if (product.image) {
  //     const imageUrl = `http://localhost:4001/${product.image}`;
  //     const imgWidth = 50;
  //     const imgHeight = 50;
  //     doc.addImage(imageUrl, "JPEG", 80, 100, imgWidth, imgHeight);
  //   }
  //   // Save the PDF
  //   doc.save(`${product.product}_details.pdf`);
  // };

  const downloadSingleBookedItemAsPDF = (order, product) => {
    // Create a container to hold the content for the PDF
    const contentContainer = document.createElement("div");
    contentContainer.style.width = "210mm"; // A4 width
    contentContainer.style.height = "297mm"; // A4 height
    contentContainer.style.padding = "20px";
    contentContainer.style.fontFamily = "Arial, sans-serif";
    contentContainer.style.fontSize = "14px";
    contentContainer.style.backgroundColor = "#FFFFFF";
    contentContainer.style.color = "rgb(120, 120, 120)";

    // Add the text and table content
    contentContainer.innerHTML = `
    <h2>Booked Item Details</h2>
    <table>
      <tr><td><strong>Order ID</strong></td><td>${order._id}</td></tr>
      <tr><td><strong>Product</strong></td><td>${product.product}</td></tr>
      <tr><td><strong>Address</strong></td><td>${product.address}</td></tr>
      <tr><td><strong>Price</strong></td><td>Rs ${product.price}</td></tr>
      <tr><td><strong>Start Date</strong></td><td>${new Date(
        product.startDate
      ).toLocaleDateString()}</td></tr>
      <tr><td><strong>End Date</strong></td><td>${new Date(
        product.endDate
      ).toLocaleDateString()}</td></tr>
      <tr><td><strong>Category</strong></td><td>${product.parentCategory} - ${
      product.subCategory
    }</td></tr>
    </table>
  `;

    // Optionally add an image if available
    if (product.image) {
      const img = document.createElement("img");
      img.src = `http://localhost:4001/${product.image}`;
      img.width = 100; // Adjust size
      img.height = 100; // Adjust size
      contentContainer.appendChild(img);
    }

    // Append the content to the body to render it off-screen
    document.body.appendChild(contentContainer);

    // Use html2canvas to convert the content into an image
    html2canvas(contentContainer)
      .then((canvas) => {
        // Create a PDF from the image
        const imgData = canvas.toDataURL("image/png");

        // Create a jsPDF instance
        const doc = new jsPDF();

        // Add the image to the PDF (fits A4 size)
        doc.addImage(imgData, "PNG", 0, 0, 210, 297);

        // Save the PDF
        doc.save(`${product.product}_details.pdf`);

        // Clean up by removing the content container
        document.body.removeChild(contentContainer);
      })
      .catch((err) => {
        console.error("Error generating the PDF:", err);
      });
  };

  const renderBookedItems = () => {
    if (loadingOrders) {
      return <Typography>Loading...</Typography>;
    }

    if (errorOrders) {
      return <Typography color="error">Error: {errorOrders}</Typography>;
    }

    if (orders.length === 0) {
      return <Typography>No items booked yet.</Typography>;
    }

    const itemsPerPage = 5;
    const startIndex = (ordersPage - 1) * itemsPerPage;
    const currentPageOrders = orders.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    return (
      <>
        {currentPageOrders.map((order) => (
          <Box key={order._id} sx={{ mb: 2 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              color="text.primary"
            >
              <strong>Order ID:</strong> {order._id}
            </Typography>
            {order.products.map((product, index) => (
              <Card key={index} sx={{ mb: 2, boxShadow: 3 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <img
                        src={`http://localhost:4001/${product.image}`}
                        alt={product.product}
                        style={{ width: "100%", height: "auto" }}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="h6" color="text.primary">
                        {product.product}
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        <strong>Address:</strong> {product.address}
                      </Typography>
                      <Typography variant="body1" color="text.primary">
                        <strong>Price:</strong> रु {product.price}
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        <strong>Start Date:</strong>{" "}
                        {new Date(product.startDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        <strong>End Date:</strong>{" "}
                        {new Date(product.endDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        <strong>Category:</strong> {product.parentCategory} -{" "}
                        {product.subCategory}
                      </Typography>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() =>
                          downloadSingleBookedItemAsPDF(order, product)
                        }
                        sx={{ mt: 1 }}
                      >
                        Download as PDF
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Box>
        ))}
      </>
    );
  };

  return (
    <>
      <NavBar />
      <Box sx={{ p: 4, maxWidth: "1200px", margin: "0 auto" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
            p: 2,
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: "background.paper",
          }}
        >
          <Avatar
            alt="abc"
            src={"http://localhost:4001" + userData?.image}
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: "20px" }}
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={handleImageUpload}
            disabled={!image}
          >
            Upload Image
          </Button>

          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: "#000000" }}
            gutterBottom
          >
            {userData?.name || "Guest User"}
          </Typography>
          <Typography variant="body1" sx={{ color: "#000000" }} gutterBottom>
            {userData?.email || "No email available"}
          </Typography>
          {renderKYCDetails()}
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  color="text.primary"
                >
                  Items Booked
                </Typography>
                {renderBookedItems()}
                <Pagination
                  count={Math.ceil(orders.length / 5)}
                  page={ordersPage}
                  onChange={handleOrdersPageChange}
                  color="primary"
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  color="text.primary"
                >
                  Items Listed
                </Typography>
                {renderListedItems()}
                <Pagination
                  count={Math.ceil(listedItems.length / 5)}
                  page={listedItemsPage}
                  onChange={handleListedItemsPageChange}
                  color="primary"
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Update Dialog */}
      <Dialog
        open={openUpdateDialog}
        onClose={() => setOpenUpdateDialog(false)}
      >
        <DialogTitle>Update Item</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            fullWidth
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpdateDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleSubmitUpdate(currentItem._id)}
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </>
  );
};

export default UserProfile;
