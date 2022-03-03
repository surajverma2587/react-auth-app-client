import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { PostImageForm } from "./PostImageForm";

export const PostImageModal = ({ open, onClose }) => {
  const styles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles}>
        <PostImageForm />
      </Box>
    </Modal>
  );
};
