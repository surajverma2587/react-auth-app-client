import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import ErrorIcon from "@mui/icons-material/Error";
import Divider from "@mui/material/Divider";

import { POST_IMAGE } from "../mutations";
import { useEffect } from "react";
import { useAuth } from "../contexts/AppProvider";
// import { ImageUpload } from "./ImageUpload";

export const PostImageForm = () => {
  const { setIsLoggedIn } = useAuth();
  const [executePostImage, { loading, data, error }] = useMutation(POST_IMAGE);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate("/dashboard", { replace: true });
    }
  }, [data]);

  const onSubmit = async ({ title, description, imageUrl }) => {
    await executePostImage({
      variables: {
        input: {
          title,
          description,
          imageUrl,
        },
      },
    });
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
        Login
      </Typography>
      <Divider />
      <Box component="form" sx={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          margin="normal"
          id="title"
          label="Title"
          name="title"
          variant="outlined"
          fullWidth
          {...register("title", { required: true })}
          error={!!errors.title}
          disabled={loading}
        />
        <TextField
          margin="normal"
          id="description"
          label="Description"
          name="description"
          variant="outlined"
          fullWidth
          {...register("description", { required: true })}
          error={!!errors.description}
          disabled={loading}
          multiline
          rows={4}
        />
        <TextField
          margin="normal"
          id="imageUrl"
          label="Image URL"
          name="imageUrl"
          variant="outlined"
          fullWidth
          {...register("imageUrl", { required: true })}
          error={!!errors.imageUrl}
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
          Post
        </LoadingButton>
        {error && (
          <Typography
            variant="subtitle2"
            gutterBottom
            component="div"
            sx={styles.errorContainer}
          >
            Failed to create post, please try again later.
          </Typography>
        )}
      </Box>
    </Box>
  );
};
