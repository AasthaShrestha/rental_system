import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useMutation, useQuery } from "@tanstack/react-query";
import Paper from "@mui/material/Paper";

// Function to fetch expired rentals
const getExpiredRentals = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("http://localhost:4001/api/posts/all-expired-rentals", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Function to free expired rentals
const freeExpiredRentals = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("http://localhost:4001/api/posts/free-expired-rentals", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const DashboardExpiredRentals = () => {
  // Fetch expired rentals
  const query = useQuery({
    queryKey: ["expiredRentals"],
    queryFn: getExpiredRentals,
  });

  // Mutation for freeing expired rentals
  const { mutate: FreeExpiredRentals } = useMutation({
    mutationFn: freeExpiredRentals,
    onSuccess: () => {
      query.refetch(); // Refetch data after freeing rentals
    },
  });

  // Handle freeing rentals
  const handleFreeRentals = () => {
    FreeExpiredRentals();
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Expired Rentals
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleFreeRentals}
        style={{ marginBottom: "20px" }}
      >
        Free Expired Rentals
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="expired rentals table">
          <TableHead>
            <TableRow>
              <TableCell>Rental ID</TableCell>
              <TableCell>Product ID</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Photo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {query?.data?.data?.map((rental) => {
              const photoUrl = rental.products[0]?.photoUrl; // Assuming `photoUrl` exists in the product
              const baseUrl = "http://localhost:4001/";
              const formattedUrl = photoUrl?.replace(/\\/g, "/");
              const finalPhotoUrl = formattedUrl ? baseUrl + formattedUrl : null;

              return (
                <TableRow key={rental._id}>
                  <TableCell>{rental._id}</TableCell>
                  <TableCell>{rental.products[0]?.productId}</TableCell>
                  <TableCell>{new Date(rental.products[0]?.endDate).toLocaleDateString()}</TableCell>
                  <TableCell>{rental.occupied ? "Occupied" : "Freed"}</TableCell>
                  <TableCell>
                    {finalPhotoUrl ? (
                      <a href={finalPhotoUrl} target="_blank" rel="noopener noreferrer">
                        <img
                          src={finalPhotoUrl}
                          alt="Product"
                          style={{ width: "100px", height: "auto" }}
                        />
                      </a>
                    ) : (
                      "No Photo"
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DashboardExpiredRentals;
