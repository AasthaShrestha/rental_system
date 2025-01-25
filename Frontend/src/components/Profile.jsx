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
} from "@mui/material";
import axios from "axios";
import NavBar from "./Navbar";
import Footer from "./Footer";

const UserProfile = () => {
  const [listedItems, setListedItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingListedItems, setLoadingListedItems] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [errorListedItems, setErrorListedItems] = useState(null);
  const [errorOrders, setErrorOrders] = useState(null);
  const [listedItemsPage, setListedItemsPage] = useState(1);
  const [ordersPage, setOrdersPage] = useState(1);
  
  const [userData, setUserData] = useState(() => {
    const storedUser = localStorage.getItem("authUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const fetchListedItems = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/posts/mypost", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setListedItems(response.data.data || []);
        setLoadingListedItems(false);
      } catch (err) {
        setErrorListedItems(err.message);
        setLoadingListedItems(false);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/orders/myorders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
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
    const currentPageItems = listedItems.slice(startIndex, startIndex + itemsPerPage);

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
                <strong>Category:</strong> {item.parentCategory} - {item.subCategory}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    ));
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
    const currentPageOrders = orders.slice(startIndex, startIndex + itemsPerPage);

    return currentPageOrders.map((order) => (
      <Box key={order._id} sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom color="text.primary">
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
                    <strong>Start Date:</strong> {new Date(product.startDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    <strong>End Date:</strong> {new Date(product.endDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    <strong>Category:</strong> {product.parentCategory} - {product.subCategory}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Box>
    ));
  };

  return (
    <Box sx={{ p: 4, maxWidth: "1200px", margin: "0 auto" }}>
      <NavBar />
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
          src="https://via.placeholder.com/150"
          alt="User Profile Picture"
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        <Typography variant="h5" fontWeight="bold" color="text.primary" gutterBottom>
          {userData?.name || "Guest User"}
        </Typography>
        <Typography variant="body1" color="text.primary" gutterBottom>
          {userData?.email || "No email available"}
        </Typography>
        
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom color="text.primary">
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
              <Typography variant="h6" fontWeight="bold" gutterBottom color="text.primary">
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
      <Footer />
    </Box>
  );
};

export default UserProfile;
