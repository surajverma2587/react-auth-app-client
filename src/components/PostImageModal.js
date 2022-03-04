import Drawer from "@mui/material/Drawer";

import { PostImageForm } from "./PostImageForm";

export const PostImageModal = ({ open, onClose }) => {
  return (
    <Drawer open={open} onClose={onClose} anchor="top">
      <PostImageForm onClose={onClose} />
    </Drawer>
  );
};
