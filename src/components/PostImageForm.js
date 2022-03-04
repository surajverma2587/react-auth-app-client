import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import ErrorIcon from "@mui/icons-material/Error";
import CloseIcon from "@mui/icons-material/Close";

import { POST_IMAGE } from "../mutations";
import { ImageUpload } from "./ImageUpload";
import { useAuth } from "../contexts/AppProvider";

export const PostImageForm = ({ onClose }) => {
  const { user } = useAuth();
  const [executePostImage, { loading, error }] = useMutation(POST_IMAGE);
  const [imageUrl, setImageUrl] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async ({ title, description }) => {
    if (imageUrl) {
      const { data } = await executePostImage({
        variables: {
          input: {
            title,
            description,
            imageUrl,
          },
        },
      });

      if (data) {
        onClose();
        navigate("/dashboard", { replace: true });
      }
    }
  };

  const styles = {
    container: {
      backgroundColor: "#fff",
      height: "100%",
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
    closeIcon: {
      display: "flex",
      justifyContent: "flex-end",
      padding: "0 !important",
    },
  };

  return (
    <Stack sx={styles.container}>
      <DialogTitle sx={styles.closeIcon}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Typography
        variant="h4"
        gutterBottom
        component="h1"
        align="center"
        sx={styles.header}
      >
        Create Post
      </Typography>
      <Divider />
      <Stack
        component="form"
        sx={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
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
        <ImageUpload
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          fileName={`${user.username}/images`}
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
        {!imageUrl && (
          <Typography
            variant="subtitle2"
            gutterBottom
            component="div"
            sx={styles.errorContainer}
          >
            Please upload an image to create a post.
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
