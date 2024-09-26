import React from 'react';
import styles from './PinnedPostCard.module.css';
import DeleteIcon from '@mui/icons-material/Delete';

interface PinnedPostCardProps {
    title: string;
    user: string;
    description: string;
    imageUrl: string;
    onDelete?: () => void; // Add onDelete prop
}

const PinnedPostCardOwner: React.FC<PinnedPostCardProps> = ({ title, user, description, imageUrl, onDelete }) => {
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={imageUrl} alt={title} className={styles.image} />
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.user}>{user}</p>
                <p className={styles.text}>{description}</p>
            </div>
            <div className={styles.pinIconContainer}>
            </div>
        </div>
    );
};

export default PinnedPostCardOwner;