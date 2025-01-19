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

// Function to fetch pending KYC requests
const getKyc = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get("http://localhost:4001/user/all-expired-rentals", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Function to verify KYC
const verifyKyc = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`http://localhost:4001/user/verifykyc/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Function to decline KYC
const declineKyc = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`http://localhost:4001/user/declinekyc/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const DashboardKyc = () => {
  // Fetch pending KYC requests
  const query = useQuery({
    queryKey: ["kycs"],
    queryFn: getKyc,
  });

  // Mutation for verifying KYC
  const { mutate: VerifyKyc } = useMutation({
    mutationFn: verifyKyc,
    onSuccess: () => {
      window.location.reload();
    },
  });

  // Mutation for declining KYC
  const { mutate: DeclineKyc } = useMutation({
    mutationFn: declineKyc,
    onSuccess: () => {
      window.location.reload();
    },
  });

  // Handle accept KYC
  const handleAcceptKyc = (id) => {
    VerifyKyc(id);
  };

  // Handle decline KYC
  const handleDeclineKyc = (id) => {
    DeclineKyc(id);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="right">Id Number</TableCell>
            <TableCell align="right">Id Type</TableCell>
            <TableCell align="left">Document Photo</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {query?.data?.data?.map((kyc) => {
            const baseUrl = "http://localhost:4001/";
            const imageUrl = kyc?.kycDetails?.photoUrl?.[0];

            // Safely handle undefined or empty imageUrl
            if (!imageUrl) {
              return null;
            }

            // Convert backslashes to forward slashes for valid URLs
            const formattedUrl = imageUrl.replace(/\\/g, "/");
            const finalUrl = baseUrl + formattedUrl;

            return (
              <TableRow
                key={kyc._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box sx={{ display: "flex", alignItems: "center", gap: "9px" }}>
                    <Typography>{kyc.email}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">{kyc?.kycDetails?.idNumber}</TableCell>
                <TableCell align="right">{kyc?.kycDetails?.idType}</TableCell>
                <TableCell align="left">
                  <a href={finalUrl} target="_blank" rel="noopener noreferrer">
                    <img
                      src={finalUrl}
                      alt="Photo"
                      style={{ width: "100px", height: "auto" }}
                    />
                  </a>
                </TableCell>
                <TableCell>
                  <Button
                    style={{ backgroundColor: "green", color: "white", marginRight: "10px" }}
                    onClick={() => handleAcceptKyc(kyc._id)}
                  >
                    Accept
                  </Button>
                  <Button
                    style={{ backgroundColor: "red", color: "white" }}
                    onClick={() => handleDeclineKyc(kyc._id)}
                  >
                    Decline
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DashboardKyc;
