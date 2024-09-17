import React from 'react';
import styles from './PinnedPostCard.module.css';

interface PinnedPostCardProps {
  title: string;
  user: string;
  content: string;
  imageUrl: string;
}

const PinnedPostCard: React.FC<PinnedPostCardProps> = ({ title, user, content, imageUrl }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.user}>{user}</p>
        <p className={styles.text}>{content}</p>
      </div>
    </div>
  );
};

export default PinnedPostCard;
