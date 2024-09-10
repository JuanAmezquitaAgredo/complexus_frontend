'use client';

import { Navbar } from '@/app/components/navbar/navbar'
import PostCard from '@/app/components/postcard/PostCard'
import { Sidebar } from '@/app/components/sidebar/sidebar'
import React, { useEffect } from 'react'
import styles from './styles.module.css';
import { fetchPosts } from '@/app/redux/slices/postSlice';
import { AppDispatch, RootState } from '@/app/redux/store';
import { useDispatch, useSelector } from 'react-redux';


const adminPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const {posts, loading, error} = useSelector((state: RootState) => state.posts);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleEdit = () => {
    alert("Edit profile");
  };

  const handleLogout = () => {
    alert("Logged out");
  };
  return (
    <main>
      <Navbar />
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.posts}>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              user={post.user}
              timePosted={post.timePosted}
              description={post.description}
              likes={post.likes} 
              imageUrl={post.imageUrl} 
            />
          ))}

        </div>
      </div>
    </main>
  )
}

export default adminPage