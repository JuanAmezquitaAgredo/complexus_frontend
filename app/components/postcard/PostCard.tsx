'use client';
import React from 'react';
import styles from './PostCard.module.css';
import PushPinIcon from '@mui/icons-material/PushPin';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


interface JobCardProps {
  id: number;
  title: string;
  user: string;
  timePosted: string;
  description: string;
  likes: number;
}

const PostCard: React.FC<JobCardProps> = ({ id, title, user, timePosted, description, likes }: JobCardProps) => {
  return (
      <div className={styles.card} key={id}>
        <div className={styles.cardHeader}>
          <div className={styles.userInfo}>
            <h3>{title}</h3>
            <span>{user} • {timePosted}</span>
          </div>
          <div className={styles.more}>
            <EditIcon className={styles.icons1}/>
            <DeleteIcon className={styles.icons1} />
            <PushPinIcon className={styles.icons1} />
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
            <span className={styles.followc}><FavoriteBorderIcon className={styles.foll}/> {likes}</span>
          </div>
          <button className={styles.sendBtn}>Send</button>
        </div>
      </div>
  );
};

export default PostCard;
