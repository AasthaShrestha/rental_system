import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { axiosInstance } from "../api/axiosInstance";
import { useAuthUser } from "../Routes/Pathway";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Validation schema using Yup
const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
}).required();

export default function LogIn() {
  const { setAuthUser } = useAuthUser();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [ipAddress, setIpAddress] = useState("");
  const [geoInfo, setGeoInfo] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const logIn = async (data) => {
    const res = await axiosInstance.post(
      "http://localhost:4001/user/login",
      { ...data, latitude: geoInfo.lat, longitude: geoInfo.lon }
    );
    return res.data;
  };

  useEffect(() => {
    getVisitorIP();
  }, []);

  useEffect(() => {
    if (ipAddress) {
      fetchIPInfo();
    }
  }, [ipAddress]);

  const getVisitorIP = async () => {
    try {
      const response = await fetch("https://api.ipify.org/");
      const data = await response.text();
      setIpAddress(data);
    } catch (error) {
      console.error("Failed to fetch IP:", error);
    }
  };

  const fetchIPInfo = async () => {
    try {
      const response = await fetch(`http://ip-api.com/json/${ipAddress}`);
      const data = await response.json();
      setGeoInfo(data);
    } catch (error) {
      console.error("Failed to fetch location info:", error);
    }
  };

  const mutation = useMutation({
    mutationFn: logIn,
    onSuccess: (res) => {
      console.log(res);
      setAuthUser(res.data);
      localStorage.setItem("authUser", JSON.stringify(setAuthUser));
      localStorage.setItem("token", res.token);
      navigate("/");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
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
            color: "pink.main",
          }}
        >
          Welcome to YatriKuti
        </Typography>
        {mutation.error && (
          <Alert sx={{ my: 2 }} severity="error">
            {mutation.error.response?.data?.message ?? "Invalid email or password"}
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
          {/* Email Field */}
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

          {/* Password Field with Show/Hide Option */}
          <FormControl fullWidth>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              id="password"
              type={showPassword ? "text" : "password"} 
              placeholder="Enter your password"
              variant="outlined"
              fullWidth
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              {...register("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          {/* Login Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            className="w-full py-3 text-white rounded-lg focus:outline-none transform transition duration-200 ease-in-out hover:scale-105"
          >
            Log In
          </Button>

          {/* Sign Up Link */}
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
