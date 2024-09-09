'use client';
import React from 'react';
import styles from './PostCard.module.css';

interface JobCardProps {
  title: string;
  user: string;
  timePosted: string;
  description: string;
  likes: number;
  comments: number;
}

const PostCard: React.FC<JobCardProps> = ({ title, user, timePosted, description, likes, comments }) => {
  return (
    <div className={styles.card}>
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
        <img className={styles.image} src="/post1.webp" alt="" />
      </div>
      <div className={styles.cardActions}>
        <div className={styles.likes}>
          <span className={styles.followc}><img className={styles.follow} src="/heart.png" alt="" /> {likes}</span>
        </div>
        <button className={styles.sendBtn}>Send</button>
      </div>
    </div>
  );
};

export default PostCard;
