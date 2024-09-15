// 'use client';
// import React, { useEffect } from 'react';
// import styles from './styles.module.css';
// import { Navbar } from '../components/navbar/navbar';
// import { Sidebar } from '../components/sidebar/sidebar';
// import CreatePostForm from '../components/formCreatePost/formCreatePost';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../redux/store';
// import { fetchPinnedPosts } from '../redux/slices/pinnedPostSlice';
// import PushPinIcon from '@mui/icons-material/PushPin';
// import PinnedPostCard from '../components/pinnedCard/PinnedPostCard';

// const AdminPage = () => {

//   const dispatch: AppDispatch = useDispatch();
  
//   const { pinnedPosts, loading: pinnedPostsLoading, error: pinnedPostsError } = useSelector((state: RootState) => state.pinnedPosts);

//   useEffect(() => {
//     dispatch(fetchPinnedPosts());  // Llamada para obtener pinned posts
//   }, [dispatch]);
  
//   return (
//     <main>
//       <Navbar />
//       <div className={styles.container}>
//         <Sidebar />
//         <div className={styles.content}>
//           <CreatePostForm />
//           <div className={styles.containerPin}>
//           {pinnedPosts.length > 0 && (
//             <div className={styles.pinnedCardContainer}>
//               <div className={styles.h2Container}>
//                 <h2 className={styles.h2}>Fixed</h2>
//                 <PushPinIcon className={styles.icons} />
//               </div>
//               {pinnedPosts.map((post) => (
//                 <PinnedPostCard
//                 title={post.title}
//                 user={post.user}
//                 content={post.description}
//                 imageUrl={post.imageUrl}
//               />
//               ))}
//             </div>
//           )}
//         </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default AdminPage;

'use client';
import React, { useEffect } from 'react';
import styles from './styles.module.css';
import { Navbar } from '../components/navbar/navbar';
import { Sidebar } from '../components/sidebar/sidebar';
import CreatePostForm from '../components/formCreatePost/formCreatePost';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchPinnedPosts } from '../redux/slices/pinnedPostSlice';
import PushPinIcon from '@mui/icons-material/PushPin';
import PinnedPostCard from '../components/pinnedCard/PinnedPostCard';

const AdminPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { pinnedPosts, loading: pinnedPostsLoading, error: pinnedPostsError } = useSelector((state: RootState) => state.pinnedPosts);

  useEffect(() => {
    dispatch(fetchPinnedPosts());  // Llamada para obtener pinned posts
  }, [dispatch]);
  
  return (
    <main>
      <Navbar />
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.content}>
          <CreatePostForm />
        </div>
        <div className={styles.containers}>
        <div className={styles.h2Container}>
                <h2 className={styles.h2}>Fixed</h2>
                <PushPinIcon className={styles.icons} />
              </div>
          <div className={styles.containerPin}>
            {pinnedPosts.length > 0 && (
              <div className={styles.pinnedCardContainer}>
                {pinnedPosts.map((post) => (
                  <PinnedPostCard
                    key={post.id} // Asegúrate de usar una clave única
                    title={post.title}
                    user={post.user}
                    content={post.description}
                    imageUrl={post.imageUrl} // Añade la clase de estilo
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminPage;
