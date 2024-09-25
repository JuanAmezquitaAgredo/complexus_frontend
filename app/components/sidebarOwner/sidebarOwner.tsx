'use client';
import React, { useEffect, useState } from 'react';
import style from './styles.module.css';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import WalletIcon from '@mui/icons-material/Wallet';
import HomeIcon from '@mui/icons-material/Home';

export const SidebarOwner = () => {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []); 

  return (
    <aside className={style.aside}>
      <ul className={style.ul}>
        <a className={style.a} href="/owner">
          <div className={`${style.aside_nav} ${currentPath === '/owner' ? style.active : ''}`}>
            <HomeIcon className={style.icons} />
            <h2 className={style.aside_nav_h2}>Home</h2>
          </div>
        </a>

        <a className={style.a} href="/postsOwner">
          <div className={`${style.aside_nav} ${currentPath === '/postsOwner' ? style.active : ''}`}>
            <PostAddOutlinedIcon className={style.icons} />
            <h2 className={style.aside_nav_h2}>Create post</h2>
          </div>
        </a>

        <a className={style.a} href="/myPostsOwner">
          <div className={`${style.aside_nav} ${currentPath === '/myPostsOwner' ? style.active : ''}`}>
            <WalletIcon className={style.icons} />
            <h2 className={style.aside_nav_h2}>My posts</h2>
          </div>
        </a>
      </ul>
    </aside>
  );
};
