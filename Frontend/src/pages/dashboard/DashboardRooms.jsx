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
import { Box, Button, IconButton, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router";

const getRooms = async (page, limit) => {
  const res = await axios.get("http://localhost:4001/api/posts/rooms", {
    params: {
      page,
      limit,
    },
  });
  return res.data;
};
const deleteRoom = async (id) => {
  const res = await axios.delete(`/api/posts/rooms/${id}`);
  return res.data;
};

export default function DashboardRooms() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const query = useQuery({
    queryKey: ["rooms", rowsPerPage, page],
    queryFn: () => getRooms(page + 1, rowsPerPage),
  });

  const mutation = useMutation({
    mutationFn: deleteRoom,
    onSuccess: () => {
      query.refetch();
      // queryClient.invalidateQueries({queryKey:["products"]});-->for different page access for refetch
    },
  });
  if (query.isError) return <div>Error loading vehicles!</div>;
  if (query.isLoading) return <div>Loading...</div>;
  return (
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
          {query?.data?.data?.map(({ _id, name, price, images }) => (
            <TableRow
              key={_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
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
                  onClick={() => {
                    mutation.mutate(_id);
                  }}
                >
                  <DeleteOutlineIcon />
                </IconButton>
                <IconButton
                  aria-label="edit"
                  onClick={() => {
                    navigate(`/dashboard/api/posts/rooms/edit/${_id}`);
                  }}
                >
                  <EditIcon />
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
  );
}