'use client';

import { Navbar } from '@/app/components/navbar/navbar'
import PostCard from '@/app/components/postcard/PostCard'
import { Sidebar } from '@/app/components/sidebar/sidebar'
import React from 'react'
import styles from './styles.module.css';
import ProfileCard from '../components/profile/Profile';


const adminPage = () => {

  const handleEdit = () => {
    // Lógica para editar perfil
    alert("Edit profile");
  };

  const handleLogout = () => {
    // Lógica para logout
    alert("Logged out");
  };

  return (
    <main>
      <Navbar />
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.posts}>
          <PostCard title="Pago por trabajo"
            user="Adrian Florez"
            timePosted="48m"
            description="¿Alguien sin empleo? Disponible para ganarse una buena liga escribir al privado solo hombres y al chat privado (trecients.k)"
            likes={1}
            comments={4}
          />
          <PostCard title="Pago por trabajo"
            user="Adrian Florez"
            timePosted="48m"
            description="¿Alguien sin empleo? Disponible para ganarse una buena liga escribir al privado solo hombres y al chat privado (trecients.k)"
            likes={1}
            comments={4}
          />
          <PostCard title="Pago por trabajo"
            user="Adrian Florez"
            timePosted="48m"
            description="¿Alguien sin empleo? Disponible para ganarse una buena liga escribir al privado solo hombres y al chat privado (trecients.k)"
            likes={1}
            comments={4}
          />
          <PostCard title="Pago por trabajo"
            user="Adrian Florez"
            timePosted="48m"
            description="¿Alguien sin empleo? Disponible para ganarse una buena liga escribir al privado solo hombres y al chat privado (trecients.k)"
            likes={1}
            comments={4}
          />

        </div>
      </div>
    </main>
  )
}

export default adminPage