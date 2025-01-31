import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Dialog, DialogTitle, DialogActions, DialogContent } from "@mui/material"; 
import Paper from "@mui/material/Paper";
import { useState } from "react";

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

// Function to free all expired rentals
const freeExpiredRentals = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("http://localhost:4001/api/posts/free-expired-rentals", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Function to free a single expired rental by ID
const freeExpiredRentalById = async (rentalId) => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`http://localhost:4001/api/posts/free-expired-rentals-by-id/${rentalId}`, {
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

  // Mutation for freeing all expired rentals
  const { mutate: freeAllExpiredRentals } = useMutation({
    mutationFn: freeExpiredRentals,
    onSuccess: () => {
      query.refetch(); 
      handleCloseModal();
    },
  });

  // Mutation for freeing a single expired rental
  const { mutate: freeSingleExpiredRental } = useMutation({
    mutationFn: freeExpiredRentalById,
    onSuccess: () => {
      query.refetch(); 
      handleCloseModal();
    },
  });

  // Handle freeing all rentals
  const handleFreeAllRentals = () => {
    setOpenAllModal(true);
  };

  const [openModal, setOpenModal] = useState(false);
  const [openAllModal, setOpenAllModal] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);

  const handleOpenModal = (rental) => {
    setSelectedRental(rental); 
    setOpenModal(true); 
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setOpenAllModal(false);
    setSelectedRental(null); 
  };


  // Handle freeing a single rental
  const handleFreeSingleRental = () => {
    if (selectedRental) {
      freeSingleExpiredRental(selectedRental._id);
      handleCloseModal(); 
    }
  };

  const handleFreeAllConfirmed = () => {
    freeAllExpiredRentals(); 
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Expired Rentals
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleFreeAllRentals}
        style={{ marginBottom: "20px" }}
      >
        Free All Expired Rentals
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="expired rentals table">
          <TableHead>
            <TableRow>
              <TableCell>Rental by</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Photo</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {query?.data?.data?.map((rental) => {
              const photoUrl = rental.images[0];
              const baseUrl = "http://localhost:4001/";
              const formattedUrl = photoUrl?.replace(/\\/g, "/");
              const finalPhotoUrl = formattedUrl ? baseUrl + formattedUrl : null;

              return (
                <TableRow key={rental._id}>
                  <TableCell>{rental.userDetail[0]?.email}</TableCell>
                  <TableCell>{rental.name}</TableCell>
                  <TableCell>{new Date(rental.order?.products[0]?.endDate).toLocaleDateString()}</TableCell>
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
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleOpenModal(rental )}
                    >
                      Free
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
       {/* Confirmation Modal */}
       <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Confirm Freeing Property</DialogTitle>
        <DialogContent>
          {selectedRental && (
            <Typography>
              Are you sure you want to free the property? This property expires on{" "}
              {new Date(selectedRental.order?.products[0]?.endDate).toLocaleDateString()}.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFreeSingleRental} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

         {/* Confirmation Modal for Freeing All Rentals */}
         <Dialog open={openAllModal} onClose={handleCloseModal}>
        <DialogTitle>Confirm Freeing All Expired Rentals</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to free all expired rentals?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFreeAllConfirmed} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashboardExpiredRentals;
