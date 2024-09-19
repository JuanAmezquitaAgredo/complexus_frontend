'use client';
import React, { useState } from 'react';
import styles from './PostCard.module.css';
import PushPinIcon from '@mui/icons-material/PushPin';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface Post {
  id: number;
  title: string;
  user: string;
  timePosted: string;
  description: string;
  likes: number;
  imageUrl: string;
}

interface PostCardProps extends Post {}

const PostCard: React.FC<PostCardProps> = ({
  id,
  title,
  user,
  timePosted,
  description,
  likes,
  imageUrl,
}: PostCardProps) => {
  const [isPinned, setIsPinned] = useState(false);

  const handlePinClick = async () => {
    setIsPinned(!isPinned);

    const postData = {
      id,
      title,
      user,
      timePosted,
      description,
      likes,
      imageUrl,
    };

    try {
      const response = await fetch('http://localhost:3004/pin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Post pinned successfully:', data);
      window.location.reload();
    } catch (error) {
      console.error('Error pinning post:', error);
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
          <PushPinIcon className={styles.icons1} onClick={handlePinClick} />
        </div>
      </div>
      <div className={styles.cardContent}>
        <p>{description}</p>
      </div>
      <div className={styles.containerImage}>
        <img className={styles.image} src={imageUrl} alt={title} /> {/* Usar la URL de la imagen */}
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