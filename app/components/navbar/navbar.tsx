'use client';
import React, { useState, useEffect } from 'react'; // Ensure ProfileCard component is imported
import style from './styles.module.css';
import ProfileCard from '../profile/Profile';
import Modal from '../common/modal/modal';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import showAlert from '../alertcomponent/alertcomponent';
import { auth } from '@/app/firebase/config';
import { UserAdmin } from '@/app/types/admins';
import { Unit } from '@/app/types/units'; // Ensure this import if using Unit type

export const Navbar = () => {
  const initialStateUser: UserAdmin = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    tower: '',
    residential_id: '',
    rol_id: '',
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<UserAdmin>(initialStateUser);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = sessionStorage.getItem('id');
      const token = sessionStorage.getItem('BearerToken');
      if (!userId) return;

      try {
        // Fetch user data
        const userResponse = await fetch(`/api/user/readById/${userId}`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`, // Aquí colocas tu Bearer Token
              'Content-Type': 'application/json',  // Especificamos que es JSON
          }
      });
      
      const userData = await userResponse.json();
      console.log(userData);
      setUser(userData);
      

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleEditProfile = () => {
    alert('Edit profile');
    // Here you can add logic to edit profile
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out
      await showAlert({
        title: 'Logged Out',
        text: 'You have been logged out successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('id');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('BearerToken');
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      await showAlert({
        title: 'Error',
        text: 'There was an error logging out. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <>
      <nav className={style.nav}>
        <div>
          <img className={style.logo} src="/Logo_name.png" alt="Logo" />
        </div>
        <ul className={style.ul}>
          <h3 className={style.h3}>{'Residential Unit Name'}</h3>
        </ul>
        <div className={style.user}>
          <a href="#" onClick={toggleModal}>
            <AccountCircleOutlinedIcon className={style.userLogo} />
          </a>
          <h4 className={style.userName}>{user.name || 'User Name'}</h4>
        </div>
      </nav>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <ProfileCard
          name={`${user.name} ${user.lastName}`}
          email={user.email}
          onEdit={handleEditProfile}
          onLogout={handleLogout}
        />
      </Modal>
    </>
  );
};
