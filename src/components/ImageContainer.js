import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export const ImageContainer = ({ images }) => {
  return (
    <ImageList sx={{ overflowY: "scroll" }}>
      {images.map((item) => (
        <ImageListItem key={item.id}>
          <img
            src={item.imageUrl}
            srcSet={item.imageUrl}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={item.description}
            actionIcon={
              <IconButton color="error" aria-label={`info about ${item.title}`}>
                <DeleteIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
