'use client';

import { Navbar } from '@/app/components/navbar/navbar';
import PostCard from '@/app/components/postcard/PostCard';
import { Sidebar } from '@/app/components/sidebar/sidebar';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { fetchPosts } from '@/app/redux/slices/postSlice';
import { AppDispatch, RootState } from '@/app/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import PinnedPostCard from '../components/pinnedCard/PinnedPostCard';
import PushPinIcon from '@mui/icons-material/PushPin';
import { useRouter } from 'next/navigation';

interface Post {
  id: number;
  title: string;
  user: string;
  timePosted: string;
  description: string;
  likes: number;
  imageUrl: string;
}

interface PinnedPost {
  id: number;
  title: string;
  user: string;
  description: string; // Or description, depending on your structure
  imageUrl: string;
}

const AdminPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  
  // State for token and redirection
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (!storedToken) {
      router.push('/login');
    } else {
      setToken(storedToken);
    }
  }, [router]);

  // State for pinned posts
  const [pinnedPosts, setPinnedPosts] = useState<PinnedPost[]>([]);

  // Get normal posts from Redux
  const { posts, loading: postsLoading, error: postsError } = useSelector(
    (state: RootState) => state.posts
  );

  // Fetch pinned posts initially and on any changes in posts
  useEffect(() => {
    const fetchPinnedPosts = async () => {
      try {
        const response = await fetch('http://localhost:3004/pin');
        const data: PinnedPost[] = await response.json();
        setPinnedPosts(data);
      } catch (error) {
        console.error('Error fetching pinned posts:', error);
      }
    };

    if (token) {
      fetchPinnedPosts();
      dispatch(fetchPosts());
    }
  }, [dispatch, token]);

  // Handle the deletion of pinned posts
  const handleDeletePost = async (postId: number): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:3004/pin/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting pinned post');
      }

      // Update state without needing to reload the page
      setPinnedPosts(pinnedPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error deleting pinned post:', error);
    }
  };

  // If the posts are loading
  if (postsLoading) {
    return <div>Loading...</div>;
  }

  // If there is any error
  if (postsError) {
    return <div>Error: {postsError}</div>;
  }

  return (
    <main>
      <Navbar />
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.posts}>
          {posts.length > 0 && (
            <div className={styles.postCardContainer}>
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

        {/* Render pinned posts */}
        <div className={styles.containerPin}>
          {pinnedPosts.length > 0 && (
            <div className={styles.pinnedCardContainer}>
              <div className={styles.h2Container}>
                <h2 className={styles.h2}>Pinned</h2>
                <PushPinIcon className={styles.icons} />
              </div>
              {pinnedPosts.map((post: PinnedPost) => (
                <PinnedPostCard
                  key={post.id}
                  title={post.title}
                  user={post.user}
                  description={post.description}
                  imageUrl={post.imageUrl}
                  onDelete={() => handleDeletePost(post.id)}
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
