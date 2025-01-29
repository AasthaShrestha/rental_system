import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import TablePagination from "@mui/material/TablePagination";
import { useMutation, useQuery } from "@tanstack/react-query";
import Avatar from "@mui/material/Avatar";
import { Box, IconButton, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router";

const getVehicles = async (page, limit) => {
  const res = await axios.get("http://localhost:4001/api/posts/vehicles", {
    params: {
      page,
      limit,
    },
  });
  return res.data;
};

const deleteVehicle = async (id) => {
  const res = await axios.delete(
    `http://localhost:4001/api/posts/vehicles/${id}`
  );
  return res.data;
};

export default function DashboardVehicle() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = React.useState(null);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const query = useQuery({
    queryKey: ["vehicles", rowsPerPage, page],
    queryFn: () => getVehicles(page + 1, rowsPerPage),
    keepPreviousData: true,
  });

  const mutation = useMutation({
    mutationFn: deleteVehicle,
    onSuccess: () => {
      query.refetch();
      setOpenDialog(false); 
    },
  });

  const handleDelete = (id) => {
    setSelectedVehicleId(id); 
    setOpenDialog(true); 
  };

  const handleConfirmDelete = () => {
    mutation.mutate(selectedVehicleId); 
  };

  const handleCancelDelete = () => {
    setOpenDialog(false); 
  };

  if (query.isError) return <div>Error loading vehicles!</div>;
  if (query.isLoading) return <div>Loading...</div>;

  // Sort vehicles by the latest added first 
  const sortedVehicles = query.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        List of Vehicles
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedVehicles.map(({ _id, name, price, images }) => (
              <TableRow key={_id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Box sx={{ display: "flex", alignItems: "center", gap: "9px" }}>
                    <Avatar src={`http://localhost:4001/${images[0]}`} alt={name} />
                    <Typography>{name}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">{price}$</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => handleDelete(_id)} 
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                  <IconButton
                    aria-label="view"
                    onClick={() => {
                      navigate(`/post/${_id}`); 
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={query.data.total || 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this vehicle?"}</DialogTitle>
        <DialogContent>
          <Typography>Once deleted, this action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}