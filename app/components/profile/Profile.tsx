'use client';
import React from 'react';
import styles from './Profile.module.css';
import InputField from '../common/input/input';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '../common/modal/modal';
import FormEditAdmin from '../form-edit-admin/form-edit-admin';


interface ProfileCardProps {
  name: string;
  email: string;
  onEdit: () => void;
  onLogout: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, email, onEdit, onLogout }) => {

  const [modalOpen, setModalOpen] = React.useState(false);

  const handleEditProfile = () => {
    setModalOpen(true);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  const idprofile = sessionStorage.getItem('id');
  let idpro:string;
  if (!idprofile) {
    idpro = "";
  }else{
    idpro = idprofile;
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>Profile</h3>
        <button className={styles.editButton} onClick={handleEditProfile}>
          <EditIcon className={styles.iconsB} />
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
        <LogoutIcon className={styles.icons} />
      </button>
      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        {<FormEditAdmin adminId={idpro} />}
      </Modal>
    </div>
  );
};

export default ProfileCard;