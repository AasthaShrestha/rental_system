import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import img from "../assets/main1.jpeg";
import Flex from "../components/Flex";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import Cards from "../components/Cards";
import { Box, FormControl, InputLabel, MenuItem, Select, TablePagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

function Rooms() {
const [posts, setPosts] = useState([]);

useEffect(() => {
  const getRooms = async () => {
    try {
      const response = await axios.get("http://localhost:4001/api/posts/rooms");
      if (response.data.success) {
        setPosts(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  getRooms();
}, []);
  const [order, setOrder] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const handleChange = (event) => {
    setOrder(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const query = useQuery({
    queryKey: ["products", rowsPerPage, page, order],
    queryFn: () => getRooms(page, rowsPerPage, order),
  });
  return (
    <div>
      <Navbar />
      <Flex
        title="Our Rooms"
        subtitle="Experience Comfort with our services."
        image={img}
        children="Back"
      />
      <Box sx={{ display: "flex", justifyContent: "end", my: 2 }}>
        <FormControl sx={{ width: "500px" }}>
          <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={order}
            label="Sort by"
            onChange={handleChange}
          >
            <MenuItem value={""}>Best Match</MenuItem>
            <MenuItem value={"asc"}>Price low to high</MenuItem>
            <MenuItem value={"desc"}>Price high to low</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {posts.map((post) => (
          <Link to={`/post/${post._id}`} key={post._id}>
            <Cards post={post} />
          </Link>
        ))}
      </div>
      {posts.isSuccess && (
        <TablePagination
          component="div"
          count={posts.data.total}
          page={page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[8, 16, 24]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
      <Footer />
    </div>
  );
}

export default Rooms;