'use client'
import React from 'react';
import styles from './PostCard.module.css';

interface PostCardProps {
  userName: string;
  message: string;
  likes: number;
}

const PostCard: React.FC<PostCardProps> = ({ userName, message, likes }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <img className={styles.avatar} src="/user-card.png" alt="User Avatar" />
          <span className={styles.userName}>{userName}</span>
        </div>
        <div className={styles.actions}>
          <img className={styles.icon} src="/edit.png" alt="Edit Icon" />
          <img className={styles.icon} src="/delete.png" alt="Delete Icon" />
        </div>
      </div>
      <div className={styles.message}>
        <p>{message}</p>
      </div>
      <div className={styles.footer}>
        <img className={styles.icon} src="/heart.png" alt="Heart Icon" />
        <span>{likes}</span>
      </div>
    </div>
  );
};

export default PostCard;
