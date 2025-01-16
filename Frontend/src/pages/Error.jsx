import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function Error() {
  const handleGoBack = () => {
    window.history.back(); // Navigate back to the previous page
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        textAlign: "center",
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 100, color: "#d32f2f", mb: 2 }} />
      <Typography variant="h4" gutterBottom color="text.primary">
        Oops! Error 404
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Something went wrong. The page you're looking for doesn't exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoBack}
        sx={{ textTransform: "none" }}
      >
        Go Back
      </Button>
    </Box>
  );
}

export default Error;
