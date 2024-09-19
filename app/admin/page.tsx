// 'use client';
// import { Navbar } from '@/app/components/navbar/navbar';
// import PostCard from '@/app/components/postcard/PostCard';
// import { Sidebar } from '@/app/components/sidebar/sidebar';
// import React, { useState, useEffect } from 'react';
// import styles from './styles.module.css';
// import { fetchPosts } from '@/app/redux/slices/postSlice';
// import { AppDispatch, RootState } from '@/app/redux/store';
// import { useDispatch, useSelector } from 'react-redux';
// import PinnedPostCard from '../components/pinnedCard/PinnedPostCard';
// import PushPinIcon from '@mui/icons-material/PushPin';

// interface Post {
//   id: number;
//   title: string;
//   user: string;
//   timePosted: string;
//   description: string;
//   likes: number;
//   imageUrl: string;
// }

// interface PinnedPost {
//   id: number;
//   title: string;
//   user: string;
//   description: string; // O description, según tu estructura
//   imageUrl: string;
// }

// const AdminPage: React.FC = () => {
//   const dispatch: AppDispatch = useDispatch();

//   // Estado para publicaciones fijadas
//   const [pinnedPosts, setPinnedPosts] = useState<PinnedPost[]>([]);

//   // Obtener publicaciones normales de Redux
//   const { posts, loading: postsLoading, error: postsError } = useSelector(
//     (state: RootState) => state.posts
//   );

//   // Obtener publicaciones fijadas inicialmente y en cualquier cambio en posts
//   useEffect(() => {
//     const fetchPinnedPosts = async () => {
//       const response = await fetch('http://localhost:3004/pin');
//       const data: PinnedPost[] = await response.json();
//       setPinnedPosts(data);
//     };

//     fetchPinnedPosts();
//     dispatch(fetchPosts());
//   }, [dispatch]);

//   if (postsLoading) {
//     return <div>Cargando...</div>;
//   }

//   if (postsError) {
//     return <div>Error: {postsError}</div>;
//   }

//   return (
//     <main>
//       <Navbar />
//       <div className={styles.container}>
//         <Sidebar />
//         <div className={styles.posts}>
//           {/* Renderizar publicaciones normales */}
//           {posts.length > 0 && (
//             <div className={styles.postCardContainer}>
//               {posts.map((post) => (
//                 <PostCard
//                   key={post.id}
//                   id={post.id}
//                   title={post.title}
//                   user={post.user}
//                   timePosted={post.timePosted}
//                   description={post.description}
//                   likes={post.likes}
//                   imageUrl={post.imageUrl}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Renderizar publicaciones fijadas desde el estado */}
//         <div className={styles.containerPin}>
//           {pinnedPosts.length > 0 && (
//             <div className={styles.pinnedCardContainer}>
//               <div className={styles.h2Container}>
//                 <h2 className={styles.h2}>Fijadas</h2>
//                 <PushPinIcon className={styles.icons} />
//               </div>
//               {pinnedPosts.map((post: PinnedPost) => (
//                 <PinnedPostCard
//                   key={post.id}
//                   title={post.title}
//                   user={post.user}
//                   description={post.description}
//                   imageUrl={post.imageUrl}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// };

// export default AdminPage;

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
  description: string; // O description, según tu estructura
  imageUrl: string;
}

const AdminPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // Estado para publicaciones fijadas
  const [pinnedPosts, setPinnedPosts] = useState<PinnedPost[]>([]);

  // Obtener publicaciones normales de Redux
  const { posts, loading: postsLoading, error: postsError } = useSelector(
    (state: RootState) => state.posts
  );

  // Obtener publicaciones fijadas inicialmente y en cualquier cambio en posts
  useEffect(() => {
    const fetchPinnedPosts = async () => {
      try {
        const response = await fetch('http://localhost:3004/pin');
        const data: PinnedPost[] = await response.json();
        setPinnedPosts(data);
      } catch (error) {
        console.error('Error al obtener las publicaciones fijadas:', error);
      }
    };

    fetchPinnedPosts();
    dispatch(fetchPosts());
  }, [dispatch]);

  if (postsLoading) {
    return <div>Cargando...</div>;
  }

  if (postsError) {
    return <div>Error: {postsError}</div>;
  }

  const handleDeletePost = async (postId: number): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:3004/pin/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la publicación fijada');
      }

      setPinnedPosts(pinnedPosts.filter((post) => post.id !== postId));
      window.location.reload();
    } catch (error) {
      console.error('Error al eliminar la publicación fijada:', error);
    }
  };

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

        {/* Renderizar publicaciones fijadas */}
        <div className={styles.containerPin}>
          {pinnedPosts.length > 0 && (
            <div className={styles.pinnedCardContainer}>
              <div className={styles.h2Container}>
                <h2 className={styles.h2}>Fijadas</h2>
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
    </main >
  );
};

export default AdminPage;