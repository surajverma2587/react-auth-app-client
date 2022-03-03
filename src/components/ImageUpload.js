import { useState } from "react";
import S3 from "react-aws-s3";
import ImageUploading from "react-images-uploading";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

export const ImageUpload = () => {
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState();

  const onChange = (imageList) => {
    setImages(imageList);
  };

  const onUpload = async () => {
    const file = images[0].file;
    const fileName = `bobsmith/images/profile/${file.name}`;
    console.log(process.env.REACT_APP_BUCKET_NAME);

    const config = {
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_ID,
      secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
    };

    const ReactS3Client = new S3(config);

    const s3Data = await ReactS3Client.uploadFile(file, fileName);

    if (s3Data.status === 204) {
      setImageUrl(s3Data.location);
      setImages([]);
    } else {
      console.log("failed to upload image");
    }
  };

  const styles = {
    root: {
      minWidth: 320,
    },
    media: {
      height: 241,
    },
    title: {
      textAlign: "center",
      paddingTop: 8,
      paddingBottom: 8,
    },
    cardActions: { display: "flex", justifyContent: "space-evenly" },
  };

  return (
    <ImageUploading value={images} onChange={onChange} dataURLKey="data_url">
      {({ imageList, onImageUpload, onImageRemoveAll }) => (
        <Card sx={styles.root}>
          <CardActionArea>
            {images.length !== 0 && (
              <>
                <Typography variant="h6" display="block" sx={styles.title}>
                  Preview
                </Typography>
                <CardMedia sx={styles.media} image={images[0]["data_url"]} />
              </>
            )}
            {imageUrl && (
              <>
                <Typography variant="h6" display="block" sx={styles.title}>
                  Uploaded Image
                </Typography>
                <CardMedia sx={styles.media} image={imageUrl} />
              </>
            )}
            <CardContent>
              {imageUrl && (
                <Typography variant="caption" display="block" gutterBottom>
                  {imageUrl}
                </Typography>
              )}
            </CardContent>
          </CardActionArea>
          <CardActions sx={styles.cardActions}>
            {imageList.length === 0 && (
              <Button
                color="primary"
                onClick={onImageUpload}
                startIcon={<PhotoCamera />}
              >
                Upload Image
              </Button>
            )}
            {imageList.length !== 0 && (
              <>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={onImageRemoveAll}
                >
                  Delete
                </Button>
                <Button variant="outlined" color="success" onClick={onUpload}>
                  Upload
                </Button>
              </>
            )}
          </CardActions>
        </Card>
      )}
    </ImageUploading>
  );
};
