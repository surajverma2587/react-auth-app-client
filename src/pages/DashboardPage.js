import { useState } from "react";
import { useQuery } from "@apollo/client";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { PostImageModal } from "../components/PostImageModal";
import { useAuth } from "../contexts/AppProvider";
import { DASHBOARD } from "../queries";
import { ImageContainer } from "../components/ImageContainer";

export const DashboardPage = () => {
  const { user } = useAuth();
  const { loading, data } = useQuery(DASHBOARD);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const styles = {
    container: {
      backgroundColor: "#fff",
      minHeight: "90vh",
    },
    headerContainer: {
      padding: 2,
    },
    creatPost: { textAlign: "center", mt: 2 },
    images: {},
  };

  return (
    <Container component="main" maxWidth="md" sx={styles.container}>
      <Stack spacing={2}>
        <Box sx={styles.headerContainer}>
          <Typography
            variant="h4"
            gutterBottom
            component="h1"
            align="center"
            sx={styles.header}
          >
            Dashboard
          </Typography>
          <Typography
            variant="caption"
            gutterBottom
            component="h1"
            align="center"
            sx={styles.header}
          >
            Welcome {user.username}
          </Typography>
          <Box sx={styles.creatPost}>
            <Button variant="contained" onClick={handleOpen}>
              Create Post
            </Button>
          </Box>
          <PostImageModal open={open} onClose={handleClose} />
        </Box>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
        {!loading && data?.dashboard && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {data?.dashboard?.images?.length !== 0 && (
              <ImageContainer images={data.dashboard.images} />
            )}
          </Box>
        )}
      </Stack>
    </Container>
  );
};
