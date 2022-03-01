import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";

import { LOGIN } from "../mutations";
import { useEffect } from "react";

export const LoginForm = () => {
  const [executeLogin, { loading, data, error }] = useMutation(LOGIN);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const token = data.login.token;

      localStorage.setItem("token", token);

      navigate("/dashboard", { replace: true });
    }
  }, [data]);

  const onSubmit = async ({ email, password }) => {
    await executeLogin({
      variables: {
        input: {
          email: email.toLowerCase().trim(),
          password,
        },
      },
    });
  };

  const validateForm = (formErrors) => {
    return !!formErrors.email || !!formErrors.password;
  };

  return (
    <Box
      component="form"
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        margin="normal"
        id="email"
        label="Email"
        name="email"
        variant="outlined"
        fullWidth
        {...register("email", { required: true })}
        error={!!errors.email}
        disabled={loading}
      />
      <TextField
        type="password"
        margin="normal"
        id="password"
        label="Password"
        name="password"
        variant="outlined"
        fullWidth
        {...register("password", { required: true })}
        error={!!errors.password}
        disabled={loading}
      />
      <LoadingButton
        loading={loading}
        loadingIndicator="Loading..."
        variant="contained"
        fullWidth
        type="submit"
        sx={{ mt: 3, mb: 2 }}
      >
        Login
      </LoadingButton>

      <Link
        component={RouterLink}
        to="/sign-up"
        variant="body2"
        underline="none"
      >
        Don't have an account? Sign Up
      </Link>
      {(validateForm(errors) || error) && (
        <Typography
          variant="subtitle2"
          gutterBottom
          component="div"
          sx={{ marginTop: "2rem", color: "#d32f2f", textAlign: "center" }}
        >
          Failed to login, please enter valid email address and/or password.
        </Typography>
      )}
    </Box>
  );
};
