import axios from "axios";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

// Function to fetch suggestions
const getSuggestions = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("http://localhost:4001/api/contact", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const DashboardQuery = () => {
  const query = useQuery({
    queryKey: ["submitSuggestion"],
    queryFn: getSuggestions,
  });

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        User Query
      </Typography>
      <TableContainer component={Paper} style={{ maxHeight: 400, overflowY: "auto" }}>
        <Table sx={{ minWidth: 650 }} aria-label="Query table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Query</TableCell>
              <TableCell>Enquiry Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {query?.data?.map((suggestion) => (
              <TableRow key={suggestion._id}>
                <TableCell>{suggestion.name}</TableCell>
                <TableCell>{suggestion.email}</TableCell>
                <TableCell
                  style={{
                    maxWidth: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Tooltip title={suggestion.suggestion} placement="top">
                    <span>{suggestion.suggestion}</span>
                  </Tooltip>
                </TableCell>
                <TableCell>{suggestion.enquiryType}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DashboardQuery;
