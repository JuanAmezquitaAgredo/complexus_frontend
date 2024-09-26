'use client';

import { Navbar } from '@/app/components/navbar/navbar';
import PostCard from '@/app/components/postcard/PostCard';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { fetchPosts } from '@/app/redux/slices/postSlice';
import { fetchPinnedPosts } from '@/app/redux/slices/pinnedPostSlice';
import { AppDispatch, RootState } from '@/app/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import PinnedPostCard from '../components/pinnedCard/PinnedPostCard';
import PushPinIcon from '@mui/icons-material/PushPin';
import { SidebarOwner } from '../components/sidebarOwner/sidebarOwner';
import { useRouter } from 'next/navigation';
import PostCardOwner from '../components/postcardOwner/PostCardOwner';
import PinnedPostCardOwner from '../components/pinnedCardOwner/PinnedPostCardOwner';

const OwnerPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    setToken(storedToken);

    if (!storedToken) {
      router.push('/login');
    }
  }, [router]);

  
  const { posts, loading: postsLoading, error: postsError } = useSelector((state: RootState) => state.posts);
  const { pinnedPosts, loading: pinnedPostsLoading, error: pinnedPostsError } = useSelector((state: RootState) => state.pinnedPosts);

  useEffect(() => {
    if (token) {
      dispatch(fetchPosts());
      dispatch(fetchPinnedPosts());  
    }
  }, [dispatch, token]);

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
          
          {posts.length > 0 && (
            <div className={styles.postCardContainer}>
              {posts.map((post) => (
                <PostCardOwner
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

        
        <div className={styles.containerPin}>
          {pinnedPosts.length > 0 && (
            <div className={styles.pinnedCardContainer}>
              <div className={styles.h2Container}>
                <h2 className={styles.h2}>Fixed</h2>
                <PushPinIcon className={styles.icons} />
              </div>
              {pinnedPosts.map((post) => (
                <PinnedPostCardOwner
                  key={post.id}
                  title={post.title}
                  user={post.user}
                  description={post.description}
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
