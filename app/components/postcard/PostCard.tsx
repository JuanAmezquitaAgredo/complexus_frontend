'use client';
import React, { useState, useEffect } from 'react';
import styles from './PostCard.module.css';
import PushPinIcon from '@mui/icons-material/PushPin';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';

interface JobCardProps {
  id: number;
  title: string;
  user: string;
  timePosted: string;
  description: string;
  likes: number;
  imageUrl: string;
  pinned?: boolean;
}

const PostCard: React.FC<JobCardProps> = ({
  id,
  title,
  user,
  timePosted,
  description,
  likes,
  imageUrl,
  pinned = false,
}: JobCardProps) => {
  const [isPinned, setIsPinned] = useState(pinned);
  const [postData, setPostData] = useState<JobCardProps | null>(null); // State to store full post data

  // Fetch the post data with GET when component mounts
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`http://localhost:3004/posts/${id}`); // Replace with actual GET endpoint
        if (response.status === 200) {
          setPostData(response.data); // Save post data in state
        }
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };
    fetchPostData();
  }, [id]); // Fetch post data when component mounts or when the `id` changes

  const togglePin = async () => {
    if (postData) {  // Ensure we have the post data
      try {
        const updatedPost = {
          ...postData,
          pinned: !isPinned,  // Toggle the pinned state
        };

        const response = await axios.post(`http://localhost:3004/pin`, updatedPost); // Send full post data in POST request
        if (response) {
          alert('Post pinned successfully!'); // Show success message
          setIsPinned(!isPinned); // Update the local pinned state
        }
      } catch (error) {
        console.error('Error toggling pin:', error);
      }
    }
  };

  return (
    <div className={styles.card} key={id}>
      <div className={styles.cardHeader}>
        <div className={styles.userInfo}>
          <h3>{title}</h3>
          <span>{user} • {timePosted}</span>
        </div>
        <div className={styles.more}>
          <EditIcon className={styles.icons1} />
          <DeleteIcon className={styles.icons1} />
          <PushPinIcon
            className={styles.icons1}
            color={isPinned ? 'primary' : 'action'}
            onClick={togglePin} // Add onClick event to toggle pin
          />
        </div>
      </div>
      <div className={styles.cardContent}>
        <p>{description}</p>
      </div>
      <div className={styles.containerImage}>
        <img className={styles.image} src={imageUrl} alt={title} />
      </div>
      <div className={styles.cardActions}>
        <div className={styles.likes}>
          <span className={styles.followc}>
            <FavoriteBorderIcon className={styles.foll} /> {likes}
          </span>
        </div>
        <button className={styles.sendBtn}>Send</button>
      </div>
    </div>
  );
};

export default PostCard;
