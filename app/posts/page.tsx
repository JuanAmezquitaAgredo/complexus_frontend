'use client';
import React from 'react';
import styles from './styles.module.css';
import { Navbar } from '../components/navbar/navbar';
import { Sidebar } from '../components/sidebar/sidebar';
import CreatePostForm from '../components/formCreatePost/formCreatePost';

const AdminPage = () => {
  return (
    <main>
      <Navbar />
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.content}>
          <h1 className={styles.h1}>Create a New Post</h1>
          <CreatePostForm />
        </div>
      </div>
    </main>
  );
};

export default AdminPage;
