'use client';
import React from 'react';
import styles from './Profile.module.css';
import InputField from '../common/input/input';


interface ProfileCardProps {
  name: string;
  email: string;
  onEdit: () => void;
  onLogout: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, email, onEdit, onLogout }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>Profile</h3>
        <button className={styles.editButton} onClick={onEdit}>
          <img className={styles.iconsB} src="/edit.png" alt="" />
        </button>
      </div>
      <div className={styles.avatarContainer}>
        <div className={styles.avatar}>
          <img className={styles.iconsA} src="/user-card.png" alt="User avatar" />
        </div>
      </div>
      <div className={styles.inputs}>
        <InputField label="Name" type="text" name="name" value={name} placeholder="Name" boderColor="black" />
        <InputField label="Email" type="email" name="email" value={email} placeholder="Email" boderColor="black" />
      </div>
      <button className={styles.logoutButton} onClick={onLogout}>
        <img className={styles.icons} src="/logout.png" alt="" />
      </button>
    </div>
  );
};

export default ProfileCard;