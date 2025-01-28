import axios from "axios";
import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";


const getOrders = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token is missing or expired");
  }
  try {
    const res = await axios.get("http://localhost:4001/api/orders/myorders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data; 
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch orders");
  }
};

const DashboardOrders = () => {
  const query = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  if (query.isError) {
    return <div>Error loading orders: {query.error.message}</div>;
  }
  if (query.isLoading) {
    return <div>Loading orders...</div>;
  }

  // Sort orders by createdAt (latest first)
  const sortedOrders = query.data?.data?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Orders table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Subcategory</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedOrders?.length > 0 ? (
              sortedOrders?.map((order) => (
                <React.Fragment key={order._id}>
                  {order.products?.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>{order._id}</TableCell>
                      <TableCell>{product.product}</TableCell>
                      <TableCell>
                        <img
                          src={`http://localhost:4001/${product.image}`} 
                          alt={product.product}
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />
                      </TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.address}</TableCell>
                      <TableCell>{product.parentCategory}</TableCell>
                      <TableCell>{product.subCategory}</TableCell>
                      <TableCell>{order.status}</TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8}>No orders available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DashboardOrders;
