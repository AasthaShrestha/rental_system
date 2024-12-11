import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// API call for login
const logIn = async (data) => {
  try {
    console.log("Sending data:", data);
    const res = await axios.post("http://localhost:4001/user/login", data);
    console.log("API response:", res.data);
    return res.data;
  } catch (error) {
    console.error("API error:", error.response?.data || error.message);
    throw error; // Rethrow to let `useMutation` handle it
  }
};

// Validation schema using Yup
const schema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email format.")
      .required("Email is required."),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters long.")
      .required("Password is required."),
  })
  .required();

export default function LogIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: logIn,
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted with data:", data);
    mutation.mutate(data);
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 500,
          p: 4,
          borderRadius: 3,
          boxShadow: 4,
          bgcolor: "background.paper",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 2,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
            color: "pink.main", // Change blue to pink
          }}
        >
          Welcome to YatriKuti
        </Typography>
        {mutation.error && (
          <Alert sx={{ my: 2 }} severity="error">
            {mutation.error.response?.data?.message ??
              "Something went wrong. Please try again."}
          </Alert>
        )}
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <FormControl fullWidth>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              id="email"
              placeholder="Enter your email"
              variant="outlined"
              fullWidth
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              {...register("email")}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              id="password"
              type="password"
              placeholder="Enter your password"
              variant="outlined"
              fullWidth
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              {...register("password")}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            className="w-full py-3  text-white  rounded-lg focus:outline-none transform transition duration-200 ease-in-out hover:scale-105"
          >
            Log In
          </Button>
          <Typography sx={{ textAlign: "center", mt: 2 }}>
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-500 hover:underline">
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
