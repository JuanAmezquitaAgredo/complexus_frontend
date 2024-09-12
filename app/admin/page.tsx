'use client';

import { Navbar } from '@/app/components/navbar/navbar';
import PostCard from '@/app/components/postcard/PostCard';
import { Sidebar } from '@/app/components/sidebar/sidebar';
import React, { useEffect } from 'react';
import styles from './styles.module.css';
import { fetchPosts } from '@/app/redux/slices/postSlice';
import { fetchPinnedPosts } from '@/app/redux/slices/pinnedPostSlice';
import { AppDispatch, RootState } from '@/app/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import PinnedPostCard from '../components/pinnedCard/PinnedPostCard';

const AdminPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  
  // Obtener los estados de posts y pinnedPosts
  const { posts, loading: postsLoading, error: postsError } = useSelector((state: RootState) => state.posts);
  const { pinnedPosts, loading: pinnedPostsLoading, error: pinnedPostsError } = useSelector((state: RootState) => state.pinnedPosts);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchPinnedPosts());  // Llamada para obtener pinned posts
  }, [dispatch]);

  if (postsLoading || pinnedPostsLoading) {
    return <div>Loading...</div>;
  }

  if (postsError || pinnedPostsError) {
    return <div>Error: {postsError || pinnedPostsError}</div>;
  }

  return (
    <main>
      <Navbar />
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.posts}>
          {/* Renderizar una publicación normal a la vez */}
          {posts.length > 0 && (
            <div className={styles.postCardContainer}>
              <h2 className={styles.h2}>Publicaciones</h2>
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
          )}
        </div>

        {/* Renderizar una publicación anclada a la vez */}
        <div className={styles.containerPin}>
          {pinnedPosts.length > 0 && (
            <div className={styles.pinnedCardContainer}>
              <h2 className={styles.h2}>Ancladas</h2>
              {pinnedPosts.map((post) => (
                <PinnedPostCard
                title={post.title}
                user={post.user}
                content={post.description}
                imageUrl={post.imageUrl}
              />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminPage;
