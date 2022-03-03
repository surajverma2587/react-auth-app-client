import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import ErrorIcon from "@mui/icons-material/Error";
import Divider from "@mui/material/Divider";

import { SIGNUP } from "../mutations";

export const SignUpForm = () => {
  const [executeSignUp, { loading, error }] = useMutation(SIGNUP);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async ({
    firstName,
    lastName,
    username,
    email,
    password,
  }) => {
    try {
      const { data } = await executeSignUp({
        variables: {
          input: {
            firstName: firstName.toLowerCase().trim(),
            lastName: lastName.toLowerCase().trim(),
            username: username.toLowerCase().trim(),
            email: email.toLowerCase().trim(),
            password,
          },
        },
      });

      if (data) {
        navigate("/login", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const styles = {
    container: {
      backgroundColor: "#fff",
    },
    header: {
      paddingTop: 2,
      paddingBottom: 2,
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 4,
    },
    loadingButton: { marginTop: 3, marginBottom: 2 },
    errorContainer: {
      marginTop: 2,
      color: "#d32f2f",
      textAlign: "center",
    },
  };

  return (
    <Box sx={styles.container}>
      <Typography
        variant="h4"
        gutterBottom
        component="h1"
        align="center"
        sx={styles.header}
      >
        Sign Up
      </Typography>
      <Divider />
      <Box component="form" sx={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          margin="normal"
          id="firstName"
          label="First Name"
          name="firstName"
          variant="outlined"
          fullWidth
          {...register("firstName", { required: true })}
          error={!!errors.firstName}
          disabled={loading}
        />
        <TextField
          margin="normal"
          id="lastName"
          label="Last Name"
          name="lastName"
          variant="outlined"
          fullWidth
          {...register("lastName", { required: true })}
          error={!!errors.lastName}
          disabled={loading}
        />
        <TextField
          margin="normal"
          id="username"
          label="Username"
          name="username"
          variant="outlined"
          fullWidth
          {...register("username", { required: true })}
          error={!!errors.username}
          disabled={loading}
        />
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
          sx={styles.loadingButton}
          startIcon={error && <ErrorIcon />}
          color={error ? "error" : "primary"}
        >
          Sign Up
        </LoadingButton>

        <Link
          component={RouterLink}
          to="/login"
          variant="body2"
          underline="none"
        >
          Already have an account? Login
        </Link>
        {error && (
          <Typography
            variant="subtitle2"
            gutterBottom
            component="div"
            sx={styles.errorContainer}
          >
            Failed to sign up, please make sure you enter the correct details or
            try again later.
          </Typography>
        )}
      </Box>
    </Box>
  );
};
