'use client';
import React, { useState } from 'react'; // Asegúrate de importar el componente ProfileCard
import style from './styles.module.css';
import ProfileCard from '../profile/Profile';
import Modal from '../common/modal/modal';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

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
      alert('Sesión cerrada exitosamente');
      
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert('Error al cerrar sesión');
    }
  };

  return (
    <><nav className={style.nav}>
      <div>
        <img className={style.logo} src="/Logo_name.png" />
      </div>
      <ul className={style.ul}>
        <h3 className={style.h3}>Username Role Profile</h3>
      </ul>
      <a href="#">
        <img className={style.user} src="/user.png" />
      </a>
    </nav>
    </>
  )
}
