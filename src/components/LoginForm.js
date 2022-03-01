import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("form submitted", data);
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
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 2 }}>
        Login
      </Button>
      <Link
        component={RouterLink}
        to="/sign-up"
        variant="body2"
        underline="none"
      >
        Don't have an account? Sign Up
      </Link>
      {validateForm(errors) && (
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
