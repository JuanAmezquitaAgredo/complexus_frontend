
'use client';
import React, { useState } from 'react'; // Asegúrate de importar el componente ProfileCard
import style from './styles.module.css';
import ProfileCard from '../profile/Profile';
import Modal from '../common/modal/modal';

export const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleEditProfile = () => {
    alert('Editar perfil');
    // Aquí puedes agregar la lógica para editar el perfil
  };

  const handleLogout = () => {
    alert('Cerrar sesión');
    // Aquí puedes agregar la lógica para cerrar sesión
  };

  return (
    <>
      <nav className={style.nav}>
        <div>
          <img className={style.logo} src="/Logo_name.png" alt="Logo" />
        </div>
        <ul className={style.ul}>
          <h3 className={style.h3}>Username Role Profile</h3>
        </ul>
        <a href="#" onClick={toggleModal}>
          <img className={style.user} src="/user.png" alt="User" />
        </a>
      </nav>

      {/* Mostrar el modal con la tarjeta de perfil */}
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

