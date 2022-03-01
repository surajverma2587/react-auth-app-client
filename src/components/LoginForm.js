import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

export const LoginForm = () => {
  return (
    <Box
      component="form"
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TextField
        margin="normal"
        id="email"
        label="Email"
        name="email"
        variant="outlined"
        fullWidth
      />
      <TextField
        type="password"
        margin="normal"
        id="password"
        label="Password"
        name="password"
        variant="outlined"
        fullWidth
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
    </Box>
  );
};
