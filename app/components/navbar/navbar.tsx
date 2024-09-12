
'use client';
import React, { useState } from 'react'; // Asegúrate de importar el componente ProfileCard
import style from './styles.module.css';
import ProfileCard from '../profile/Profile';
import Modal from '../common/modal/modal';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import showAlert from '../alertcomponent/alertcomponent';

export const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleEditProfile = () => {
    alert('Editar perfil');
    // Aquí puedes agregar la lógica para editar el perfil
  };

  const handleLogout = async () => {
    const auth = getAuth(); // Obtener la instancia de auth
    try {
      await signOut(auth); // Cerrar sesión
      await showAlert({
        title: 'Sesión cerrada',
        text: 'Sesión cerrada correctamente',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      sessionStorage.removeItem('token');
      router.push('/login');
      
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert('Error al cerrar sesión');
    }
  };

  return (
    <>
      <nav className={style.nav}>
        <div>
          <img className={style.logo} src="/Logo_name.png" alt="Logo" />
        </div>
        <ul className={style.ul}>
          <h3 className={style.h3}>Residential unit name</h3>
        </ul>
        <div className={style.user}>
          <a href="#" onClick={toggleModal}>
            <AccountCircleOutlinedIcon className={style.userLogo} />
          </a>
          <h4 className={style.userName}>User name</h4>
        </div>
        
      </nav>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <ProfileCard
          name="John Doe"
          email="john.doe@example.com"
          id="12345"
          onEdit={handleEditProfile}
          onLogout={handleLogout}
        />
      </Modal>
    </>
  );
};

