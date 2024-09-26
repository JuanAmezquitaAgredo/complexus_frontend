import React, { useState } from 'react';
import styles from './PostCard.module.css';
import PushPinIcon from '@mui/icons-material/PushPin';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ConfirmDialog from '../alertDelete/alertDelete';

interface Post {
  id: string | number;
  title: string;
  user: string;
  timePosted: string;
  description: string;
  likes: number;
  imageUrl: string;
}

// interface PostCardProps extends Post {
//   onDelete: (id: string) => void;
// }

const PostCardOwner: React.FC<Post> = ({
  id,
  title,
  user,
  timePosted,
  description,
  likes,
  imageUrl,
}: Post) => {
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);

  // Función para manejar "Like"
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

  // Función para manejar la eliminación del post
  // const handleDeleteClick = () => {
  //   ConfirmDialog({
  //     title: 'Are you sure?',
  //     text: 'You won’t be able to revert this!',
  //     confirmButtonText: 'Yes, delete it!',
  //     cancelButtonText: 'Cancel',
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         const response = await fetch(`http://localhost:3004/posts/${id}`, {
  //           method: 'DELETE',
  //         });

  //         if (!response.ok) {
  //           throw new Error('Error deleting post');
  //         }

  //         // Llamar la función onDelete del componente padre para actualizar la lista de posts
  //         onDelete(id.toString());
  //         window.location.reload();
  //       } catch (error) {
  //         console.error('Error deleting post:', error);
  //       }
  //     }
  //   });
  // };

  // // Función para manejar el "Pin" del post
  // const handlePinPost = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3004/pin', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         id,
  //         title,
  //         user,
  //         description,
  //         imageUrl,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Error pinning post');
  //     }
  //     window.location.reload();
  //   } catch (error) {
  //     console.error('Error pinning post:', error);
  //   }
  // };

  return (
    <div className={styles.card} key={id}>
      <div className={styles.cardHeader}>
        <div className={styles.userInfo}>
          <h3>{title}</h3>
          <span>{user} • {timePosted}</span>
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
      </div>
    </div>
  );
};

export default PostCardOwner;
