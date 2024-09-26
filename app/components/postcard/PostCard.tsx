import React, { useState } from 'react';
import styles from './PostCard.module.css';
import PushPinIcon from '@mui/icons-material/PushPin';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ConfirmDialog from '../alertDelete/alertDelete';

interface Post {
  id: number;
  title: string;
  user: string;
  timePosted: string;
  description: string;
  likes: number;
  imageUrl: string;
}

interface PostCardProps extends Post {
  onDelete: (id: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  title,
  user,
  timePosted,
  description,
  likes,
  imageUrl,
  onDelete,
}: PostCardProps) => {
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = async () => {
    const newLikes = isLiked ? currentLikes - 1 : currentLikes + 1;
    setCurrentLikes(newLikes);
    setIsLiked(!isLiked);

    try {
      const response = await fetch(`http://localhost:3004/posts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ likes: newLikes }),
      });

      if (!response.ok) {
        throw new Error('Error updating likes');
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleDeleteClick = () => {
    ConfirmDialog({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:3004/posts/${id}`, {
            method: 'DELETE',
          });
  
          if (!response.ok) {
            throw new Error('Error deleting post');
          }
  
          // Llamar la función onDelete del componente padre para actualizar la lista de posts
          onDelete(id);
          window.location.reload();
        } catch (error) {
          console.error('Error deleting post:', error);
        }
      }
    });
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
          <DeleteIcon className={styles.icons1} onClick={handleDeleteClick} /> {/* Manejar clic de eliminar */}
          <PushPinIcon className={styles.icons1} />
        </div>
      </div>
      <div className={styles.cardContent}>
        <p>{description}</p>
      </div>
      <div className={styles.containerImage}>
        <img className={styles.image} src={imageUrl} alt={title} />
      </div>
      <div className={styles.cardActions}>
        <div className={styles.likes} onClick={handleLikeClick}>
          <span className={styles.followc}>
            {isLiked ? (
              <FavoriteIcon className={styles.foll} />
            ) : (
              <FavoriteBorderIcon className={styles.foll} />
            )}
            {currentLikes}
          </span>
        </div>
        <button className={styles.sendBtn}>Send</button>
      </div>
    </div>
  );
};

export default PostCard;
