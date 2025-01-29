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

// API call for signing up
const signUp = async (data) => {
  const res = await axios.post("http://localhost:4001/user/signup", data);
  return res.data; // Return response data
};

// Validation schema using Yup
const schema = yup
  .object({
    name: yup.string().required("Name is required."),
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format."
      )
      .required("Email is required."),
    password: yup
      .string()
      .min(7, "Password must be at least 7 characters long.")
      .matches(
        /[A-Z]/,
        "Password must contain at least one uppercase letter."
      )
      .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
      .matches(/[0-9]/, "Password must contain at least one number.")
      .matches(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character."
      )
      .required("Password is required."),
  })
  .required();

export default function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      navigate("/login");
    },
  });

  const onSubmit = (data) => {
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
          Create an Account
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
            <FormLabel htmlFor="name">Name</FormLabel>
            <TextField
              id="name"
              placeholder="Enter your name"
              variant="outlined"
              fullWidth
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              {...register("name")}
            />
          </FormControl>
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
            Sign Up
          </Button>
          <Typography sx={{ textAlign: "center", mt: 2 }}>
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-500 hover:underline">
              Log In
            </Link>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}