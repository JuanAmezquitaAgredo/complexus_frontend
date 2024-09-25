'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, resetCreatePost } from '../../redux/slices/createPostSlice';
import { TextField, Button, Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { AppDispatch, RootState } from '@/app/redux/store';
import axios from 'axios';
import styles from './formCreatePost.module.css'; // Ensure the styles are defined
import showAlert from '../alertcomponent/alertcomponent';

const cloudinary_url = 'https://api.cloudinary.com/v1_1/dnwpj75xg/image/upload';
const cloudinary_code = 'rsulligy';

const CreatePostForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, success, error } = useSelector((state: RootState) => state.createPost);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToCloudinary = async (image: File) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', cloudinary_code);

    try {
      setUploading(true);
      const res = await axios.post(cloudinary_url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploading(false);
      return res.data.secure_url; // Return the uploaded image URL
    } catch (error) {
      console.error('Error uploading the image:', error);
      setUploading(false);
      return null; // Return null in case of error
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl: string | null = null;

    if (imageFile) {
      imageUrl = await uploadImageToCloudinary(imageFile);
    }

    const postData = {
      title,
      description,
      user: '',
      imageUrl: imageUrl || '', // Use the uploaded image URL if it exists
      timePosted: new Date().toLocaleString(),
    };

    dispatch(createPost(postData));
  };

  useEffect(() => {
    if (success) {
      showAlert({
        title: "Post Created",
        text: "Your post has been successfully created.",
        icon: "success",
        confirmButtonText: "OK"
      });
      setTitle('');
      setDescription('');
      setImage(null);
      setImageFile(null);
      dispatch(resetCreatePost());
    }
  }, [success, dispatch]);

  return (
    <Card className={styles.card} raised>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Create a New Post
        </Typography>
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={styles.textField}
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className={styles.textField}
          />
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="image-upload"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="image-upload">
            <IconButton className={styles.containerButton} component="span">
              <PhotoCamera className={styles.iconCamera} />
              <p className={styles.p}>Add image</p>
            </IconButton>
          </label>
          {image && (
            <img
              src={image}
              alt="Image Preview"
              className={styles.previewImage}
            />
          )}
          <Box mt={2}>
            <Button className={styles.iconSearch} variant="contained" color="primary" type="submit" disabled={loading || uploading}>
              {loading || uploading ? 'Uploading...' : 'Post'}
            </Button>
          </Box>
          {error && <Typography color="error" sx={{ marginTop: 2 }}>{error}</Typography>}
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePostForm;
