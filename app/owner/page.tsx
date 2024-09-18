'use client';

import { Navbar } from '@/app/components/navbar/navbar';
import PostCard from '@/app/components/postcard/PostCard';
import React, { useEffect } from 'react';
import styles from './styles.module.css';
import { fetchPosts } from '@/app/redux/slices/postSlice';
import { fetchPinnedPosts } from '@/app/redux/slices/pinnedPostSlice';
import { AppDispatch, RootState } from '@/app/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import PinnedPostCard from '../components/pinnedCard/PinnedPostCard';
import PushPinIcon from '@mui/icons-material/PushPin';
import { SidebarOwner } from '../components/sidebarOwner/sidebarOwner';

const OwnerPage: React.FC = () => {
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
        <SidebarOwner />
        <div className={styles.posts}>
          {/* Renderizar una publicación normal a la vez */}
          {posts.length > 0 && (
            <div className={styles.postCardContainer}>
              {posts.map((post) => (
                <PostCard
                  key={post.id} // Ya tienes una key aquí
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
              <div className={styles.h2Container}>
                <h2 className={styles.h2}>Fixed</h2>
                <PushPinIcon className={styles.icons} />
              </div>
              {pinnedPosts.map((post) => (
                <PinnedPostCard
                  key={post.id}
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

export default OwnerPage;
